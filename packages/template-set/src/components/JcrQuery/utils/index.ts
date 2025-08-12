import type {
	FacetProps,
	JcrQueryProps,
	NodeResult,
	RenderNodeProps,
} from "~/components/JcrQuery/types";
import type { RenderContext } from "org.jahia.services.render";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import type { TFunction } from "i18next";
import type { JCRQueryConfig } from "~/components/JcrQuery/utils/JCRQueryBuilder";

interface BuildJCRQueryProps {
	luxeQuery: JcrQueryProps;
	t: TFunction;
	currentNode: JCRNodeWrapper;
	renderContext: RenderContext;
	offset?: number;
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
    query GetContentPropertiesQuery($workspace: Workspace! ,$query: String!, ${isRenderEnabled ? "$view: String!," : ""} $language: String!) {
     jcr(workspace: $workspace) {
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
  query GetContentPropertiesQuery($workspace: Workspace! ,$name: String!, $language: String!) {
    jcr(workspace: $workspace) {
      nodeTypeByName(name: $name) {
        properties(fieldFilter: {filters: [{fieldName: "hidden", value: "false"}]}) {
          id: name
          label : displayName(language: $language)
          type : requiredType
          isHidden : hidden
          isMandatory : mandatory
          isMultiple : multiple
          isI18n : internationalized
          constraints
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
	offset = 0,
}: BuildJCRQueryProps): JCRQueryConfig {
	// Derive workspace once
	const workspace: JCRQueryConfig["workspace"] =
		currentNode.getSession().getWorkspace().getName() === "default" ? "EDIT" : "LIVE";

	// Cache locale and language code once
	const locale = renderContext.getMainResourceLocale();
	const language = locale.toString();
	const langCode = locale.getLanguage();

	// Build categories with a single pass (skip nulls + warn)
	const categories = (luxeQuery.filter ?? []).reduce<{ id: string }[]>((acc, node) => {
		if (!node) {
			console.warn(t("query.catIsMissing", { queryName: luxeQuery["jcr:title"] }));
			return acc;
		}
		acc.push({ id: node.getIdentifier() });
		return acc;
	}, []);

	// Build exclusions in one pass (optional translationId + warn)
	const excludeNodes = (luxeQuery.excludeNodes ?? []).reduce<
		{ id: string; translationId?: string }[]
	>((acc, node) => {
		if (!node) {
			console.warn(t("query.excludeIsMissing", { queryName: luxeQuery["jcr:title"] }));
			return acc;
		}
		const translationId =
			node.getNode?.(`j:translation_${langCode}`)?.getIdentifier?.() ?? undefined;
		acc.push(
			translationId ? { id: node.getIdentifier(), translationId } : { id: node.getIdentifier() },
		);
		return acc;
	}, []);

	// Prefer explicit start node path, fallback to site root
	const startNodePath = luxeQuery.startNode?.getPath() ?? currentNode.getResolveSite().getPath();

	return {
		workspace,
		type: luxeQuery.type,
		startNodePath,
		criteria: luxeQuery.criteria,
		sortDirection: luxeQuery.sortDirection,
		categories,
		excludeNodes,
		uuid: currentNode.getIdentifier(),
		subNodeView: luxeQuery["j:subNodesView"] || "default",
		language,
		limit: luxeQuery.maxItems,
		offset,
	};
}
