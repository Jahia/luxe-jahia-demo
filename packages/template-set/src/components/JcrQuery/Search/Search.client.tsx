import { useState, useMemo } from "react";
import type { FacetProps, RenderNodeProps } from "~/components/JcrQuery/types";
import { JCRQueryBuilder, type JCRQueryConfig } from "~/components/JcrQuery/utils/JCRQueryBuilder";
import SearchForm from "~/components/JcrQuery/Search/SearchForm.client.tsx";
import SearchResults from "~/components/JcrQuery/Search/SearchResults.client.tsx";
import classes from "./Search.client.module.css";

export default function SearchClient({
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
			<div className={classes.formContainer}>
				<SearchForm builder={builder} facets={facets} setNodes={setNodes} />
			</div>
			<div className={classes.resultsContainer}>
				<SearchResults nodes={nodes} />
			</div>
		</div>
	);
}
