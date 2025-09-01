import {
	buildNodeUrl,
	getNodesByJCRQuery,
	HydrateInBrowser,
	jahiaComponent,
	server,
	useGQLQuery,
} from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import SearchEstateFormClient from "~/components/SearchEstate/SearchEstateForm.client.tsx";
import { gqlNodesQueryString, JCRQueryBuilder } from "~/commons/libs/jcrQueryBuilder";
import type {
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
	},
	({ resultsPage }: { resultsPage: JCRNodeWrapper }, { renderContext, currentNode }) => {
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

		// country: string[]
		const countries = paramMap["country"];
		if (countries?.length) {
			builder.setConstraints([{ prop: "country", operator: "IN", values: countries }]);
		}

		// type: string[]
		const types = paramMap["type"];
		if (types?.length) {
			builder.setConstraints([{ prop: "type", operator: "IN", values: types }]);
		}

		// rooms: string[] → number[]
		const roomsParam = paramMap["rooms"];
		if (roomsParam?.length) {
			const parsed = roomsParam
				.map((r) => Number.parseInt(r, 10))
				.filter((n) => Number.isInteger(n));
			if (parsed.length) {
				builder.setConstraints([{ prop: "rooms", operator: "IN", values: parsed }]);
			}
		}

		const { jcrQuery, cacheDependency } = builder.build();
		server?.render.addCacheDependency(
			{ flushOnPathMatchingRegexp: cacheDependency },
			renderContext,
		);

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
		const nodes: RenderNodeProps[] = gqlNodes?.map((node) => ({
			html: node.renderedContent.output,
			uuid: node.uuid,
		}));

		return (
			<HydrateInBrowser
				child={SearchEstateClient}
				props={{
					builderConfig,
					builderConstraints: builder.getConstraints(),
					nodes,
				}}
			/>
		);
	},
);
