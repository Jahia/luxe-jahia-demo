import type {
  ExtractedProps,
  FacetProps,
  JcrQueryProps,
  NodeResult,
  RenderNodeProps,
} from "./types";
import type { RenderContext } from "org.jahia.services.render";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import type { TFunction } from "i18next";
// import { server } from "@jahia/javascript-modules-library";
import type { JCRQueryConfig } from "~/components/JcrQuery/JCRQueryBuilder";

interface BuildJCRQueryProps {
  luxeQuery: JcrQueryProps;
  t: TFunction;
  // server?: typeof server;
  currentNode: JCRNodeWrapper;
  renderContext: RenderContext;
}

export const gqlNodesQueryString = ({
  fragment,
  isRenderEnabled,
  limit,
  offset,
}: {
  fragment?: { name: string; value: string };
  isRenderEnabled: boolean;
  limit?: number;
  offset?: number;
}): string => {
  return `
    query GetContentPropertiesQuery($query: String!, ${isRenderEnabled ? "$view: String!," : ""} $language: String!) {
     jcr {
      nodesByQuery(
        query: $query
        ${limit && limit >= 0 ? `limit: ${limit}` : ""}
        ${offset && offset >= 0 ? `offset: ${offset}` : ""}
      ) {
        nodes {
          workspace
          uuid
          path
          name
          ${fragment?.value ? `...${fragment.name}` : ""}
          ${isRenderEnabled ? "renderedContent(view: $view, language: $language){ output }" : ""}
        }
      }
     }
    }
    ${fragment?.value ? fragment.value : ""}
  `;
};

export const gqlContentPropertiesQueryString = `
  query GetContentPropertiesQuery($name: String!, $language: String!) {
    jcr {
      nodeTypeByName(name: $name) {
        properties(fieldFilter: {filters: [{fieldName: "hidden", value: "false"}]}) {
          id: name
          label : displayName(language: $language)
          type : requiredType
          isHidden : hidden
          isMandatory : mandatory
          isMultiple : multiple
          isI18n : internationalized
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

export type GqlNode = {
  uuid: string;
  renderedContent: { output: string };
};

const stripPrefix = (name: string): string => {
  return name.replace(/:/g, "_");
};

const unstripPrefix = (key: string): string => {
  return key.replace(/_/g, ":");
};

export const gqlNodes2DiplayNodes = (gqlNodes: GqlNode[]): RenderNodeProps[] =>
  gqlNodes?.map((node) => ({
    html: node.renderedContent.output,
    uuid: node.uuid,
  }));

export const generateGraphQLFragProperties = (
  properties: FacetProps[],
  fragmentName: string = "FacetPropertiesValues",
): string | undefined => {
  if (properties.length === 0) return;

  const fragmentBody = properties
    .map((prop) => {
      let field = "";
      if (prop.type === "STRING") {
        field = prop.isMultiple ? "values" : "value";
      } else {
        const baseField = typeMap[prop.type];
        if (!baseField) return ""; // Unknown type, skip and filtered later
        field = prop.isMultiple ? baseField.replace("Value", "Values") : baseField;
      }

      const langParam = prop.isI18n ? ",language: $language" : "";
      const key = stripPrefix(prop.id);
      return `${key}:property(name:"${prop.id}"${langParam}){${field}}`;
    })
    .filter(Boolean)
    .join("\n");

  return `fragment ${fragmentName} on JCRNode {\n${fragmentBody}\n}`;
};

export const getNodePropertyValues = (
  nodes: NodeResult[],
  facet: FacetProps,
): Array<string | number | boolean | Date> => {
  const key = stripPrefix(facet.id);
  const valuesSet = new Set<string | number | boolean | Date>();

  for (const node of nodes) {
    const propObj = node[key];
    if (!propObj) continue;

    let values: (string | number | boolean | Date)[] = [];
    if (facet.type === "STRING") {
      values = facet.isMultiple
        ? ((propObj as { values?: string[] }).values ?? [])
        : (propObj as { value?: string }).value !== undefined
          ? [(propObj as { value?: string }).value as string]
          : [];
    } else if (facet.type === "DATE") {
      // Optionnel : parser la date string en Date, sinon laisse en string
      if (facet.isMultiple) {
        values = ((propObj as { dateValues?: string[] }).dateValues ?? []).map((d) => new Date(d));
      } else {
        const val = (propObj as { dateValue?: string }).dateValue;
        values = val !== undefined ? [new Date(val)] : [];
      }
    } else {
      const baseField = typeMap[facet.type as keyof typeof typeMap];
      if (!baseField) continue;
      const field = facet.isMultiple ? baseField + "s" : baseField;
      const v = propObj[field as keyof typeof propObj];
      values = facet.isMultiple
        ? Array.isArray(v)
          ? (v as (number | boolean)[])
          : []
        : v !== undefined
          ? [v as number | boolean]
          : [];
    }
    values.forEach((val) => valuesSet.add(val));
  }

  let result = Array.from(valuesSet);
  if (facet.type === "STRING") {
    result = result
      .filter((x): x is string => typeof x === "string")
      .sort((a, b) => a.localeCompare(b));
  } else if (facet.type === "DATE") {
    result = result
      .filter((x): x is Date => x instanceof Date)
      .sort((a, b) => a.getTime() - b.getTime());
  } else if (facet.type === "LONG" || facet.type === "DECIMAL" || facet.type === "DOUBLE") {
    result = result.filter((x): x is number => typeof x === "number").sort((a, b) => a - b);
  }

  // Si tu veux vraiment tout rendre (y compris booleans), tu peux les concaténer à la fin
  if (facet.type === "BOOLEAN") {
    result = result.filter((x): x is boolean => typeof x === "boolean");
  }

  return result;
};

export function mapToJCRQueryBuilderProps({
  luxeQuery,
  currentNode,
  renderContext,
  t,
}: BuildJCRQueryProps): JCRQueryConfig {
  const warn: string[] = [];
  const currentLocale = renderContext.getMainResourceLocale();
  const currentLocaleCode = currentLocale.toString();

  const categories =
    luxeQuery.filter
      ?.map((cat) => {
        if (!cat) {
          warn.push(t("query.catIsMissing", { queryName: luxeQuery["jcr:title"] }));
          return null;
        }
        return { id: cat.getIdentifier() };
      })
      .filter((c): c is { id: string } => !!c) || [];

  const excludeNodes =
    luxeQuery.excludeNodes
      ?.map((node) => {
        if (!node) {
          warn.push(t("query.excludeIsMissing", { queryName: luxeQuery["jcr:title"] }));
          return null;
        }
        const translationNode = node.getNode(
          `j:translation_${renderContext.getMainResourceLocale().getLanguage()}`,
        );
        const translationId = translationNode?.getIdentifier();
        return translationId
          ? { id: node.getIdentifier(), translationId }
          : { id: node.getIdentifier() };
      })
      .filter((n): n is { id: string; translationId?: string } => !!n && !!n?.id) || [];

  return {
    type: luxeQuery.type,
    startNodePath: luxeQuery.startNode?.getPath() || currentNode.getResolveSite().getPath(),
    criteria: luxeQuery.criteria,
    sortDirection: luxeQuery.sortDirection,
    categories,
    limit: luxeQuery.maxItems,
    excludeNodes,
    warn,
    uuid: currentNode.getIdentifier(),
    subNodeView: luxeQuery["j:subNodesView"] || "default",
    language: currentLocaleCode,
  };
}
