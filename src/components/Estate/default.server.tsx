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

jahiaComponent(
	{
		nodeType: "luxe:estate",
		name: "default",
		componentType: "view",
	},
	(
		{ title, price, images: imageNodes, surface, bedrooms }: EstateProps,
		{ currentNode, currentResource, renderContext },
	) => {
		const locale = currentResource.getLocale().getLanguage();

		const image = {
			src: buildModuleFileUrl(placeholder),
			alt: "Placeholder",
		};
		const images = imageNodes.filter((imageNode) => Boolean(imageNode));
		if (images[0]) {
			const _image = images[0];
			image.src = buildNodeUrl(_image);
			image.alt = t("alt.estate", { estate: title });

			server.render.addCacheDependency({ node: _image }, renderContext);
		}

		return (
			<a href={buildNodeUrl(currentNode)} className={classes.card}>
				<img src={image.src} alt={image.alt} height="265" />
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
