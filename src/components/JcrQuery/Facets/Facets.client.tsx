import { useState, useMemo } from "react";
// import SearchFacets from "./SearchFacets";
// import SearchResults from "./SearchResults";
// import { Property, SearchFilters } from "../types/search";
// import { mockProperties } from "../data/mockData";
import styles from "./Facets.client.module.css";
import type { FacetProps, RenderNodeProps } from "~/components/JcrQuery/types";
import alert from "~/templates/css/alert.module.css";
import { t } from "i18next";
import FacetsFilter from "~/components/JcrQuery/Facets/FacetsFilter.client";
import { JCRQueryBuilder, type JCRQueryConfig } from "~/components/JcrQuery/JCRQueryBuilder";

/* eslint-disable @eslint-react/dom/no-dangerously-set-innerhtml */
export default function FacetsClient({
  jcrQueryBuilderProps,
  jcrQueryUuid,
  nodes,
  facets,
  warn,
  noResultText,
  subNodeView,
  isEditMode,
}: {
  jcrQueryBuilderProps: JCRQueryConfig;
  jcrQueryUuid: string;
  nodes: RenderNodeProps[];
  facets: FacetProps[];
  warn: string;
  noResultText: string;
  subNodeView?: string;
  isEditMode: boolean;
}) {
  const builder = useMemo(() => new JCRQueryBuilder(jcrQueryBuilderProps), [jcrQueryBuilderProps]);
  const { jcrQuery } = useMemo(() => builder.build(), [builder]);
  console.log("JCR Query:", jcrQuery);
  return (
    <div className={styles.container}>
      <div className={styles.facetsColumn}>
        <FacetsFilter {...{ facets, isEditMode, jcrQueryUuid, builder }} />

        {/*<SearchFacets filters={filters} onFiltersChange={setFilters} />*/}
      </div>
      <div className={styles.resultsColumn}>
        {/*<SearchResults properties={filteredProperties} />*/}
        {nodes.map(({ html, uuid }) => (
          <div
            key={uuid}
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
        ))}
      </div>
    </div>
  );
}
