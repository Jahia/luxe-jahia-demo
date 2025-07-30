import { buildNodeUrl, jahiaComponent, server } from "@jahia/javascript-modules-library";
import { Figure, PageTitle, Row } from "~/commons";
import type { HeaderProps } from "./types.js";
import classes from "./textUp.module.css";

jahiaComponent(
	{
		nodeType: "luxe:header",
		name: "textUp",
		displayName: "Image & Text Up",
		componentType: "view",
	},
	({ title, subtitle, image: imageNode }: HeaderProps, { renderContext }) => {
		if (imageNode) {
			server.render.addCacheDependency({ node: imageNode }, renderContext);
		}

		return (
			<header className={classes.header}>
				<Row>
					<PageTitle title={title} description={subtitle} />
				</Row>
				{imageNode && (
					<Row>
						<Figure
							src={buildNodeUrl(imageNode)}
							alt={imageNode.getDisplayableName()}
							layout="imgFull"
						/>
					</Row>
				)}
			</header>
		);
	},
);
