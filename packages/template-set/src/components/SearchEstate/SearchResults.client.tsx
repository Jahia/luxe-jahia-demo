import React from "react";
import { Col } from "~/commons";
import type { RenderNodeProps } from "~/commons/libs/jcrQueryBuilder/types.ts";
import { ProgressiveList } from "design-system";

const NO_RESULTS_UUID = "no-results";

export default function SearchResultsClient({ nodes }: { nodes: RenderNodeProps[] }) {
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
					className={className}
					dangerouslySetInnerHTML={{ __html: node.html }}
				/>
			)}
		</ProgressiveList>
	);
}
