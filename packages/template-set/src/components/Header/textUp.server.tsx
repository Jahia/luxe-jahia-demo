import { jahiaComponent } from "@jahia/javascript-modules-library";
import { Figure, PageTitle, Row } from "design-system";
import type { HeaderProps } from "./types.js";
import classes from "./textUp.module.css";
import { LuxeImage } from "~/commons/LuxeImage";
import { useTranslation } from "react-i18next";

jahiaComponent(
	{
		nodeType: "luxe:header",
		name: "textUp",
		displayName: "Image & Text Up",
		componentType: "view",
	},
	({ title, subtitle, image: imageNode }: HeaderProps) => {
		const { t } = useTranslation();

		return (
			<header className={classes.header}>
				{title && (
					<Row>
						<PageTitle title={title} description={subtitle} />
					</Row>
				)}
				{imageNode && (
					<Row>
						<Figure layout="imgFull">
							<LuxeImage
								src={imageNode}
								alt={t("alt.hero", { title })}
								className={classes.image}
								sizes={["(max-width: 1320px) 100vw", "1320px"]}
								// Above the fold: the LCP candidate
								loading="eager"
								fetchPriority="high"
							/>
						</Figure>
					</Row>
				)}
			</header>
		);
	},
);
