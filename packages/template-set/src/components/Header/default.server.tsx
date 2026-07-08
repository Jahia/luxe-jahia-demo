import { jahiaComponent } from "@jahia/javascript-modules-library";
import type { HeaderProps } from "./types";
import classes from "./default.module.css";
import { LuxeImage } from "~/commons/LuxeImage";

jahiaComponent(
	{
		nodeType: "luxe:header",
		name: "default",
		componentType: "view",
	},
	({ title, image: imageNode }: HeaderProps) => (
		<section className={classes.cover}>
			{imageNode && <LuxeImage node={imageNode} className={classes.image} priority />}
			<h1 className={classes.title}>{title}</h1>
		</section>
	),
);
