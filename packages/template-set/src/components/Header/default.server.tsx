import { jahiaComponent, server } from "@jahia/javascript-modules-library";
import type { HeaderProps } from "./types";
import classes from "./default.module.css";
import { imageNodeToImgProps } from "~/commons/libs/imageNodeToProps";
import { Image } from "design-system";

jahiaComponent(
	{
		nodeType: "luxe:header",
		name: "default",
		componentType: "view",
	},
	({ title, image: imageNode }: HeaderProps, { renderContext }) => {
		if (imageNode) server.render.addCacheDependency({ node: imageNode }, renderContext);

		return (
			<section className={classes.cover}>
				{imageNode && <Image className={classes.image} {...imageNodeToImgProps({ imageNode })} />}
				<h1 className={classes.title}>{title}</h1>
			</section>
		);
	},
);
