import {
	buildModuleFileUrl,
	buildNodeUrl,
	HydrateInBrowser,
	jahiaComponent,
	server,
} from "@jahia/javascript-modules-library";
import { t } from "i18next";
import type { RealtorProps } from "./types.js";
import placeholder from "/static/img/agent-placeholder.jpg";
import AnimateClient from "~/components/Realtor/Animate.client";
import React from "react";
import { imageNodeToImgProps } from "~/commons/libs/imageNodeToProps";

jahiaComponent(
	{
		nodeType: "luxe:realtor",
		name: "animate",
		displayName: "Animated Picture",
		componentType: "view",
	},
	(
		{ firstName, lastName, jobPosition, image: imageNode, animate: videoNode }: RealtorProps,
		{ currentNode, renderContext },
	) => {
		let imageProps: React.ImgHTMLAttributes<HTMLImageElement> = {
			src: buildModuleFileUrl(placeholder),
		};
		if (imageNode) {
			// Cache dependency for all nodes involved
			server.render.addCacheDependency({ node: imageNode }, renderContext);
			imageProps = imageNodeToImgProps({
				imageNode,
				alt: t("alt.realtor", { realtor: `${firstName} ${lastName}` }),
				config: { widths: [300, 600] }, // 600 is for double density screens
			});
			imageProps.sizes = "300px"; // Ensure the image is always 300px wide
		}

		const jobPositionLanguagesTranslation = {
			junior: t("realtor.jobPosition.junior"),
			senior: t("realtor.jobPosition.senior"),
			director: t("realtor.jobPosition.director"),
		};

		return (
			<HydrateInBrowser
				child={AnimateClient}
				props={{
					firstName,
					lastName,
					jobPosition: jobPositionLanguagesTranslation[jobPosition],
					image: imageProps,
					videoUrl: videoNode ? buildNodeUrl(videoNode) : undefined,
					currentNodeUrl: buildNodeUrl(currentNode),
				}}
			/>
		);
	},
);
