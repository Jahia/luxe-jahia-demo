import { useState, useMemo } from "react";
import type { FacetProps, RenderNodeProps } from "~/components/JcrQuery/types";
import { JCRQueryBuilder, type JCRQueryConfig } from "~/components/JcrQuery/utils/JCRQueryBuilder";
import SearchForm from "~/components/JcrQuery/SearchEstate/SearchEstateForm.client.tsx";
import SearchResults from "~/components/JcrQuery/SearchEstate/SearchEstateResults.client.tsx";
import classes from "./SearchEstate.client.module.css";

export default function SearchEstateClient({
	jcrQueryBuilderProps,
	nodes: initialNodes,
	constraints,
}: {
	jcrQueryBuilderProps: JCRQueryConfig;
	nodes: RenderNodeProps[];
	constraints: FacetProps[];
}) {
	const builder = useMemo(() => new JCRQueryBuilder(jcrQueryBuilderProps), [jcrQueryBuilderProps]);
	const [nodes, setNodes] = useState<RenderNodeProps[]>(initialNodes);

	return (
		<div className={classes.main}>
			<div className={classes.formContainer}>
				<SearchForm builder={builder} facets={facets} setNodes={setNodes} />
			</div>
			<div className={classes.resultsContainer}>
				<SearchResults nodes={nodes} />
			</div>
		</div>
	);
}
