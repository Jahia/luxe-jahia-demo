import type { ExtractedProps, FacetProps, JcrQueryProps, NodeResult } from "./types";
import type { RenderContext } from "org.jahia.services.render";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import type { TFunction } from "i18next";
import { server } from "@jahia/javascript-modules-library";

interface BuildJCRQueryProps {
  luxeQuery: JcrQueryProps;
  t: TFunction;
  server: typeof server;
  currentNode: JCRNodeWrapper;
  renderContext: RenderContext;
}

export const gqlNodesQueryString = (properties: FacetProps[]): string => {
  const fragment = generateGraphQLFragProperties(properties, "FacetPropertiesValues");
  return `
    query GetContentPropertiesQuery($query: String!, $view: String!, $language: String!) {
     jcr {
      nodesByQuery(
        query: $query
      ) {
        nodes {
          workspace
          uuid
          path
          name
          ${fragment ? "...FacetPropertiesValues" : ""}
          renderedContent(view: $view, language: $language){
            output
          }
        }
      }
     }
    }
    ${fragment ? fragment : ""}
  `;
};

export const gqlContentPropertiesQueryString = `
  query GetContentPropertiesQuery($name: String!, $language: String!) {
    jcr {
      nodeTypeByName(name: $name) {
        properties(fieldFilter: {filters: [{fieldName: "hidden", value: "false"}]}) {
          name
          hidden
          displayName(language: $language)
          mandatory
          requiredType
          multiple
          internationalized
        }
      }
     }
    }
  `;

const typeMap = {
  LONG: "longValue",
  BOOLEAN: "booleanValue",
  DECIMAL: "decimalValue",
  DATE: "dateValue",
  DOUBLE: "doubleValue",
} as const;

const stripPrefix = (name: string): string => {
  return name.replace(/:/g, "_");
};

const unstripPrefix = (key: string): string => {
  return key.replace(/_/g, ":");
};

const generateGraphQLFragProperties = (
  properties: FacetProps[],
  fragmentName: string = "FacetPropertiesValues",
): string | undefined => {
  if (properties.length === 0) return;

  const fragmentBody = properties
    .map((prop) => {
      let field = "";
      if (prop.requiredType === "STRING") {
        field = prop.multiple ? "values" : "value";
      } else {
        const baseField = typeMap[prop.requiredType];
        if (!baseField) return ""; // Unknown type, skip and filtered later
        field = prop.multiple ? baseField.replace("Value", "Values") : baseField;
      }

      const langParam = prop.internationalized ? ",language: $language" : "";
      const key = stripPrefix(prop.name);
      return `${key}:property(name:"${prop.name}"${langParam}){${field}}`;
    })
    .filter(Boolean)
    .join("\n");

  return `fragment ${fragmentName} on JCRNode {\n${fragmentBody}\n}`;
};

export const getNodePropertyValues = (nodes: NodeResult[], facet: FacetProps): Set<unknown> => {
  const key = stripPrefix(facet.name);
  const valuesSet = new Set<unknown>();

  for (const node of nodes) {
    const propObj = node[key];
    if (!propObj) continue;

    let values: unknown[] = [];
    if (facet.requiredType === "STRING") {
      values = facet.multiple
        ? (propObj.values ?? [])
        : propObj.value !== undefined
          ? [propObj.value]
          : [];
    } else {
      const baseField = typeMap[facet.requiredType as keyof typeof typeMap];
      if (!baseField) continue;
      const field = facet.multiple ? baseField.replace("Value", "Values") : baseField;
      const v = propObj[field as keyof typeof propObj];
      values = facet.multiple ? (Array.isArray(v) ? v : []) : v !== undefined ? [v] : [];
    }
    values.forEach((val) => valuesSet.add(val));
  }
  return valuesSet;
};

//
// export const extractGraphQLPropertyValue = (node: NodeResult, properties: FacetProps): unknown =>
//   extractGraphQLProperties(node, [properties])[stripPrefix(properties.name)];
//
// const extractGraphQLProperties = (node: NodeResult, properties: FacetProps[]): ExtractedProps => {
//   const result: ExtractedProps = {};
//   for (const prop of properties) {
//     const key = stripPrefix(prop.name);
//     const propObj = node[key];
//
//     if (!propObj) continue; // Propriété absente du résultat
//
//     let value;
//     if (prop.requiredType === "STRING") {
//       value = prop.multiple ? propObj.values : propObj.value;
//     } else {
//       const baseField = typeMap[prop.requiredType];
//       if (!baseField) continue; // Type inconnu
//       const field = prop.multiple ? baseField.replace("Value", "Values") : baseField;
//       value = propObj[field];
//     }
//     result[key] = value;
//   }
//   return result;
// };

export const buildJCRQuery = ({
  luxeQuery,
  t,
  server,
  currentNode,
  renderContext,
}: BuildJCRQueryProps) => {
  let warn: string | null = null;
  const asContent = "content";
  // Const descendantPath = luxeQuery.startNode?.getPath() || `/sites/${currentNode.getResolveSite().getSiteKey()}`;

  const descendantPath =
    luxeQuery.startNode?.getPath() || `${currentNode.getResolveSite().getPath()}`;

  /**
   * build Filter based on category
   */
  const filter =
    luxeQuery.filter?.reduce((condition, categoryNode, index) => {
      // If category is deleted, the filter contains "undefined" for the deleted category
      if (!categoryNode) {
        warn = t("query.catIsMissing", { queryName: luxeQuery["jcr:title"] });
        return condition;
      }

      return `${condition} ${index === 0 ? "" : "OR"} ${asContent}.[j:defaultCategory] = '${categoryNode.getIdentifier()}'`;
    }, "") || "";
  const queryFilter = filter.trim().length > 0 ? `AND (${filter})` : "";

  /**
   * build Filter based on excludeNodes
   */
  const excludeNodes =
    luxeQuery.excludeNodes?.reduce((condition, excludeNode, index) => {
      // If excludeNode is deleted, the filter contains "undefined" for the deleted category
      if (!excludeNode) {
        warn = t("query.excludeIsMissing", { queryName: luxeQuery["jcr:title"] });
        return condition;
      }

      const translationNode = excludeNode.getNode(
        `j:translation_${renderContext.getMainResourceLocale().getLanguage()}`,
      );
      const extraLanguageNode = translationNode
        ? `AND ${asContent}.[jcr:uuid] <> '${translationNode.getIdentifier()}'`
        : "";
      return `${condition} ${index === 0 ? "" : "OR"} (${asContent}.[jcr:uuid] <> '${excludeNode.getIdentifier()}' ${extraLanguageNode})`;
    }, "") || "";
  const queryExcludeNodes = excludeNodes.trim().length > 0 ? `AND (${excludeNodes})` : "";

  const jcrQuery = `SELECT *
                      FROM [${luxeQuery.type}] AS ${asContent}
                      WHERE ISDESCENDANTNODE('${descendantPath}') ${queryFilter} ${queryExcludeNodes}
                      ORDER BY ${asContent}.[${luxeQuery.criteria}] ${luxeQuery.sortDirection}`;

  server.render.addCacheDependency(
    { flushOnPathMatchingRegexp: `${descendantPath}/.*` },
    renderContext,
  );
  return { jcrQuery, warn };
};
