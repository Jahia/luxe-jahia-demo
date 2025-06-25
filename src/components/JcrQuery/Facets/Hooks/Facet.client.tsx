import { useState, useCallback, useMemo, useRef } from "react";
import type { Constraint, FacetProps, RenderNodeProps } from "~/components/JcrQuery/types";
import { useGraphQL } from "~/components/JcrQuery/Facets/Hooks/Gql.client";
import type { JCRQueryBuilderType } from "~/components/JcrQuery/JCRQueryBuilder";

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
  const [isLoading, setIsLoading] = useState(false);
  const lastRequestIdRef = useRef(0);

  const { execute } = useGraphQL();

  const moveFacet = useCallback((from: number, to: number) => {
    setFacetOrder((prev) => {
      const updated = [...prev];
      const [removed] = updated.splice(from, 1);
      updated.splice(to, 0, removed);
      return updated;
    });
  }, []);

  const handleFacetValuesChange = useCallback(
    async (facetId: string, values: Constraint[]) => {
      const facet = facetOrder.find((f) => f.id === facetId);
      if (!facet) return;

      // Identifiant unique pour gérer les requêtes concurrentes
      const requestId = ++lastRequestIdRef.current;
      setIsLoading(true);

      try {
        if (values.length === 0) {
          builder.deleteConstraints(facetId);
        } else {
          builder.setConstraints(...values);
        }

        const renderNodes = await builder.execute();

        // Ignorer les résultats si une requête plus récente a été lancée
        if (requestId !== lastRequestIdRef.current) return;

        setNodes(renderNodes || []);

        setFacetOrder((prev) =>
          prev.map((facet) => (facet.id === facetId ? { ...facet, constraints: values } : facet)),
        );
      } catch (error) {
        console.error("Erreur lors de la mise à jour des contraintes:", error);
      } finally {
        if (requestId === lastRequestIdRef.current) {
          setIsLoading(false);
        }
      }
    },
    [builder, facetOrder, setNodes],
  );

  const handleFacetVisibilityChange = useCallback(
    async (newSetOfSelectedFacets: string[]) => {
      setIsLoading(true);

      try {
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

        await execute([mutation]);

        setFacetOrder((prev) =>
          prev.map((facet) => ({
            ...facet,
            isActive: newSetOfSelectedFacets.includes(facet.id),
          })),
        );
      } catch (error) {
        console.error("Erreur lors de la mise à jour des facets:", error);
      } finally {
        setIsLoading(false);
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
    isLoading,
  };
}
