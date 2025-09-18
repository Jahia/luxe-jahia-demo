import {
	buildModuleFileUrl,
	buildNodeUrl,
	jahiaComponent,
	server,
} from "@jahia/javascript-modules-library";
import { t } from "i18next";
import type { RealtorProps } from "./types.js";
import classes from "./default.module.css";
import placeholder from "/static/img/agent-placeholder.jpg";
import { imageNodeToImgProps } from "~/commons/libs/imageNodeToProps";
import { Image } from "design-system";
import type { ImgHTMLAttributes } from "react";

jahiaComponent(
	{
		nodeType: "luxe:realtor",
		name: "default",
		componentType: "view",
	},
	(
		{ firstName, lastName, jobPosition, image: imageNode }: RealtorProps,
		{ currentNode, renderContext },
	) => {
		let imageProps: ImgHTMLAttributes<HTMLImageElement> = {
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
			imageProps.sizes = "300px"; //Ensure the image is always 300px wide
		}

		const jobPositionLanguagesTranslation = {
			junior: t("realtor.jobPosition.junior"),
			senior: t("realtor.jobPosition.senior"),
			director: t("realtor.jobPosition.director"),
		};

		return (
			<a href={buildNodeUrl(currentNode)} className={classes.card}>
				<Image className={classes.image} {...imageProps} />
				<div className={classes.main}>
					<h4>
						{firstName} {lastName}
					</h4>
					<p className={classes.jobPosition}>{jobPositionLanguagesTranslation[jobPosition]}</p>
				</div>
			</a>
		);
	},
);
