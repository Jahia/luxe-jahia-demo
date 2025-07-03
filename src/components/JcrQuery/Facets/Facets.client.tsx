import { useState, useMemo } from "react";
import classes from "./Facets.client.module.css";
import type { FacetProps, RenderNodeProps } from "~/components/JcrQuery/types";
import { JCRQueryBuilder, type JCRQueryConfig } from "~/components/JcrQuery/JCRQueryBuilder";
import FacetsFilter from "~/components/JcrQuery/Facets/FacetsFilter.client";
import FacetsResults from "~/components/JcrQuery/Facets/FacetsResults.client";

export default function FacetsClient({
  jcrQueryBuilderProps,
  nodes: initialNodes,
  facets,
}: {
  jcrQueryBuilderProps: JCRQueryConfig;
  nodes: RenderNodeProps[];
  facets: FacetProps[];
}) {
  const builder = useMemo(() => new JCRQueryBuilder(jcrQueryBuilderProps), [jcrQueryBuilderProps]);
  // const { jcrQuery } = useMemo(() => builder.build(), [builder]);
  const [nodes, setNodes] = useState<RenderNodeProps[]>(initialNodes);

  return (
    <div className={classes.main}>
      <div className={classes.facetsContainer}>
        <FacetsFilter builder={builder} facets={facets} setNodes={setNodes} />
      </div>
      <div className={classes.resultsContainer}>
        <FacetsResults nodes={nodes} />
      </div>
    </div>
  );
}
