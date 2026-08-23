import { buildNodeUrl, jahiaComponent, JImage } from "@jahia/javascript-modules-library";
import type { BlogPostProps } from "./types";
import classes from "./card.module.css";
import placeholder from "/static/img/img-placeholder.jpg";
import { imageClass } from "design-system";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

jahiaComponent(
	{
		nodeType: "luxe:blogPost",
		name: "card",
		displayName: "Card",
		componentType: "view",
	},
	({ title, subtitle, image: imageNode }: BlogPostProps, { currentNode }) => {
		const { t } = useTranslation();

		return (
			<a href={buildNodeUrl(currentNode)} className={classes.card}>
				<JImage
					node={imageNode}
					alt={t("alt.blog", { blog: title })}
					fallback={placeholder}
					className={clsx(imageClass, classes.image)}
					layout="constrained"
					slotWidth={200}
				/>
				<h3>{title}</h3>
				{subtitle && <p>{subtitle}</p>}
			</a>
		);
	},
);
