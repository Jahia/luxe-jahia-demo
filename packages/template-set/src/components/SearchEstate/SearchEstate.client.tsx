import { useState, useMemo } from "react";
import classes from "./SearchEstate.client.module.css";
import type {
	Constraint,
	JCRQueryConfig,
	RenderNodeProps,
} from "~/commons/libs/jcrQueryBuilder/types.ts";
import SearchEstateFormClient from "~/components/SearchEstate/SearchEstateForm.client.tsx";
import SearchResultsClient from "~/components/SearchEstate/SearchResults.client.tsx";
import { Row, Section } from "design-system";

export default function SearchEstateClient({
	builderConfig,
	params,
	nodes: initialNodes,
	isEditMode,
}: {
	builderConfig: JCRQueryConfig;
	params: Record<string, string[]>;
	nodes: RenderNodeProps[];
	isEditMode: boolean;
}) {
	const [nodes, setNodes] = useState<RenderNodeProps[]>(initialNodes);

	return (
		<Section>
			<Row className={classes.searchRow}>
				<SearchEstateFormClient
					config={builderConfig}
					params={params}
					setNodes={setNodes}
					mode="instant"
				/>
			</Row>
			<Row className={classes.resultsRow}>
				<SearchResultsClient nodes={nodes} isEditMode={isEditMode} />
			</Row>
		</Section>
	);
}
