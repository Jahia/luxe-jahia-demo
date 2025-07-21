import {
	buildModuleFileUrl,
	buildNodeUrl,
	jahiaComponent,
	server,
} from "@jahia/javascript-modules-library";
import { t } from "i18next";
import type { BlogPostProps } from "./types";
import classes from "./default.module.css";
import placeholder from "/static/img/img-placeholder.jpg";

jahiaComponent(
	{
		nodeType: "luxe:blogPost",
		name: "default",
		componentType: "view",
	},
	({ title, subtitle, image: imageNode }: BlogPostProps, { currentNode, renderContext }) => {
		const image = {
			src: buildModuleFileUrl(placeholder),
			alt: "Placeholder",
		};

		if (imageNode) {
			image.src = buildNodeUrl(imageNode);
			image.alt = t("alt.blog", { blog: title });

			server.render.addCacheDependency({ node: imageNode }, renderContext);
		}

		return (
			<a className={classes.card} href={buildNodeUrl(currentNode)}>
				<img className={classes.image} src={image.src} alt={image.alt} width="200" height="200" />

				<div className="d-flex flex-column justify-content-center flex-fill">
					<h2 className="my-0 lux-capitalize">{title}</h2>
					{subtitle && <p className="m-0">{subtitle}</p>}
				</div>
			</a>
		);
	},
);
