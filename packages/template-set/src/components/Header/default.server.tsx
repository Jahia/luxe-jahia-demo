import { jahiaComponent } from "@jahia/javascript-modules-library";
import type { HeaderProps } from "./types";
import classes from "./default.module.css";
import { LuxeImage } from "~/commons/LuxeImage";
import { useTranslation } from "react-i18next";

jahiaComponent(
	{
		nodeType: "luxe:header",
		name: "default",
		componentType: "view",
	},
	({ title, image: imageNode }: HeaderProps) => {
		const { t } = useTranslation();

		return (
			<section className={classes.cover}>
				{imageNode && (
					<LuxeImage
						src={imageNode}
						alt={t("alt.hero", { title })}
						className={classes.image}
						// Full-bleed hero: the platform ladder plus a 4K candidate
						sizes={["100vw"]}
						srcSet={[2560, 2048, 1680, 1366, 724, 424, 376]}
						// Above the fold: the LCP candidate
						loading="eager"
						fetchPriority="high"
					/>
				)}
				<h1 className={classes.title}>{title}</h1>
			</section>
		);
	},
);
