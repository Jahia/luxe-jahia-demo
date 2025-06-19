import {
  jahiaComponent,
  useGQLQuery,
  server,
  HydrateInBrowser,
} from "@jahia/javascript-modules-library";

import { t } from "i18next";
import {
  buildJCRQuery,
  generateGraphQLFragProperties,
  getNodePropertyValues,
  gqlContentPropertiesQueryString,
  gqlNodesQueryString,
  mapToJCRQueryBuilderProps,
} from "./utils";
import type { FacetProps, JcrQueryProps, RenderNodeProps } from "./types";
import FacetsClient from "~/components/JcrQuery/Facets/Facets.client";
import { JCRQueryBuilder } from "~/components/JcrQuery/JCRQueryBuilder";

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
    // const { jcrQuery, warn } = buildJCRQuery({
    //   luxeQuery: {
    //     "jcr:title": title,
    //     type,
    //     criteria,
    //     sortDirection,
    //     startNode,
    //     filter,
    //     excludeNodes,
    //   },
    //   t,
    //   server,
    //   currentNode,
    //   renderContext,
    // });

    const jcrQueryBuilderProps = mapToJCRQueryBuilderProps({
      luxeQuery: {
        "jcr:title": title,
        type,
        criteria,
        sortDirection,
        startNode,
        filter,
        excludeNodes,
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
    // const queryContent = getNodesByJCRQuery(currentNode.getSession(), jcrQuery, maxItems || -1);
    // const nodesPath = queryContent.map((node) => node.getPath());

    const currentLocale = currentResource.getLocale();
    const currentLocaleCode = currentLocale.toString();

    const gqlProperties = useGQLQuery({
      query: gqlContentPropertiesQueryString,
      variables: {
        name: type,
        language: currentLocaleCode,
      },
    });

    let facets: FacetProps[] = gqlProperties?.data?.jcr?.nodeTypeByName?.properties
      ?.filter((facet: FacetProps) => facet.type != "WEAKREFERENCE")
      .map((facet: FacetProps) =>
        facetFields?.includes(facet.id)
          ? { ...facet, isActive: true, values: [], selectedValues: [] }
          : { ...facet, isActive: false, values: [], selectedValues: [] },
      );

    const selectedFacets = facets?.filter((facet) => facet.isActive) || [];

    const graphQLFragProperties = generateGraphQLFragProperties(
      selectedFacets,
      "FacetPropertiesValues",
    );
    const gqlContents = useGQLQuery({
      query: gqlNodesQueryString(
        { name: "FacetPropertiesValues", value: graphQLFragProperties },
        true,
      ),
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
          values: Array.from(getNodePropertyValues(gqlNodes, facet)),
        };
      return facet;
    });

    const nodes: RenderNodeProps = gqlNodes?.map((node) => ({
      html: node.renderedContent.output,
      uuid: node.uuid,
    }));

    return (
      <HydrateInBrowser
        child={FacetsClient}
        props={{
          jcrQueryBuilderProps,
          jcrQueryUuid: currentNode.getIdentifier(),
          nodes,
          facets,
          warn,
          noResultText,
          subNodeView,
          isEditMode: renderContext.isEditMode(),
        }}
      />
    );
  },
);
