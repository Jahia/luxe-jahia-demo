import { jahiaComponent, server } from "@jahia/javascript-modules-library";
import { PageTitle, Row } from "~/commons";
import { Figure, Image } from "design-system";
import type { HeaderProps } from "./types.js";
import classes from "./textUp.module.css";
import { imageNodeToImgProps } from "~/commons/libs/imageNodeToProps";

jahiaComponent(
	{
		nodeType: "luxe:header",
		name: "textUp",
		displayName: "Image & Text Up",
		componentType: "view",
	},
	({ title, subtitle, image: imageNode }: HeaderProps, { renderContext }) => {
		if (imageNode) server.render.addCacheDependency({ node: imageNode }, renderContext);

		return (
			<header className={classes.header}>
				<Row>
					<PageTitle title={title} description={subtitle} />
				</Row>
				{imageNode && (
					<Row>
						<Figure layout="imgFull">
							<Image
								className={classes.image}
								sizes="(max-width: 1320px) 100vw, 1320px"
								{...imageNodeToImgProps({ imageNode })}
							/>
						</Figure>
					</Row>
				)}
			</header>
		);
	},
);
