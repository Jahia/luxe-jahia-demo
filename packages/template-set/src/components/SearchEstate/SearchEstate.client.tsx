import { Row, Section, Pagination, PaginationHeader } from "design-system";
import { useState } from "react";
import { fetchEstate, graphqlFetch } from "./graphql.ts";
import classes from "./SearchEstate.client.module.css";
import SearchEstateFormClient from "./SearchEstateForm.client.tsx";
import SearchResultsClient from "./SearchResults.tsx";
import type { QueryConfig, FetchEstateResult } from "./types.ts";
import { useTranslation } from "react-i18next";

export default function SearchEstateClient({
	config,
	results: initialResults,
	isEditMode,
}: {
	config: QueryConfig;
	results: FetchEstateResult;
	isEditMode: boolean;
}) {
	const { t } = useTranslation();
	const [params, setParams] = useState(config.params);
	const [results, setResults] = useState(initialResults);
	const [limit, setLimit] = useState(config.limit);

	const totalPages = Math.ceil(results.totalCount / limit);

	const updateSearchResults = (newParams: typeof params, page: number, limit: number) => {
		// Build URL query string
		const q = new URLSearchParams(
			Object.entries(newParams).flatMap(([k, vals]) => vals.map((v) => [k, v])),
		);

		q.set("page", page.toString());
		if (limit !== 30) q.set("limit", limit.toString());

		// Update browser history
		const url = `${window.location.pathname}${q.size > 0 ? `?${q.toString()}` : ""}`;
		history.pushState(null, "", url);

		// Fetch new results
		fetchEstate(graphqlFetch, {
			...config,
			params: newParams,
			offset: (page - 1) * limit,
			limit,
		}).then((result) => {
			setResults(result);
		});
	};

	const handlePageChange = (newPage: number) => {
		updateSearchResults(params, newPage, limit);
	};

	const handlePageSizeChange = (newLimit: number) => {
		setLimit(newLimit);
		updateSearchResults(params, 1, newLimit); // Reset to page 1 when page size changes
	};

	const handleFilterChange = (newParams: typeof params) => {
		setParams(newParams);
		updateSearchResults(newParams, 1, limit); // Reset to page 1 when filters change
	};

	return (
		<Section>
			<Row className={classes.searchRow}>
				<SearchEstateFormClient onChange={handleFilterChange} params={params} />
			</Row>

			{totalPages > 1 && (
				<Row>
					<PaginationHeader
						label={t("pagination.showing", {
							from: (results.currentPage - 1) * limit + 1,
							to: Math.min(results.currentPage * limit, results.totalCount),
							total: results.totalCount,
						})}
						pageSize={limit}
						pageSizeOptions={[9, 18, 30, 48, 90]}
						onPageSizeChange={handlePageSizeChange}
						pageSizeLabel={t("pagination.itemsPerPage")}
					/>
				</Row>
			)}

			<Row className={classes.resultsRow}>
				<SearchResultsClient
					results={results.estates}
					isEditMode={isEditMode}
					locale={config.language}
				/>
			</Row>

			{totalPages > 1 && (
				<Row>
					<Pagination
						currentPage={results.currentPage}
						totalPages={Math.ceil(results.totalCount / limit)}
						onPageChange={handlePageChange}
						labels={{
							previous: t("pagination.previous"),
							next: t("pagination.next"),
							page: t("pagination.page", { page: results.currentPage }),
							ariaLabel: t("pagination.label"),
						}}
					/>
				</Row>
			)}
		</Section>
	);
}
