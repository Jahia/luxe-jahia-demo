import {
	buildModuleFileUrl,
	buildNodeUrl,
	jahiaComponent,
	server,
} from "@jahia/javascript-modules-library";
import { t } from "i18next";
import type { BlogPostProps } from "./types";
import classes from "./default.module.css";
import placeholder from "/static/img/img-placeholder.jpg";
import { imageNodeToImgProps } from "~/commons/libs/imageNodeToProps";
import React from "react";
import { Image } from "design-system";

jahiaComponent(
	{
		nodeType: "luxe:blogPost",
		name: "default",
		componentType: "view",
	},
	({ title, subtitle, image: imageNode }: BlogPostProps, { currentNode, renderContext }) => {
		let imageProps: React.ImgHTMLAttributes<HTMLImageElement> = {
			src: buildModuleFileUrl(placeholder),
		};
		if (imageNode) {
			// Cache dependency for all nodes involved
			server.render.addCacheDependency({ node: imageNode }, renderContext);
			imageProps = imageNodeToImgProps({
				imageNode,
				alt: t("alt.blog", { blog: title }),
				config: { widths: [380, 760] }, // 760 is for double density screens
			});
			imageProps.sizes = "380px"; //Ensure the image is always 380px wide
		}

		return (
			<a className={classes.card} href={buildNodeUrl(currentNode)}>
				<Image {...imageProps} className={classes.image} />
				<div className={classes.main}>
					<h2 className={classes.title}>{title}</h2>
					{subtitle && <p>{subtitle}</p>}
				</div>
			</a>
		);
	},
);
