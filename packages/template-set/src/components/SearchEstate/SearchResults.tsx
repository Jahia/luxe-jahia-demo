import clsx from "clsx";
import { ClickableCard, Col, Image, ProgressiveList } from "design-system";
import { t } from "i18next";
import classes from "./SearchResults.client.module.css";
import type { RenderNodeProps } from "./types.ts";

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
			itemKey="url"
			delayMs={100}
			animationType="fadeInUp"
			key={`search-${Date.now()}`} // Force re-mount
		>
			{(node, index, key, style, className) => (
				<Col key={key} style={style} className={clsx(className, isEditMode && classes.editMode)}>
					<ClickableCard
						href={node.url}
						title={node.title}
						image={({ className }) => (
							<Image src={node.image} alt={node.title} className={className} />
						)}
						description={
							<>
								{node.bedrooms} {t("estate.bedrooms.label")} <span>✦</span>{" "}
								{node.surface.toLocaleString(locale)} m<sup>2</sup>
							</>
						}
						footer={`${node.price.toLocaleString(locale)}€`}
					/>
				</Col>
			)}
		</ProgressiveList>
	);
}
