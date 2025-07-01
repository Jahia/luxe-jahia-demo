import {
  jahiaComponent,
  useGQLQuery,
  server,
  HydrateInBrowser,
} from "@jahia/javascript-modules-library";

import { t } from "i18next";
import {
  generateGraphQLFragProperties,
  getNodePropertyValues,
  gqlContentPropertiesQueryString,
  gqlNodes2DiplayNodes,
  gqlNodesQueryString,
  mapToJCRQueryBuilderProps,
} from "./utils";
import type { FacetProps, JcrQueryProps, RenderNodeProps } from "./types";
import FacetsClient from "~/components/JcrQuery/Facets/Facets.client";
import { JCRQueryBuilder } from "~/components/JcrQuery/JCRQueryBuilder";

// const facetTypeMap: Record<string, string[]> = {
//   ["luxe:estate"]:["price",""]
// }

jahiaComponent(
  {
    nodeType: "luxe:jcrQuery",
    name: "facets",
    displayName: "Facets",
    componentType: "view",
  },
  (
    {
      "jcr:title": title,
      type,
      criteria,
      sortDirection,
      maxItems,
      startNode,
      excludeNodes,
      filter,
      noResultText,
      "j:subNodesView": subNodeView,
      facetFields,
    }: JcrQueryProps,
    { currentNode, renderContext, currentResource },
  ) => {
    const jcrQueryBuilderProps = mapToJCRQueryBuilderProps({
      luxeQuery: {
        "jcr:title": title,
        type,
        criteria,
        sortDirection,
        maxItems,
        startNode,
        filter,
        excludeNodes,
        "j:subNodesView": subNodeView,
      },
      t,
      currentNode,
      renderContext,
    });

    const builder = new JCRQueryBuilder(jcrQueryBuilderProps);
    const { jcrQuery, warn, cacheDependency } = builder.build();

    server?.render.addCacheDependency(
      { flushOnPathMatchingRegexp: cacheDependency },
      renderContext,
    );

    const currentLocale = currentResource.getLocale();
    const currentLocaleCode = currentLocale.toString();

    const gqlProperties = useGQLQuery({
      query: gqlContentPropertiesQueryString,
      variables: {
        name: type,
        language: currentLocaleCode,
      },
    });

    /*TODO remove isActive*/
    let facets: FacetProps[] = gqlProperties?.data?.jcr?.nodeTypeByName?.properties
      ?.filter(
        (facet: FacetProps) => facet.type != "WEAKREFERENCE" && facetFields?.includes(facet.id),
      )
      .map((facet: FacetProps) => ({ ...facet, isActive: true, values: [], constraints: [] }));

    const graphQLFragProperties = generateGraphQLFragProperties(facets, "FacetPropertiesValues");

    // get facet values && html view for each content of the query
    const gqlContents = useGQLQuery({
      query: gqlNodesQueryString({
        fragment: graphQLFragProperties
          ? { name: "FacetPropertiesValues", value: graphQLFragProperties }
          : undefined,
        isRenderEnabled: true,
        limit: maxItems,
      }),
      variables: {
        query: jcrQuery,
        view: subNodeView || "default",
        language: currentLocaleCode,
      },
    });

    // server.render.addCacheDependency(
    //   { nodes: gqlContents?.data?.jcr?.nodesByQuery?.nodes || [] },
    //   renderContext,
    // );

    const gqlNodes = gqlContents?.data?.jcr?.nodesByQuery?.nodes;

    facets = facets.map((facet) => {
      if (facet.isActive)
        return {
          ...facet,
          values: getNodePropertyValues(gqlNodes, facet),
        };
      return facet;
    });

    const nodes: RenderNodeProps[] = gqlNodes2DiplayNodes(gqlNodes);

    return (
      <HydrateInBrowser
        child={FacetsClient}
        props={{
          jcrQueryBuilderProps,
          nodes,
          facets,
          warn,
          noResultText,
          isEditMode: renderContext.isEditMode(),
        }}
      />
    );
  },
);
