/* eslint-disable @typescript-eslint/no-explicit-any */
import { initGraphQLTada, type TadaDocumentNode, type setupSchema } from "gql.tada";
import { print } from "@0no-co/graphql.web";
import type { QueryConfig, RenderNodeProps } from "./types.ts";
import type { GraphQLFormattedError } from "graphql";

/** Transforms a textual GraphQL query into a DocumentNode. */
const graphql = initGraphQLTada<{
	introspection: setupSchema["introspection"];
	scalars: {
		Date: string;
		Long: number;
	};
}>();

/** Performs a GraphQL query on the client using `fetch`. */
export async function graphqlFetch<Result = any, Variables = any>({
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

// Two overloads, to expose both a sync and an async version
export function fetchEstate(
	f: (opts: any) => { data?: any },
	config: QueryConfig,
): RenderNodeProps[];
export function fetchEstate(
	f: (opts: any) => Promise<{ data?: any }>,
	config: QueryConfig,
): Promise<RenderNodeProps[]>;

// Actual implementation, support both sync and async
export function fetchEstate(
	graphqlFetch: <Result = any, Variables = any>(opts: {
		query: TadaDocumentNode<Result, Variables>;
		variables: Variables;
	}) =>
		| { data?: Result; errors?: GraphQLFormattedError[] }
		| Promise<{ data?: Result; errors?: GraphQLFormattedError[] }>,
	config: QueryConfig,
): RenderNodeProps[] | Promise<RenderNodeProps[]> {
	// Prepare a JQOM query based on the provided params
	const constraints = Object.entries(config.params)
		.map(([param, values]) => ({
			any: values.map((value) => ({ property: param, equals: value })),
		}))
		// Remove constraints with no values
		.filter(({ any }) => any.length > 0);

	const response = graphqlFetch({
		query: graphql(`
			query GetContentPropertiesQuery(
				$workspace: Workspace!
				$language: String!
				$query: InputGqlJcrNodeCriteriaInput!
				$limit: Int
			) {
				jcr(workspace: $workspace) {
					nodesByCriteria(criteria: $query, limit: $limit) {
						nodes {
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
		`),
		variables: {
			workspace: config.workspace,
			query: {
				// Complete the query with type and ordering
				nodeType: "luxe:estate",
				ordering: config.ordering,
				nodeConstraint: constraints.length > 0 ? { all: constraints } : null,
			},
			language: config.language,
			limit: config.limit,
		},
	});

	/** Simplifies the GraphQL response */
	const process = ({ errors, data }: Awaited<typeof response>) => {
		if (errors) {
			console.error(JSON.stringify(errors));
		}

		return (data?.jcr?.nodesByCriteria?.nodes ?? [])
			.filter((node) => node !== null)
			.map((node) => ({
				url: node.url!,
				title: node.title?.value || "",
				image: node.images?.refNodes?.[0]?.url || "",
				price: node.price?.longValue || 0,
				surface: node.surface?.longValue || 0,
				bedrooms: node.bedrooms?.longValue || 0,
			}));
	};

	if ("then" in response) return response.then(process);
	return process(response);
}
