import type { RenderNodeProps } from "~/commons/libs/jcrQueryBuilder/types.ts";
import { Col, Image, ProgressiveList } from "design-system";
import clsx from "clsx";
import classes from "./SearchResults.client.module.css";
import _classes from "../Estate/default.module.css";
import { t } from "i18next";

export default function SearchResultsClient({
	nodes,
	isEditMode,
	locale,
}: {
	nodes: RenderNodeProps[];
	isEditMode: boolean;
	locale: string;
}) {
	if (nodes.length === 0) {
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
				<Col key={key} style={style} className={clsx(className, isEditMode && classes.editMode)}>
					<a href={node.url} className={_classes.card}>
						<Image className={_classes.image} src={node.image} />
						<h4>{node.title}</h4>
						<p>
							{node.bedrooms} {t("estate.bedrooms.label")} <span>✦</span>{" "}
							{node.surface.toLocaleString(locale)} m<sup>2</sup>
						</p>
						<strong>{node.price.toLocaleString(locale)}€</strong>
					</a>
				</Col>
			)}
		</ProgressiveList>
	);
}
