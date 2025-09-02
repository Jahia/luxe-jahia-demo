import { Col } from "~/commons";
import classes from "./SearchResults.client.module.css";
import { useEffect, useState } from "react";
import type { RenderNodeProps } from "~/commons/libs/jcrQueryBuilder/types.ts";

export default function SearchResultsClient({ nodes }: { nodes: RenderNodeProps[] }) {
	// Garde une copie complète de la liste d'origine
	const [allNodes, setAllNodes] = useState<RenderNodeProps[]>(nodes);

	// Recharge la liste complète si "nodes" change (nouvelle recherche, etc)
	useEffect(() => {
		// eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
		setAllNodes(nodes);
	}, [nodes]);

	const noResults =
		allNodes.length === 0 || (allNodes.length === 1 && allNodes[0].uuid === "no-results");
	if (noResults)
		return (
			<Col>
				<div className={classes.noResults}>
					<p className="noResults">No results found</p>
				</div>
			</Col>
		);
	return (
		<>
			{allNodes.map(({ html, uuid }) => (
				<Col
					key={uuid}
					dangerouslySetInnerHTML={{
						__html: html,
					}}
				/>
			))}
		</>
	);
}
