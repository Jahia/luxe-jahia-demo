import { buildNodeUrl, jahiaComponent } from "@jahia/javascript-modules-library";
import type { BlogPostProps } from "./types";
import classes from "./tile.module.css";
import { LuxeImage } from "~/commons/LuxeImage";
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
			<a href={buildNodeUrl(currentNode)}>
				<figure className={classes.card}>
					<LuxeImage
						node={imageNode}
						alt={t("alt.blog", { blog: title })}
						sizes="(max-width: 576px) 100vw,(max-width: 1320px) 50vw, 880px"
					/>
					<figcaption>{title}</figcaption>
				</figure>
			</a>
		);
	},
);
