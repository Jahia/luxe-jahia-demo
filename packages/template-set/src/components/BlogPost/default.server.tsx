import { buildNodeUrl, jahiaComponent, JImage } from "@jahia/javascript-modules-library";
import type { BlogPostProps } from "./types";
import classes from "./default.module.css";
import placeholder from "/static/img/img-placeholder.jpg";
import { imageClass } from "design-system";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

jahiaComponent(
	{
		nodeType: "luxe:blogPost",
		name: "default",
		componentType: "view",
	},
	({ title, subtitle, image: imageNode }: BlogPostProps, { currentNode }) => {
		const { t } = useTranslation();

		return (
			<a className={classes.card} href={buildNodeUrl(currentNode)}>
				<JImage
					node={imageNode}
					alt={t("alt.blog", { blog: title })}
					fallback={placeholder}
					className={clsx(imageClass, classes.image)}
					layout="fixed"
					slotWidth={380}
				/>
				<div className={classes.main}>
					<h2 className={classes.title}>{title}</h2>
					{subtitle && <p>{subtitle}</p>}
				</div>
			</a>
		);
	},
);
