import { useState, useCallback, useMemo } from "react";
import type { FacetProps } from "~/components/JcrQuery/types";
import { useGraphQL } from "~/components/JcrQuery/Facets/Hooks/Gql.client";
import type { JCRQueryBuilderType } from "~/components/JcrQuery/JCRQueryBuilder";

export function useFacet(builder: JCRQueryBuilderType, facets: FacetProps[], jcrQueryUuid: string) {
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

  const handleFacetValuesChange = useCallback((facetId: string, values: unknown[]) => {
    const facet = facetOrder.find((f) => f.id === facetId);
    if (!facet) return;

    values?.forEach((value) => builder.addConstraint(facet.id, "=", value as string));
    const { jcrQuery } = builder.build();
    console.log("Updated JCR Query:", jcrQuery);
    //todo

    setFacetOrder((prev) =>
      prev.map((facet) => (facet.id === facetId ? { ...facet, selectedValues: values } : facet)),
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

      // const graphQLFragProperties = generateGraphQLFragProperties(
      //   facetOrder.filter(),
      //   "FacetPropertiesValues",
      // );
      // const gqlContents = useGQLQuery({
      //   query: gqlNodesQueryString(
      //     { name: "FacetPropertiesValues", value: graphQLFragProperties },
      //     true,
      //   ),
      //   variables: {
      //     query: jcrQuery,
      //     language: currentLocaleCode,
      //   },
      // });

      // mutate({
      //   pathsOrIds: [jcrQueryUuid],
      //   facetFields: newSetOfSelectedFacets,
      // });
      //
      // setFacetOrder((prev) =>
      //   prev.map((facet) => ({
      //     ...facet,
      //     isActive: newSetOfSelectedFacets.includes(facet.id),
      //   })),
      // );
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
