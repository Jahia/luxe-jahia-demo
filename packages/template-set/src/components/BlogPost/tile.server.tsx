import {
	buildModuleFileUrl,
	buildNodeUrl,
	jahiaComponent,
	server,
} from "@jahia/javascript-modules-library";
import { t } from "i18next";
import type { BlogPostProps } from "./types";
import classes from "./tile.module.css";
import placeholder from "/static/img/img-placeholder.jpg";
import { imageNodeToImgProps } from "~/commons/libs/imageNodeToProps";
import { Image } from "design-system";
import type { ImgHTMLAttributes } from "react";

jahiaComponent(
	{
		nodeType: "luxe:blogPost",
		name: "tile",
		displayName: "Tile",
		componentType: "view",
	},
	({ title, image: imageNode }: BlogPostProps, { currentNode, renderContext }) => {
		// Image: placeholder by default; override when a real node exists
		let imageProps: ImgHTMLAttributes<HTMLImageElement> = {
			src: buildModuleFileUrl(placeholder),
		};

		if (imageNode) {
			// SSR cache dep for this image node
			server.render.addCacheDependency({ node: imageNode }, renderContext);

			// Map Jahia node -> <img> props (+ i18n alt)
			imageProps = imageNodeToImgProps({
				imageNode,
				alt: t("alt.blog", { blog: title }),
			});

			// Responsive slot hint: ≤576px → 100vw,≤1320px → 50vw, otherwise ≈880px
			// (keep in sync with grid breakpoints; effective with width-based srcset)
			imageProps.sizes = "(max-width: 576px) 100vw,(max-width: 1320px) 50vw, 880px";
		}

		return (
			<a href={buildNodeUrl(currentNode)}>
				<figure className={classes.card}>
					<Image {...imageProps} />
					<figcaption>{title}</figcaption>
				</figure>
			</a>
		);
	},
);
