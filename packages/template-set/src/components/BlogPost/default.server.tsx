import { buildNodeUrl, jahiaComponent } from "@jahia/javascript-modules-library";
import type { BlogPostProps } from "./types";
import classes from "./default.module.css";
import { LuxeImage } from "~/commons/LuxeImage";
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
				<LuxeImage
					node={imageNode}
					alt={t("alt.blog", { blog: title })}
					className={classes.image}
					widths={[380, 760]} // 760 is for double density screens
					sizes="380px"
				/>
				<div className={classes.main}>
					<h2 className={classes.title}>{title}</h2>
					{subtitle && <p>{subtitle}</p>}
				</div>
			</a>
		);
	},
);
