/* eslint-disable @typescript-eslint/no-explicit-any */
import { initGraphQLTada, type TadaDocumentNode, type setupSchema } from "gql.tada";
import { print } from "@0no-co/graphql.web";
import type { QueryConfig, FetchEstateResult } from "./types.ts";
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

	if (!response.ok) {
		throw new Error(`GraphQL HTTP error: ${response.status} ${response.statusText}`);
	}

	return response.json();
}

// Two overloads, to expose both a sync and an async version
export function fetchEstate(
	f: (opts: any) => { data?: any },
	config: QueryConfig,
): FetchEstateResult;
export function fetchEstate(
	f: (opts: any) => Promise<{ data?: any }>,
	config: QueryConfig,
): Promise<FetchEstateResult>;

// Actual implementation, support both sync and async
export function fetchEstate(
	graphqlFetch: <Result = any, Variables = any>(opts: {
		query: TadaDocumentNode<Result, Variables>;
		variables: Variables;
	}) =>
		| { data?: Result; errors?: GraphQLFormattedError[] }
		| Promise<{ data?: Result; errors?: GraphQLFormattedError[] }>,
	config: QueryConfig,
): FetchEstateResult | Promise<FetchEstateResult> {
	// Prepare a JQOM query based on the provided params
	const constraints = Object.entries(config.params)
		.map(([property, values]) => ({
			any: values.map((value) => ({ property, equals: value })),
		}))
		// Remove constraints with no values
		.filter(({ any }) => any.length > 0);

	// Prepare pagination parameters
	const offset = config.offset ?? 0;
	const limit = config.limit ?? 30;

	const response = graphqlFetch({
		query: graphql(`
			query GetContentPropertiesQuery(
				$workspace: Workspace!
				$language: String!
				$query: InputGqlJcrNodeCriteriaInput!
				$offset: Int!
				$limit: Int!
			) {
				jcr(workspace: $workspace) {
					nodesByCriteria(criteria: $query, offset: $offset, limit: $limit) {
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
						pageInfo {
							totalCount
						}
					}
				}
			}
		`),
		variables: {
			workspace: config.workspace,
			query: {
				// Restrict search to the site root path
				paths: [config.rootPath],
				// Complete the query with type and ordering
				nodeType: "luxe:estate",
				ordering: { property: "price", orderType: "DESC" },
				// In case there are no constraints, retrieve all nodes
				nodeConstraint: constraints.length > 0 ? { all: constraints } : null,
			},
			language: config.language,
			offset,
			limit,
		},
	});

	/** Simplifies the GraphQL response */
	const process = ({ errors, data }: Awaited<typeof response>): FetchEstateResult => {
		if (errors) {
			console.error("Something went wrong:", JSON.stringify(errors));
		}

		const nodesByCriteria = data?.jcr?.nodesByCriteria;
		const estates = (nodesByCriteria?.nodes ?? [])
			.filter((node) => node !== null)
			.map((node) => ({
				url: node.url!,
				title: node.title?.value || "",
				image: node.images?.refNodes?.[0]?.url || "",
				price: node.price?.longValue || 0,
				surface: node.surface?.longValue || 0,
				bedrooms: node.bedrooms?.longValue || 0,
			}));

		return {
			currentPage: Math.floor(offset / limit) + 1,
			totalCount: nodesByCriteria?.pageInfo?.totalCount ?? 0,
			estates,
		};
	};

	// If response is a promise, process it when resolved
	if ("then" in response) return response.then(process);
	return process(response);
}
