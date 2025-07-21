import { buildNodeUrl, jahiaComponent, server } from "@jahia/javascript-modules-library";
import type { HeaderProps } from "./types";
import { Picture } from "~/commons/Picture";
import classes from "./default.module.css";
jahiaComponent(
	{
		nodeType: "luxe:header",
		name: "default",
		componentType: "view",
	},
	({ title, image: imageNode }: HeaderProps, { renderContext }) => {
		if (imageNode) {
			server.render.addCacheDependency({ node: imageNode }, renderContext);
		}

		return (
			<section className={classes.cover}>
				{/* If you use one of our external DAM plugins, you can specify the image width or height
            to enable live image resizing performed by the DAM provider. */}
				{imageNode && (
					<Picture
						image={{
							src: `${buildNodeUrl(imageNode, { parameters: { width: "480" } })}?w=480&h=695`,
							alt: imageNode.getDisplayableName(),
						}}
						sources={[
							{
								media: "(min-width: 960px)",
								srcSet: `${buildNodeUrl(imageNode, { parameters: { width: "1920" } })}?w=1920&h=695`,
							},
							{
								media: "(min-width: 480px)",
								srcSet: `${buildNodeUrl(imageNode, { parameters: { width: "960" } })}?w=960&h=695`,
							},
						]}
						height="695px"
					/>
				)}

				<h1>{title}</h1>
			</section>
		);
	},
);
