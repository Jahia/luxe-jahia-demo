import {
	buildModuleFileUrl,
	buildNodeUrl,
	Island,
	jahiaComponent,
	server,
} from "@jahia/javascript-modules-library";
import type { RealtorProps } from "./types.js";
import placeholder from "/static/img/agent-placeholder.jpg";
import AnimateClient from "~/components/Realtor/Animate.client";
import { imageNodeToImgProps } from "~/commons/image/imgProps";
import type { ImageProps } from "design-system";
import { useTranslation } from "react-i18next";

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
		const { t } = useTranslation();
		const fullName = [firstName, lastName].filter(Boolean).join(" ");
		let imageProps: ImageProps = {
			src: buildModuleFileUrl(placeholder),
		};
		if (imageNode) {
			// Cache dependency for all nodes involved
			server.render.addCacheDependency({ node: imageNode }, renderContext);
			imageProps = imageNodeToImgProps(imageNode, {
				alt: t("alt.realtor", { realtor: fullName || currentNode.getDisplayableName() }),
				widths: [300, 600], // 600 is for double density screens
			});
			imageProps.sizes = "300px"; // Ensure the image is always 300px wide
		}

		const jobPositionLanguagesTranslation = {
			junior: t("realtor.jobPosition.junior"),
			senior: t("realtor.jobPosition.senior"),
			director: t("realtor.jobPosition.director"),
		};

		return (
			<Island
				component={AnimateClient}
				props={{
					fullName: fullName || currentNode.getDisplayableName(),
					jobPosition: jobPosition ? jobPositionLanguagesTranslation[jobPosition] : undefined,
					image: imageProps,
					videoUrl: videoNode ? buildNodeUrl(videoNode) : undefined,
					currentNodeUrl: buildNodeUrl(currentNode),
				}}
			/>
		);
	},
);
