import { useState } from "react";
import classes from "./SearchEstate.client.module.css";
import type { JCRQueryConfig, RenderNodeProps } from "~/commons/libs/jcrQueryBuilder/types.ts";
import SearchEstateFormClient from "~/components/SearchEstate/SearchEstateForm.client.tsx";
import SearchResultsClient from "~/components/SearchEstate/SearchResults.client.tsx";
import { Row, Section } from "design-system";
import { execute, fetchEstate } from "~/commons/libs/jcrQueryBuilder/index.ts";

export default function SearchEstateClient({
	config,
	nodes: initialNodes,
	isEditMode,
}: {
	config: JCRQueryConfig;
	nodes: RenderNodeProps[];
	isEditMode: boolean;
}) {
	const [params, setParams] = useState(config.params);
	const [nodes, setNodes] = useState(initialNodes);

	return (
		<Section>
			<Row className={classes.searchRow}>
				<SearchEstateFormClient
					onChange={(params) => {
						setParams(params);

						// Update URL to create a shareable link
						const q = new URLSearchParams(
							Object.entries(params).flatMap(([k, vals]) => vals.map((v) => [k, v])),
						);
						history.pushState(
							null,
							"",
							`${window.location.pathname}${q.size > 0 ? `?${q.toString()}` : ""}`,
						);

						// Fetch new results
						fetchEstate(execute, { ...config, params }).then(setNodes);
					}}
					params={params}
				/>
			</Row>
			<Row className={classes.resultsRow}>
				<SearchResultsClient nodes={nodes} isEditMode={isEditMode} locale={config.language} />
			</Row>
		</Section>
	);
}
