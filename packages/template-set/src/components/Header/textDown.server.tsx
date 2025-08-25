import { jahiaComponent, server } from "@jahia/javascript-modules-library";
import { Row } from "~/commons";
import { Figure, Image } from "design-system";
import type { HeaderProps } from "./types";
import classes from "./textDown.module.css";
import { imageNodeToImgProps } from "~/commons/libs/imageNodeToProps";

jahiaComponent(
	{
		nodeType: "luxe:header",
		name: "textDown",
		displayName: "Image & Text Down",
		componentType: "view",
	},
	({ title, subtitle, image: imageNode }: HeaderProps, { renderContext }) => {
		if (imageNode) server.render.addCacheDependency({ node: imageNode }, renderContext);

		return (
			<header className={classes.header}>
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
				<Row component="hgroup">
					<h1 className={classes.title}>{title}</h1>
					<p className={classes.hp}>{subtitle}</p>
				</Row>
			</header>
		);
	},
);
