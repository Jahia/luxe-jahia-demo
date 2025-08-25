import {
	buildModuleFileUrl,
	buildNodeUrl,
	jahiaComponent,
	server,
} from "@jahia/javascript-modules-library";
import { t } from "i18next";
import type { AgencyProps } from "./types";
import classes from "./default.module.css";
import placeholder from "/static/img/agency-placeholder.jpg";
import { imageNodeToImgProps } from "~/commons/libs/imageNodeToProps";
import React from "react";
import { Image } from "design-system";

jahiaComponent(
	{
		nodeType: "luxe:agency",
		name: "default",
		componentType: "view",
	},
	({ name, address, phone, image: imageNode }: AgencyProps, { currentNode, renderContext }) => {
		let imageProps: React.ImgHTMLAttributes<HTMLImageElement> = {
			src: buildModuleFileUrl(placeholder),
		};
		if (imageNode) {
			// Cache dependency for all nodes involved
			server.render.addCacheDependency({ node: imageNode }, renderContext);
			imageProps = imageNodeToImgProps({
				imageNode,
				alt: t("alt.agency", { agency: name }),
				config: { widths: [200, 400] }, // 400 is for double density screens
			});
			imageProps.sizes = "200px"; // Ensure the image is always 200px wide
		}

		return (
			<a className={classes.card} href={buildNodeUrl(currentNode)}>
				<Image {...imageProps} className={classes.image} />
				<div className={classes.containerText}>
					<h2 className={classes.title}>{name}</h2>
					{address && <p>{address}</p>}
					{phone && <p>{phone}</p>}
				</div>
			</a>
		);
	},
);
