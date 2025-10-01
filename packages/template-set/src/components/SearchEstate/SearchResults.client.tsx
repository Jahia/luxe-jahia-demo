import type { RenderNodeProps } from "~/commons/libs/jcrQueryBuilder/types.ts";
import { Col, ProgressiveList } from "design-system";
import clsx from "clsx";
import classes from "./SearchResults.client.module.css";

const NO_RESULTS_UUID = "no-results";

export default function SearchResultsClient({
	nodes,
	isEditMode,
}: {
	nodes: RenderNodeProps[];
	isEditMode: boolean;
}) {
	const noResults = nodes.length === 0 || (nodes.length === 1 && nodes[0].uuid === NO_RESULTS_UUID);

	if (noResults) {
		return (
			<Col>
				<div>
					<p>No results found</p>
				</div>
			</Col>
		);
	}

	return (
		<ProgressiveList
			items={nodes}
			itemKey="uuid"
			delayMs={200}
			animationType="fadeInUp"
			key={`search-${nodes.length}-${Date.now()}`} // Force re-mount
		>
			{(node, index, key, style, className) => (
				<Col
					key={key}
					style={style}
					className={clsx(className, isEditMode && classes.editMode)}
					dangerouslySetInnerHTML={{ __html: node.html }}
				/>
			)}
		</ProgressiveList>
	);
}
