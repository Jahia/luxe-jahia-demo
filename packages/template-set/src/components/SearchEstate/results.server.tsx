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
