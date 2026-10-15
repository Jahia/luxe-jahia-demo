import { jahiaComponent, JImage } from "@jahia/javascript-modules-library";
import type { HeaderProps } from "./types";
import classes from "./default.module.css";
import { imageClass } from "design-system";
import clsx from "clsx";

jahiaComponent(
	{
		nodeType: "luxe:header",
		name: "default",
		componentType: "view",
	},
	({ title, image: imageNode }: HeaderProps) => (
		<section className={classes.cover}>
			{imageNode && (
				<JImage
					node={imageNode}
					// Unchanged from the previous default; meaningful text is tracked in #454
					alt={imageNode.getDisplayableName()}
					className={clsx(imageClass, classes.image)}
					layout="full-width"
					preload
				/>
			)}
			<h1 className={classes.title}>{title}</h1>
		</section>
	),
);
