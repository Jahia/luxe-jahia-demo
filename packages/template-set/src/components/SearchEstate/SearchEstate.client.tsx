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
import { Row, Section } from "~/commons";

export default function SearchEstateClient({
	builderConfig,
	builderConstraints,
	nodes: initialNodes,
}: {
	builderConfig: JCRQueryConfig;
	builderConstraints: Constraint[];
	nodes: RenderNodeProps[];
}) {
	const builder = useMemo(() => {
		const b = new JCRQueryBuilder(builderConfig);
		b.setConstraints(builderConstraints);
		return b;
	}, [builderConfig, builderConstraints]);

	const [nodes, setNodes] = useState<RenderNodeProps[]>(initialNodes);

	return (
		<Section>
			<Row className={classes.searchRow}>
				<SearchEstateFormClient
					builder={builder}
					setNodes={setNodes}
					mode="instant"
					className={classes.form}
				/>
			</Row>
			<Row className={classes.resultsRow}>
				<SearchResultsClient nodes={nodes} />
			</Row>
		</Section>
	);
}
