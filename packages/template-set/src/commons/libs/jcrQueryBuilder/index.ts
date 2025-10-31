import { graphql, type TadaDocumentNode } from "gql.tada";
import { print } from "@0no-co/graphql.web";
import type { JCRQueryConfig } from "./types.ts";

export async function execute<Result = any, Variables = any>(
	query: TadaDocumentNode<Result, Variables>,
	variables: Variables,
	{ signal }: { signal?: AbortSignal } = {},
): Promise<Result> {
	const response = await fetch("/modules/graphql", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: print(query),
			variables,
		}),
		signal,
	});

	if (!response.ok)
		throw new Error(`GraphQL HTTP error: ${response.status} ${response.statusText}`);

	const { data, errors } = await response.json();
	if (errors?.length) throw new Error(`GraphQL errors: ${JSON.stringify(errors)}`);

	return data;
}

export const gqlNodesQuery = graphql(`
	query GetContentPropertiesQuery(
		$workspace: Workspace!
		$view: String!
		$language: String!
		$query: InputGqlJcrNodeCriteriaInput!
		$limit: Int
	) {
		jcr(workspace: $workspace) {
			nodesByCriteria(criteria: $query, limit: $limit) {
				nodes {
					workspace
					uuid
					path
					name
					renderedContent(view: $view, language: $language) {
						output
					}
				}
			}
		}
	}
`);

export const getCriteria = (params: Record<string, string[]>, config: JCRQueryConfig) => {
	const constraints = Object.entries(params)
		.map(([param, values]) => ({
			any: values.map((value) => ({ property: param, equals: value })),
		}))
		// Remove constraints with no values
		.filter(({ any }) => any.length > 0);

	return graphql.scalar("InputGqlJcrNodeCriteriaInput", {
		nodeType: config.type,
		nodeConstraint: constraints.length > 0 ? { all: constraints } : null,
		ordering: {
			property: config.criteria,
			orderType: config.sortDirection.toUpperCase() as "ASC" | "DESC",
		},
	});
};
