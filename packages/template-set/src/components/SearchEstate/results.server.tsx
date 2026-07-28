import {
	buildEndpointUrl,
	Island,
	jahiaComponent,
	server,
	useGQLQuery,
} from "@jahia/javascript-modules-library";
import { fetchEstate } from "./graphql.ts";
import { parsePagination } from "./pagination.ts";
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
			"cache.requestParameters": "country,type,bedrooms,page,limit",

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
			// Only retrieve known parameters, ignore others.
			// getParameterMap() values are Java String[]: copy them into plain JS
			// string arrays, otherwise the Island props serializer encodes their
			// elements as array holes and the client receives [undefined].
			["country", "type", "bedrooms"].map((param) => [
				param,
				Array.from(javaParamMap.getOrDefault(param, []), String),
			]),
		);

		// Extract pagination parameters from URL
		const pageParam = javaParamMap.getOrDefault("page", ["1"])[0];
		const limitParam = javaParamMap.getOrDefault("limit", ["30"])[0];
		const { limit, offset } = parsePagination(pageParam, limitParam);

		// All the data required to fetch the estate nodes
		const config: QueryConfig = {
			workspace: renderContext.isLiveMode() ? "LIVE" : "EDIT",
			rootPath: renderContext.getSite().getPath(),
			language: currentNode.getLanguage(),
			params,
			offset,
			limit,
			gqlUrl: buildEndpointUrl("/modules/graphql"),
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
