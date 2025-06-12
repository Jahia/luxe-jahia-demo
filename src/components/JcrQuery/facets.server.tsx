import {
  getNodesByJCRQuery,
  jahiaComponent,
  useGQLQuery,
  server,
  HydrateInBrowser,
} from "@jahia/javascript-modules-library";

import { t } from "i18next";
import { buildJCRQuery, gqlFacetsQueryString } from "./utils";
import type { FacetProps, JcrQueryProps, RenderNodeProps } from "./types";
import FacetsClient from "~/components/JcrQuery/Facets/Facets.client";

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
    const { jcrQuery, warn } = buildJCRQuery({
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
      server,
      currentNode,
      renderContext,
    });
    // const queryContent = getNodesByJCRQuery(currentNode.getSession(), jcrQuery, maxItems || -1);
    // const nodesPath = queryContent.map((node) => node.getPath());

    const currentLocale = currentResource.getLocale();
    const currentLocaleCode = currentLocale.toString();

    const gqlQuery = useGQLQuery({
      query: gqlFacetsQueryString,
      variables: {
        query: jcrQuery,
        view: subNodeView || "default",
        name: type,
        language: currentLocaleCode,
      },
    });

    const nodes: RenderNodeProps = gqlQuery?.data?.jcr?.nodesByQuery?.nodes?.map((node) => ({
      html: node.renderedContent.output,
      uuid: node.uuid,
    }));

    const facets: FacetProps[] = gqlQuery?.data?.jcr?.nodeTypeByName?.properties
      ?.filter((facet: FacetProps) => facet.requiredType != "WEAKREFERENCE")
      .map((facet: FacetProps) =>
        facetFields?.includes(facet.name)
          ? { ...facet, isActive: true }
          : { ...facet, isActive: false },
      );

    return (
      <HydrateInBrowser
        child={FacetsClient}
        props={{
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
