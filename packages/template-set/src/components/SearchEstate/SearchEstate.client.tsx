import { useState } from "react";
import classes from "./SearchEstate.client.module.css";
import type { JCRQueryConfig, RenderNodeProps } from "~/commons/libs/jcrQueryBuilder/types.ts";
import SearchEstateFormClient from "~/components/SearchEstate/SearchEstateForm.client.tsx";
import SearchResultsClient from "~/components/SearchEstate/SearchResults.client.tsx";
import { Row, Section } from "design-system";
import { execute, getCriteria, gqlNodesQuery } from "~/commons/libs/jcrQueryBuilder/index.ts";

export default function SearchEstateClient({
	builderConfig: config,
	params: initialParams,
	nodes: initialNodes,
	isEditMode,
}: {
	builderConfig: JCRQueryConfig;
	params: Record<string, string[]>;
	nodes: RenderNodeProps[];
	isEditMode: boolean;
}) {
	const [params, setParams] = useState(initialParams);
	const [nodes, setNodes] = useState(initialNodes);

	return (
		<Section>
			<Row className={classes.searchRow}>
				<SearchEstateFormClient
					onChange={async (params) => {
						// Always update URL to preserve navigation history
						setParams(params);
						const q = new URLSearchParams(
							Object.entries(params).flatMap(([k, vals]) => vals.map((v) => [k, v])),
						);
						history.pushState(
							null,
							"",
							`${window.location.pathname}${q.size > 0 ? `?${q.toString()}` : ""}`,
						);

						const data = await execute(
							gqlNodesQuery,
							{
								workspace: config.workspace,
								query: getCriteria(params, config),
								view: config.subNodeView,
								language: config.language,
								limit: config.limit,
							},
							{
								signal: AbortSignal.timeout(5000),
							},
						);

						const nodes = (data.jcr.nodesByCriteria?.nodes ?? [])
							.filter((node) => node !== null)
							.map(({ uuid, renderedContent }) => {
								if (!renderedContent?.output) {
									console.warn(`No rendered content for node ${uuid}`);
								}
								return {
									uuid,
									html: renderedContent?.output ?? "",
								};
							});

						setNodes(nodes);
					}}
					params={params}
				/>
			</Row>
			<Row className={classes.resultsRow}>
				<SearchResultsClient nodes={nodes} isEditMode={isEditMode} />
			</Row>
		</Section>
	);
}
