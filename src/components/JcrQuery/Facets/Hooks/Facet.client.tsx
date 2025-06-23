import { useState, useCallback, useMemo } from "react";
import type { Constraint, FacetProps, RenderNodeProps } from "~/components/JcrQuery/types";
import { useGraphQL } from "~/components/JcrQuery/Facets/Hooks/Gql.client";
import type { JCRQueryBuilderType } from "~/components/JcrQuery/JCRQueryBuilder";
import { gqlNodesQueryString } from "~/components/JcrQuery/utils";

export function useFacet({
  builder,
  facets,
  jcrQueryUuid,
  setNodes,
}: {
  builder: JCRQueryBuilderType;
  facets: FacetProps[];
  jcrQueryUuid: string;
  setNodes: (nodes: RenderNodeProps[]) => void;
}) {
  const [facetOrder, setFacetOrder] = useState<FacetProps[]>(facets);

  const { execute } = useGraphQL();

  const moveFacet = useCallback((from: number, to: number) => {
    setFacetOrder((prev) => {
      const updated = [...prev];
      const [removed] = updated.splice(from, 1);
      updated.splice(to, 0, removed);
      return updated;
    });
  }, []);

  const handleFacetValuesChange = useCallback((facetId: string, values: Constraint[]) => {
    const facet = facetOrder.find((f) => f.id === facetId);
    if (!facet) return;

    // Update the builder with the new constraints
    builder.setConstraint(...values);
    builder.execute();

    setFacetOrder((prev) =>
      prev.map((facet) => (facet.id === facetId ? { ...facet, constraints: values } : facet)),
    );
  }, []);

  const handleFacetVisibilityChange = useCallback(
    async (newSetOfSelectedFacets: string[]) => {
      const mutation = {
        query: `
          mutation UpdateFacetFields($pathsOrIds: [String!]!, $facetFields: [String!]!) {
            jcr {
              mutateNodes(pathsOrIds: $pathsOrIds) {
                mutateProperty(name: "facetFields") {
                  setValues(values: $facetFields)
                  property {
                    values
                  }
                }
              }
            }
          }`,
        variables: {
          pathsOrIds: [jcrQueryUuid],
          facetFields: newSetOfSelectedFacets,
        },
      };

      try {
        await execute([mutation]);
        setFacetOrder((prev) =>
          prev.map((facet) => ({
            ...facet,
            isActive: newSetOfSelectedFacets.includes(facet.id),
          })),
        );
      } catch (e) {
        // Gérer l’erreur si besoin
      }
    },
    [execute, jcrQueryUuid],
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
