import { useState, useCallback, useMemo } from "react";
import type { FacetProps } from "~/components/JcrQuery/types";
import { useUpdateJcrQueryFacetFields } from "~/components/JcrQuery/Facets/Hooks/Gql.client";

export interface FacetItem {
  id: string;
  label: string;
  isActive: boolean;
  type: string;
  values: unknown[];
  selectedValues: unknown[];
}

export function useFacet(facets: FacetProps[], jcrQueryUuid: string) {
  const [facetOrder, setFacetOrder] = useState<FacetItem[]>(
    facets.map((facet) => ({
      id: facet.name,
      label: facet.displayName,
      isActive: facet.isActive,
      type: facet.requiredType,
      values: facet.values || [],
      selectedValues: [],
    })),
  );

  const { mutate } = useUpdateJcrQueryFacetFields();

  const moveFacet = useCallback((from: number, to: number) => {
    setFacetOrder((prev) => {
      const updated = [...prev];
      const [removed] = updated.splice(from, 1);
      updated.splice(to, 0, removed);
      return updated;
    });
  }, []);

  const handleFacetValuesChange = useCallback((facetId: string, values: unknown[]) => {
    setFacetOrder((prev) =>
      prev.map((facet) => (facet.id === facetId ? { ...facet, selectedValues: values } : facet)),
    );
  }, []);

  const handleFacetVisibilityChange = useCallback(
    (newSetOfSelectedFacets: string[]) => {
      mutate({
        pathsOrIds: [jcrQueryUuid],
        facetFields: newSetOfSelectedFacets,
      });
      setFacetOrder((prev) =>
        prev.map((facet) => ({
          ...facet,
          isActive: newSetOfSelectedFacets.includes(facet.id),
        })),
      );
    },
    [mutate, jcrQueryUuid],
  );

  const enabledFacets = useMemo(() => facetOrder.filter((facet) => facet.isActive), [facetOrder]);

  return {
    facetOrder,
    enabledFacets,
    moveFacet,
    handleFacetValuesChange,
    handleFacetVisibilityChange,
  };
}
