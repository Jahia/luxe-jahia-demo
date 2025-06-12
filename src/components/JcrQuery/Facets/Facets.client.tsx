import React, { useState, useMemo } from "react";
// import SearchFacets from "./SearchFacets";
// import SearchResults from "./SearchResults";
// import { Property, SearchFilters } from "../types/search";
// import { mockProperties } from "../data/mockData";
import styles from "./Facets.client.module.css";
import type { FacetProps, RenderNodeProps } from "~/components/JcrQuery/types";
import alert from "~/templates/css/alert.module.css";
import { t } from "i18next";
import FacetsFilter from "~/components/JcrQuery/Facets/FacetsFilter.client";

export default function FacetsClient({
  nodes,
  facets,
  warn,
  noResultText,
  subNodeView,
  isEditMode,
}: {
  nodes: RenderNodeProps[];
  facets: FacetProps[];
  warn: string;
  noResultText: string;
  subNodeView?: string;
  isEditMode: boolean;
}) {
  // const [filters, setFilters] = useState<SearchFilters>({
  //   types: [],
  //   priceRange: [0, 1000000],
  //   dateRange: [new Date("2020-01-01"), new Date()],
  //   periods: [],
  // });
  //
  // const filteredProperties = useMemo(() => {
  //   return mockProperties.filter((property: Property) => {
  //     // Filter by types
  //     if (filters.types.length > 0 && !filters.types.includes(property.type)) {
  //       return false;
  //     }
  //
  //     // Filter by price range
  //     if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
  //       return false;
  //     }
  //
  //     // Filter by date range
  //     const propertyDate = new Date(property.date);
  //     if (propertyDate < filters.dateRange[0] || propertyDate > filters.dateRange[1]) {
  //       return false;
  //     }
  //
  //     // Filter by periods
  //     if (filters.periods.length > 0) {
  //       const daysDiff = Math.floor(
  //         (new Date().getTime() - propertyDate.getTime()) / (1000 * 3600 * 24),
  //       );
  //       const matchesPeriod = filters.periods.some((period) => {
  //         switch (period) {
  //           case "less than 1 month":
  //             return daysDiff <= 30;
  //           case "less than 6 months":
  //             return daysDiff <= 180;
  //           case "less than 1 year":
  //             return daysDiff <= 365;
  //           default:
  //             return false;
  //         }
  //       });
  //       if (!matchesPeriod) return false;
  //     }
  //
  //     return true;
  //   });
  // }, [filters]);

  return (
    <div className={styles.container}>
      <div className={styles.facetsColumn}>
        <FacetsFilter {...{ facets, isEditMode }} />

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
