import { jahiaComponent } from "@jahia/javascript-modules-library";
import { Figure, PageTitle, Row } from "design-system";
import type { HeaderProps } from "./types.js";
import classes from "./textUp.module.css";
import { LuxeImage } from "~/commons/LuxeImage";

jahiaComponent(
	{
		nodeType: "luxe:header",
		name: "textUp",
		displayName: "Image & Text Up",
		componentType: "view",
	},
	({ title, subtitle, image: imageNode }: HeaderProps) => (
		<header className={classes.header}>
			<Row>
				<PageTitle title={title} description={subtitle} />
			</Row>
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
		</header>
	),
);
