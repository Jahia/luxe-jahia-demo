import { jahiaComponent, JImage } from "@jahia/javascript-modules-library";
import { Figure, imageClass, Row } from "design-system";
import clsx from "clsx";
import type { HeaderProps } from "./types";
import classes from "./textDown.module.css";

jahiaComponent(
	{
		nodeType: "luxe:header",
		name: "textDown",
		displayName: "Image & Text Down",
		componentType: "view",
	},
	({ title, subtitle, image: imageNode }: HeaderProps) => (
		<header className={classes.header}>
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
			<Row component="hgroup">
				<h1 className={classes.title}>{title}</h1>
				<p className={classes.hp}>{subtitle}</p>
			</Row>
		</header>
	),
);
