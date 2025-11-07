import { Row, Section } from "design-system";
import { useState } from "react";
import { fetchEstate, graphqlFetch } from "./graphql.ts";
import classes from "./SearchEstate.client.module.css";
import SearchEstateFormClient from "./SearchEstateForm.client.tsx";
import SearchResultsClient from "./SearchResults.tsx";
import type { QueryConfig, Estate } from "./types.ts";

export default function SearchEstateClient({
	config,
	results: initialResults,
	isEditMode,
}: {
	config: QueryConfig;
	results: Estate[];
	isEditMode: boolean;
}) {
	const [params, setParams] = useState(config.params);
	const [results, setResults] = useState(initialResults);

	return (
		<Section>
			<Row className={classes.searchRow}>
				<SearchEstateFormClient
					onChange={(params) => {
						setParams(params);

						// Update the URL to create a shareable link
						const q = new URLSearchParams(
							Object.entries(params).flatMap(([k, vals]) => vals.map((v) => [k, v])),
						);
						history.pushState(
							null,
							"",
							`${window.location.pathname}${q.size > 0 ? `?${q.toString()}` : ""}`,
						);

						// Fetch new results
						fetchEstate(graphqlFetch, { ...config, params }).then(setResults);
					}}
					params={params}
				/>
			</Row>
			<Row className={classes.resultsRow}>
				<SearchResultsClient results={results} isEditMode={isEditMode} locale={config.language} />
			</Row>
		</Section>
	);
}
