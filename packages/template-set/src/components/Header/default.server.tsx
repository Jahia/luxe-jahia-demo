import { jahiaComponent, server } from "@jahia/javascript-modules-library";
import type { HeaderProps } from "./types";
import { Picture, type PictureProps } from "design-system";
import classes from "./default.module.css";
import { imageNodeToImageProps } from "~/commons/libs/imageNodeToImgProps";
import type { ImageConfig } from "~/commons/libs/imageNodeToImgProps/types.ts";

const HEADER_PICTURE_CONFIG: ImageConfig = {
	baseWidth: 360,
	sources: [
		{ media: "(min-width: 1440px)", width: 1920 },
		{ media: "(min-width: 720px)", width: 1440 },
		{ media: "(min-width: 360px)", width: 720 },
	],
};

jahiaComponent(
	{
		nodeType: "luxe:header",
		name: "default",
		componentType: "view",
	},
	({ title, image: imageNode }: HeaderProps, { renderContext }) => {
		const addPicture = () => {
			if (!imageNode) return null;
			// Cache dependency for all nodes involved
			server.render.addCacheDependency({ node: imageNode }, renderContext);
			const imageProps = imageNodeToImageProps({
				imageNode,
				config: HEADER_PICTURE_CONFIG,
			}) as PictureProps;
			return (
				<Picture
					src={imageProps.src}
					alt={imageProps.alt}
					sources={imageProps.sources}
					width={imageProps.width}
					height={imageProps.height}
					className={classes.picture}
				/>
			);
		};
		return (
			<section className={classes.cover}>
				{/* If you use one of our external DAM plugins, you can specify the image width or height
            to enable live image resizing performed by the DAM provider. */}
				{addPicture()}
				<h1>{title}</h1>
			</section>
		);
	},
);
