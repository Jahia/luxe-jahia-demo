import {
	buildModuleFileUrl,
	buildNodeUrl,
	jahiaComponent,
	server,
} from "@jahia/javascript-modules-library";
import type { BlogPostProps } from "./types";
import classes from "./card.module.css";
import placeholder from "/static/img/img-placeholder.jpg";
import { imageNodeToImgProps } from "~/commons/libs/imageNodeToProps";
import { Image } from "design-system";
import type { ImgHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

jahiaComponent(
	{
		nodeType: "luxe:blogPost",
		name: "card",
		displayName: "Card",
		componentType: "view",
	},
	({ title, subtitle, image: imageNode }: BlogPostProps, { currentNode, renderContext }) => {
		const { t } = useTranslation();
		let imageProps: ImgHTMLAttributes<HTMLImageElement> = {
			src: buildModuleFileUrl(placeholder),
		};
		if (imageNode) {
			// Cache dependency for all nodes involved
			server.render.addCacheDependency({ node: imageNode }, renderContext);
			imageProps = imageNodeToImgProps({
				imageNode,
				alt: t("alt.blog", { blog: title }),
				config: { widths: [200, 400] },
			});
			imageProps.sizes = "200px"; //Ensure the image is always 200px wide
		}

		return (
			<a href={buildNodeUrl(currentNode)} className={classes.card}>
				<Image className={classes.image} {...imageProps} />
				<h4>{title}</h4>
				{subtitle && <p>{subtitle}</p>}
			</a>
		);
	},
);
