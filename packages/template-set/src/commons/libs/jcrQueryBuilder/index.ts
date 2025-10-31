import { initGraphQLTada, type TadaDocumentNode, type setupSchema } from "gql.tada";
import { print } from "@0no-co/graphql.web";
import type { JCRQueryConfig, RenderNodeProps } from "./types.ts";
import type { GraphQLFormattedError } from "graphql";

const graphql = initGraphQLTada<{
	introspection: setupSchema["introspection"];
	scalars: {
		Long: number;
	};
}>();

export async function execute<Result = any, Variables = any>({
	query,
	variables,
}: {
	query: TadaDocumentNode<Result, Variables>;
	variables: Variables;
}): Promise<{ data?: Result; errors?: GraphQLFormattedError[] }> {
	const response = await fetch("/modules/graphql", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: print(query),
			variables,
		}),
	});

	if (!response.ok)
		throw new Error(`GraphQL HTTP error: ${response.status} ${response.statusText}`);

	return response.json();
}

export const gqlNodesQuery = graphql(`
	query GetContentPropertiesQuery(
		$workspace: Workspace!
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
					url: renderUrl(language: $language, workspace: $workspace)
					title: property(name: "title", language: $language) {
						value
					}
					price: property(name: "price") {
						longValue
					}
					images: property(name: "images") {
						refNodes {
							url
						}
					}
					surface: property(name: "surface") {
						longValue
					}
					bedrooms: property(name: "bedrooms") {
						longValue
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

export function fetchEstate(
	doGQLQuery: <Result = any, Variables = any>(opts: {
		query: TadaDocumentNode<Result, Variables>;
		variables: Variables;
	}) => { data?: Result; errors?: GraphQLFormattedError[] },
	config: JCRQueryConfig,
	params: Record<string, string[]>,
): RenderNodeProps[];
export function fetchEstate(
	doGQLQuery: <Result = any, Variables = any>(opts: {
		query: TadaDocumentNode<Result, Variables>;
		variables: Variables;
	}) => Promise<{ data?: Result; errors?: GraphQLFormattedError[] }>,
	config: JCRQueryConfig,
	params: Record<string, string[]>,
): Promise<RenderNodeProps[]>;
export function fetchEstate(
	doGQLQuery: <Result = any, Variables = any>(opts: {
		query: TadaDocumentNode<Result, Variables>;
		variables: Variables;
	}) =>
		| { data?: Result; errors?: GraphQLFormattedError[] }
		| Promise<{ data?: Result; errors?: GraphQLFormattedError[] }>,
	config: JCRQueryConfig,
	params: Record<string, string[]>,
): RenderNodeProps[] | Promise<RenderNodeProps[]> {
	const gqlContents = doGQLQuery({
		query: gqlNodesQuery,
		variables: {
			workspace: config.workspace,
			query: getCriteria(params, config),
			language: config.language,
			limit: config.limit,
		},
	});

	const process = ({ errors, data }: Awaited<typeof gqlContents>) => {
		if (errors) {
			console.error(JSON.stringify(errors));
		}

		return (data?.jcr?.nodesByCriteria?.nodes ?? [])
			.filter((node) => node !== null)
			.map((node) => ({
				uuid: node.uuid,
				url: node.url!,
				title: node.title?.value || "",
				image: node.images?.refNodes?.[0]?.url || "",
				price: node.price?.longValue || 0,
				surface: node.surface?.longValue || 0,
				bedrooms: node.bedrooms?.longValue || 0,
			})) satisfies RenderNodeProps[];
	};

	if ("then" in gqlContents) return gqlContents.then(process);
	return process(gqlContents);
}
