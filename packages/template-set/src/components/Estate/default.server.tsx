import {
	buildModuleFileUrl,
	buildNodeUrl,
	jahiaComponent,
	server,
} from "@jahia/javascript-modules-library";
import { t } from "i18next";
import type { EstateProps } from "./types";
import classes from "./default.module.css";
import placeholder from "/static/img/img-placeholder.jpg";
import { imageNodeToImgProps } from "~/commons/libs/imageNodeToProps";
import { Image } from "design-system";
import type { ImgHTMLAttributes } from "react";

jahiaComponent(
	{
		nodeType: "luxe:estate",
		name: "default",
		componentType: "view",
	},
	(
		{ title, price, images, surface, bedrooms }: EstateProps,
		{ currentNode, currentResource, renderContext },
	) => {
		const locale = currentResource.getLocale().getLanguage();

		// Image: placeholder by default; override when a real node exists
		let imageProps: ImgHTMLAttributes<HTMLImageElement> = {
			src: buildModuleFileUrl(placeholder),
		};
		if (images[0]) {
			const imageNode = images[0];
			// SSR cache dep for this image node
			server.render.addCacheDependency({ node: imageNode }, renderContext);

			// Map Jahia node -> <img> props (+ i18n alt)
			imageProps = imageNodeToImgProps({
				imageNode,
				alt: t("alt.estate", { estate: title }),
			});

			// Responsive slot hint: ≤768px → 100vw,≤992px → 50vw, ≤1320px → 30vw, otherwise ≈400px
			// (keep in sync with grid breakpoints; effective with width-based srcset)
			// default is usually used in 3 cols grid, so 400px is a good default for larger screens
			imageProps.sizes =
				"(max-width: 768px) 100vw,(max-width: 992px) 50vw,(max-width: 1320px) 30vw, 400px";
		}

		return (
			<a href={buildNodeUrl(currentNode)} className={classes.card}>
				<Image className={classes.image} {...imageProps} />
				<h4>{title}</h4>
				<p>
					{bedrooms} {t("estate.bedrooms.label")} <span>✦</span> {surface.toLocaleString(locale)} m
					<sup>2</sup>
				</p>
				<strong>{price.toLocaleString(locale)}€</strong>
			</a>
		);
	},
);
