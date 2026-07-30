import { buildNodeUrl, jahiaComponent } from "@jahia/javascript-modules-library";
import type { BlogPostProps } from "./types";
import classes from "./card.module.css";
import { LuxeImage } from "~/commons/LuxeImage";
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
				<LuxeImage
					node={imageNode}
					alt={t("alt.blog", { blog: title })}
					className={classes.image}
					widths={[200, 400]}
					sizes="200px"
				/>
				<h3>{title}</h3>
				{subtitle && <p>{subtitle}</p>}
			</a>
		);
	},
);
