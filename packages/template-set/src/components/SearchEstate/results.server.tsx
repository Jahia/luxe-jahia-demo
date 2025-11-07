import { Island, jahiaComponent, server, useGQLQuery } from "@jahia/javascript-modules-library";
import { fetchEstate } from "./graphql.ts";
import SearchEstateClient from "./SearchEstate.client.tsx";
import type { QueryConfig } from "./types.ts";

jahiaComponent(
	{
		componentType: "view",
		nodeType: "luxe:searchEstate",
		name: "results",
		displayName: "Search Estate Results",
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
		server.render.addCacheDependency(
			{ flushOnPathMatchingRegexp: `${renderContext.getSite().getPath()}/contents/agencies/.*` },
			renderContext,
		);

		const javaParamMap = renderContext.getRequest().getParameterMap();
		const params = Object.fromEntries(
			// Only retrieve known parameters, ignore others
			["country", "type", "bedrooms"].map((param) => [param, javaParamMap.getOrDefault(param, [])]),
		);

		// All the data required to fetch the estate nodes
		const config: QueryConfig = {
			workspace: renderContext.isLiveMode() ? "LIVE" : "EDIT",
			language: currentNode.getLanguage(),
			params,
		};
		const results = fetchEstate(useGQLQuery, config);

		return (
			<Island
				component={SearchEstateClient}
				props={{
					config,
					results,
					isEditMode: renderContext.isEditMode(),
				}}
			/>
		);
	},
);
