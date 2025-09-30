import { Island, jahiaComponent, server, useGQLQuery } from "@jahia/javascript-modules-library";
import { gqlNodesQueryString, JCRQueryBuilder } from "~/commons/libs/jcrQueryBuilder";
import type {
	Constraint,
	GqlNode,
	JCRQueryConfig,
	RenderNodeProps,
} from "~/commons/libs/jcrQueryBuilder/types.ts";
import SearchEstateClient from "~/components/SearchEstate/SearchEstate.client.tsx";

jahiaComponent(
	{
		nodeType: "luxe:searchEstate",
		name: "results",
		displayName: "Search Estate Results",
		componentType: "view",
		properties: {
			// Ensures only one thread rebuilds the cache; others wait and reuse the same cached fragment.
			"cache.latch": "true",

			// Declares which request parameters are part of the cache key.
			// Different values for these parameters will generate separate cache entries.
			"cache.requestParameters": "country,type,bedrooms",

			// Time-to-live (TTL) for this cached fragment, in seconds.
			// Here: 600s = 10 minutes, after which the cache entry expires and is recomputed.
			"cache.expiration": "600",
		},
	},
	(_, { renderContext, currentNode }) => {
		const builderConfig: JCRQueryConfig = {
			workspace: renderContext.getWorkspace() === "default" ? "EDIT" : "LIVE",
			type: "luxe:estate",
			startNodePath: "/sites/luxe/contents/agencies",
			criteria: "j:lastPublished",
			sortDirection: "desc",
			categories: [],
			excludeNodes: [],
			uuid: currentNode.getIdentifier(),
			subNodeView: "default",
			language: currentNode.getLanguage(),
			limit: 30,
		};
		const builder = new JCRQueryBuilder(builderConfig);

		const paramMap = renderContext.getRequest().getParameterMap();
		const constraintMap: Record<string, { type: "string" | "number" }> = {
			country: { type: "string" },
			type: { type: "string" },
			bedrooms: { type: "number" },
		};

		const constraints: Constraint[] = [];

		for (const [prop, { type }] of Object.entries(constraintMap)) {
			const values = paramMap[prop];
			if (!values?.length) continue;

			if (type === "number") {
				const parsed = values.map((v) => Number.parseInt(v, 10)).filter((n) => Number.isInteger(n));
				if (parsed.length) {
					constraints.push({ prop, operator: "IN", values: parsed });
				}
			} else {
				constraints.push({ prop, operator: "IN", values });
			}
		}

		if (constraints.length) {
			builder.setConstraints(constraints);
		}

		const { jcrQuery, cacheDependency } = builder.build();
		server.render.addCacheDependency({ flushOnPathMatchingRegexp: cacheDependency }, renderContext);

		const gqlContents = useGQLQuery({
			query: gqlNodesQueryString({
				isRenderEnabled: true,
				limit: builderConfig.limit,
				offset: 0,
			}),
			variables: {
				workspace: builderConfig.workspace,
				query: jcrQuery,
				language: builderConfig.language,
				view: builderConfig.subNodeView,
			},
		});

		const gqlNodes: GqlNode[] = gqlContents?.data?.jcr?.nodesByQuery?.nodes;
		const nodes: RenderNodeProps[] = gqlNodes?.map((node) => {
			if (!node.renderedContent?.output) {
				console.warn(`No rendered content for node ${node.uuid}`);
			}
			return {
				html: node.renderedContent?.output || "",
				uuid: node.uuid,
			};
		});

		return (
			<Island
				component={SearchEstateClient}
				props={{
					builderConfig,
					builderConstraints: builder.getConstraints(),
					nodes,
				}}
			/>
		);
	},
);
