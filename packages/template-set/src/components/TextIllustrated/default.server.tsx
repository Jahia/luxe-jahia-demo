import {
	buildModuleFileUrl,
	buildNodeUrl,
	jahiaComponent,
	server,
} from "@jahia/javascript-modules-library";
import clsx from "clsx";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import { Col, Row } from "~/commons/index.ts";
import { CTA, type CTAProps } from "~/mixins/CTA/index.tsx";
import classes from "./component.module.css";
import placeholder from "/static/img/img-placeholder.jpg";

type Props = {
	title?: string;
	text?: string;
	image?: JCRNodeWrapper;
	arrangement?: "left" | "right";
} & CTAProps;

jahiaComponent(
	{
		componentType: "view",
		nodeType: "luxe:textIllustrated",
	},
	({ title, text, image, arrangement, ...props }: Props, { renderContext }) => {
		if (image) server.render.addCacheDependency({ node: image }, renderContext);

		return (
			<Row className={classes.main}>
				<Col className={classes.image}>
					<img
						src={image ? buildNodeUrl(image) : buildModuleFileUrl(placeholder)}
						alt={image?.getDisplayableName() || "Placeholder"}
						height="480"
					/>
				</Col>
				<Col className={clsx(classes.text, arrangement === "right" && classes.right)}>
					<h2 className={classes.title}>{title}</h2>
					{text && <div dangerouslySetInnerHTML={{ __html: text }} />}
					{props.ctaType !== "none" && (
						<p>
							<CTA {...props} />
						</p>
					)}
				</Col>
			</Row>
		);
	},
);
