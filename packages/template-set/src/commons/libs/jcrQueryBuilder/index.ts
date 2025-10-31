import { graphql, type TadaDocumentNode } from "gql.tada";
import { print } from "@0no-co/graphql.web";

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
