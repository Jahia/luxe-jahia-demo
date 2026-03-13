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

	const totalPages = Math.ceil(results.totalCount / config.limit);
	const showPagination = totalPages > 1;

	const updateSearchResults = (newParams: typeof params, pageNumber: number, limit: number) => {
		const offset = (pageNumber - 1) * limit;

		// Build URL query string
		const q = new URLSearchParams(
			Object.entries(newParams).flatMap(([k, vals]) => vals.map((v) => [k, v])),
		);
		q.set("page", pageNumber.toString());
		if (limit !== 30) {
			q.set("limit", limit.toString());
		}

		// Update browser history
		const url = `${window.location.pathname}${q.size > 0 ? `?${q.toString()}` : ""}`;
		history.pushState(null, "", url);

		// Fetch new results
		fetchEstate(graphqlFetch, {
			...config,
			params: newParams,
		}).then((result) => {
			setResults(result);
		});
	};

	const handlePageChange = (newPageNumber: number) => {
		updateSearchResults(params, newPageNumber, pageSize);
	};

	const handlePageSizeChange = (newPageSize: number) => {
		setPageSize(newPageSize);
		updateSearchResults(params, 1, newPageSize); // Reset to page 1 when page size changes
	};

	const handleFilterChange = (newParams: typeof params) => {
		setParams(newParams);
		updateSearchResults(newParams, 1, pageSize); // Reset to page 1 when filters change
	};

	return (
		<Section>
			<Row className={classes.searchRow}>
				<SearchEstateFormClient onChange={handleFilterChange} params={params} />
			</Row>

			{showPagination && (
				<Row>
					<PaginationHeader
						from={(pagination.currentPage - 1) * pageSize + 1}
						to={Math.min(pagination.currentPage * pageSize, pagination.totalCount)}
						total={pagination.totalCount}
						label={t("pagination.showing", {
							from: (pagination.currentPage - 1) * pageSize + 1,
							to: Math.min(pagination.currentPage * pageSize, pagination.totalCount),
							total: pagination.totalCount,
						})}
						pageSize={pageSize}
						pageSizeOptions={[9, 18, 30, 48, 90]}
						onPageSizeChange={handlePageSizeChange}
						pageSizeLabel={t("pagination.itemsPerPage")}
					/>
				</Row>
			)}

			<Row className={classes.resultsRow}>
				<SearchResultsClient results={results} isEditMode={isEditMode} locale={config.language} />
			</Row>

			{showPagination && (
				<Row>
					<Pagination
						currentPage={results.currentPage}
						totalPages={Math.ceil(results.totalCount / config.limit)}
						onPageChange={handlePageChange}
						variant="icon-only"
						labels={{
							previous: t("pagination.previous"),
							next: t("pagination.next"),
							page: t("pagination.page", { page: "" }).trim(),
							ariaLabel: t("pagination.label"),
						}}
					/>
				</Row>
			)}
		</Section>
	);
}
