import type { FC } from "react";
import StringFacet from "~/components/JcrQuery/Facets/Components/StringFacet";
import LongFacet from "~/components/JcrQuery/Facets/Components/LongFacet";
import classes from "./FacetsFilter.client.module.css";
import type { FacetProps, RenderNodeProps } from "~/components/JcrQuery/types";
import { useFacet } from "~/components/JcrQuery/Facets/Hooks/Facet.client";
import type { JCRQueryBuilderType } from "~/components/JcrQuery/JCRQueryBuilder";
import type { FacetCmpProps } from "~/components/JcrQuery/Facets/Components/types";

const Cmp: Record<string, FC<FacetCmpProps>> = {
  STRING: StringFacet,
  LONG: LongFacet,
};

const FacetsFilter = ({
  builder,
  facets: initialFacets,
  setNodes,
}: {
  builder: JCRQueryBuilderType;
  facets: FacetProps[];
  setNodes: (nodes: RenderNodeProps[]) => void;
}) => {
  const { facets, handleFacetValuesChange } = useFacet({
    builder,
    facets: initialFacets,
    setNodes,
  });

  const getFacetComponent = (facet: FacetProps) => {
    const FacetComponent = Cmp[facet.type];
    if (!FacetComponent) return null;
    return <FacetComponent facet={facet} onChange={handleFacetValuesChange} />;
  };

  return (
    <div>
      <h2>Facets</h2>
      <div>
        {facets.map((facet) => (
          <div key={facet.id} className={classes.facetContent}>
            {getFacetComponent(facet)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacetsFilter;
