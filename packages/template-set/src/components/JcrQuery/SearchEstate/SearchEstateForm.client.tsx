import type { RenderNodeProps, FacetProps } from "~/components/JcrQuery/types";
import type { JCRQueryBuilder } from "~/components/JcrQuery/utils/JCRQueryBuilder";

export default function SearchForm({
	builder,
	facets: initialFacets,
	setNodes,
}: {
	builder: JCRQueryBuilder;
	facets: FacetProps[];
	setNodes: (nodes: RenderNodeProps[]) => void;
}) {
	return <p>Results found.</p>;
}
