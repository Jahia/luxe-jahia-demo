import {
	buildModuleFileUrl,
	buildNodeUrl,
	getImageProps,
	type ImgProps,
	Island,
	jahiaComponent,
	useServerContext,
} from "@jahia/javascript-modules-library";
import type { RealtorProps } from "./types.js";
import placeholder from "/static/img/agent-placeholder.jpg";
import AnimateClient from "~/components/Realtor/Animate.client";
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
		{ currentNode },
	) => {
		const { t } = useTranslation();
		const fullName = [firstName, lastName].filter(Boolean).join(" ");
		// The card is hydrated, so it receives serializable props rather than JSX: getImageProps is
		// the tier below <JImage>, and it registers the cache dependency the same way
		const context = useServerContext();
		const alt = t("alt.realtor", { realtor: fullName || currentNode.getDisplayableName() });
		// getImageProps needs a node, so the missing-image fallback stays the call site's to build
		const imageProps: ImgProps = imageNode
			? getImageProps(imageNode, { alt, layout: "fixed", slotWidth: 300 }, context)
			: { src: buildModuleFileUrl(placeholder), alt };

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
