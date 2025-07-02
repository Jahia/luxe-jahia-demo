import { useState, useCallback, useMemo, useRef } from "react";
import type { Constraint, FacetProps, RenderNodeProps } from "~/components/JcrQuery/types";
import type { JCRQueryBuilderType } from "~/components/JcrQuery/JCRQueryBuilder";

export function useFacet({
  builder,
  facets: initialFacets,
  setNodes,
}: {
  builder: JCRQueryBuilderType;
  facets: FacetProps[];
  setNodes: (nodes: RenderNodeProps[]) => void;
}) {
  const [facets, setFacets] = useState<FacetProps[]>(initialFacets);
  const [isLoading, setIsLoading] = useState(false);
  const lastRequestIdRef = useRef(0);

  // const moveFacet = useCallback((from: number, to: number) => {
  //   setFacets((prev) => {
  //     const updated = [...prev];
  //     const [removed] = updated.splice(from, 1);
  //     updated.splice(to, 0, removed);
  //     return updated;
  //   });
  // }, []);

  const handleFacetValuesChange = useCallback(
    async (facetId: string, values: Constraint[]) => {
      const facet = facets.find((f) => f.id === facetId);
      if (!facet) return;

      // Identifiant unique pour gérer les requêtes concurrentes
      const requestId = ++lastRequestIdRef.current;
      setIsLoading(true);

      try {
        if (values.length === 0) {
          builder.deleteConstraints(facetId);
        } else {
          builder.setConstraints(values);
        }

        const renderNodes = await builder.execute();

        // Ignorer les résultats si une requête plus récente a été lancée
        if (requestId !== lastRequestIdRef.current) return;

        setNodes(renderNodes || []);

        setFacets((prev) =>
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
    [builder, facets, setNodes],
  );

  return {
    facets,
    handleFacetValuesChange,
    isLoading,
  };
}
