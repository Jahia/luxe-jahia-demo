import { Island, jahiaComponent, server, useGQLQuery } from "@jahia/javascript-modules-library";
import { fetchEstate } from "~/commons/libs/jcrQueryBuilder";
import type { JCRQueryConfig } from "~/commons/libs/jcrQueryBuilder/types.ts";
import SearchEstateClient from "~/components/SearchEstate/SearchEstate.client.tsx";

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
			["country", "type", "bedrooms"].map((param) => [param, javaParamMap.getOrDefault(param, [])]),
		);

		const config: JCRQueryConfig = {
			workspace: renderContext.getWorkspace() === "default" ? "EDIT" : "LIVE",
			language: currentNode.getLanguage(),
			params,
			ordering: { property: "j:lastPublished", orderType: "DESC" },
			limit: 30,
		};

		const nodes = fetchEstate(useGQLQuery, config);

		return (
			<Island
				component={SearchEstateClient}
				props={{
					config,
					nodes,
					isEditMode: renderContext.isEditMode(),
				}}
			/>
		);
	},
);
