import { jahiaComponent, JImage } from "@jahia/javascript-modules-library";
import { Figure, imageClass, PageTitle, Row } from "design-system";
import clsx from "clsx";
import type { HeaderProps } from "./types.js";
import classes from "./textUp.module.css";

jahiaComponent(
	{
		nodeType: "luxe:header",
		name: "textUp",
		displayName: "Image & Text Up",
		componentType: "view",
	},
	({ title, subtitle, image: imageNode }: HeaderProps) => (
		<header className={classes.header}>
			{title && (
				<Row>
					<PageTitle title={title} description={subtitle} />
				</Row>
			)}
			{imageNode && (
				<Row>
					<Figure layout="imgFull">
						<JImage
							node={imageNode}
							// Unchanged from the previous default; meaningful text is tracked in #454
							alt={imageNode.getDisplayableName()}
							className={clsx(imageClass, classes.image)}
							layout="constrained"
							slotWidth={1320}
							preload
						/>
					</Figure>
				</Row>
			)}
		</header>
	),
);
