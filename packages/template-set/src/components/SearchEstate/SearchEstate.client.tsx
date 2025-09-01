import { useState, useMemo } from "react";
import classes from "./SearchEstate.client.module.css";
import type {
	Constraint,
	JCRQueryConfig,
	RenderNodeProps,
} from "~/commons/libs/jcrQueryBuilder/types.ts";
import { JCRQueryBuilder } from "~/commons/libs/jcrQueryBuilder";
import SearchEstateFormClient from "~/components/SearchEstate/SearchEstateForm.client.tsx";
import SearchResultsClient from "~/components/SearchEstate/SearchResults.client.tsx";

export default function SearchEstateClient({
	builderConfig,
	builderConstraints,
	nodes: initialNodes,
}: {
	builderConfig: JCRQueryConfig;
	builderConstraints: Constraint[];
	nodes: RenderNodeProps[];
}) {
	const builder = useMemo(() => new JCRQueryBuilder(builderConfig), [builderConfig]);
	builder.setConstraints(builderConstraints);

	const [nodes, setNodes] = useState<RenderNodeProps[]>(initialNodes);

	return (
		<div className={classes.main}>
			<div className={classes.searchContainer}>
				<SearchEstateFormClient builder={builder} setNodes={setNodes} />
			</div>
			<div className={classes.resultsContainer}>
				<SearchResultsClient nodes={nodes} />
			</div>
		</div>
	);
}
