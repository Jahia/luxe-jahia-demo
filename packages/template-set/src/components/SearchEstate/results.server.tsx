import { Island, jahiaComponent, server, useGQLQuery } from "@jahia/javascript-modules-library";
import { gqlNodesQuery } from "~/commons/libs/jcrQueryBuilder";
import type { JCRQueryConfig, RenderNodeProps } from "~/commons/libs/jcrQueryBuilder/types.ts";
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
			startNodePath: `${renderContext.getSite().getPath()}/contents/agencies`,
			criteria: "j:lastPublished",
			sortDirection: "desc",
			categories: [],
			excludeNodes: [],
			uuid: currentNode.getIdentifier(),
			subNodeView: "default",
			language: currentNode.getLanguage(),
			limit: 30,
		};
		server.render.addCacheDependency(
			{ flushOnPathMatchingRegexp: builderConfig.startNodePath + "/.*" },
			renderContext,
		);

		const javaParamMap = renderContext.getRequest().getParameterMap();
		const params = Object.fromEntries(
			["country", "type", "bedrooms"].map((param) => [param, javaParamMap.getOrDefault(param, [])]),
		);

		const constraints = Object.entries(params)
			.map(([param, values]) => ({
				any: values.map((value) => ({ property: param, equals: value })),
			}))
			// Remove constraints with no values
			.filter(({ any }) => any.length > 0);

		const gqlContents = useGQLQuery({
			query: gqlNodesQuery,
			variables: {
				workspace: builderConfig.workspace,
				query: {
					nodeType: builderConfig.type,
					nodeConstraint: constraints.length > 0 ? { all: constraints } : null,
					ordering: {
						property: builderConfig.criteria,
						orderType: builderConfig.sortDirection.toUpperCase() as "ASC" | "DESC",
					},
				},
				language: builderConfig.language,
				view: builderConfig.subNodeView,
				limit: builderConfig.limit,
			},
		});

		if (gqlContents.errors) {
			console.error(JSON.stringify(gqlContents.errors));
		}

		const gqlNodes = (gqlContents?.data?.jcr?.nodesByCriteria?.nodes ?? []).filter(
			(node) => node !== null,
		);
		const nodes = gqlNodes?.map((node) => {
			if (!node.renderedContent?.output) {
				console.warn(`No rendered content for node ${node.uuid}`);
			}
			return {
				html: node.renderedContent?.output || "",
				uuid: node.uuid,
			};
		}) satisfies RenderNodeProps[];

		return (
			<Island
				component={SearchEstateClient}
				props={{
					builderConfig,
					params,
					nodes,
					isEditMode: renderContext.isEditMode(),
				}}
			/>
		);
	},
);
