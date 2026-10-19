import { jahiaComponent } from "@jahia/javascript-modules-library";
import { Figure, Row } from "design-system";
import type { HeaderProps } from "./types";
import classes from "./textDown.module.css";
import { LuxeImage } from "~/commons/image/LuxeImage";

jahiaComponent(
	{
		nodeType: "luxe:header",
		name: "textDown",
		displayName: "Image & Text Down",
		componentType: "view",
	},
	({ title, subtitle, image: imageNode }: HeaderProps) => (
		<header className={classes.header}>
			{imageNode && (
				<Row>
					<Figure layout="imgFull">
						<LuxeImage
							node={imageNode}
							className={classes.image}
							sizes="(max-width: 1320px) 100vw, 1320px"
							priority
						/>
					</Figure>
				</Row>
			)}
			<Row component="hgroup">
				<h1 className={classes.title}>{title}</h1>
				<p className={classes.hp}>{subtitle}</p>
			</Row>
		</header>
	),
);
