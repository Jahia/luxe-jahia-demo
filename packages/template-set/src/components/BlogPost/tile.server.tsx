import { jahiaComponent, JImage, JLink } from "@jahia/javascript-modules-library";
import type { BlogPostProps } from "./types";
import classes from "./tile.module.css";
import placeholder from "/static/img/img-placeholder.jpg";
import { imageClass } from "design-system";
import { useTranslation } from "react-i18next";

jahiaComponent(
	{
		nodeType: "luxe:blogPost",
		name: "tile",
		displayName: "Tile",
		componentType: "view",
	},
	({ title, image: imageNode }: BlogPostProps, { currentNode }) => {
		const { t } = useTranslation();

		return (
			<JLink node={currentNode}>
				<figure className={classes.card}>
					<JImage
						node={imageNode}
						alt={t("alt.blog", { blog: title })}
						fallback={placeholder}
						className={imageClass}
						layout="constrained"
						// One or two tiles per row depending on the viewport
						sizes="(max-width: 576px) 100vw,(max-width: 1320px) 50vw, 880px"
					/>
					<figcaption>{title}</figcaption>
				</figure>
			</JLink>
		);
	},
);
