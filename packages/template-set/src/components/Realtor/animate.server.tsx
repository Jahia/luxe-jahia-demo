import {
	buildModuleFileUrl,
	buildNodeUrl,
	getImageProps,
	Island,
	jahiaComponent,
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
		const alt = t("alt.realtor", { realtor: fullName || currentNode.getDisplayableName() });

		// The card is an island, so it receives serializable props: getImageProps is the tier
		// below <JImage>. The placeholder describes the realtor too, so the card is never unlabelled.
		const imageProps = imageNode
			? getImageProps(imageNode, { alt, width: 300 })
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
