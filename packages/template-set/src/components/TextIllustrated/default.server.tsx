import { buildModuleFileUrl, jahiaComponent, server } from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import placeholder from "/static/img/img-placeholder.jpg";
import classes from "~/components/TextIllustrated/default.module.css";
import { Col, Row } from "~/commons";
import clsx from "clsx";
import React from "react";
import { imageNodeToImgProps } from "~/commons/libs/imageNodeToProps";
import { Image } from "design-system";
import { CTA, type CTAProps } from "~/mixins/CTA/index.tsx";

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
	({ title, text, image: imageNode, arrangement, ...props }: Props, { renderContext }) => {
		let imageProps: React.ImgHTMLAttributes<HTMLImageElement> = {
			src: buildModuleFileUrl(placeholder),
		};
		if (imageNode) {
			// Cache dependency for all nodes involved
			server.render.addCacheDependency({ node: imageNode }, renderContext);
			imageProps = imageNodeToImgProps({ imageNode });
			// Responsive slot hint: ≤576px → 100vw, ≤1320px → 45vw, otherwise ≈650px
			// (keep in sync with grid breakpoints; effective with width-based srcset)
			imageProps.sizes = "(max-width: 576px) 100vw,(max-width: 1320px) 45vw, 650px";
		}

		return (
			<Row className={classes.main}>
				<Col className={classes.imageCol}>
					<Image className={classes.image} {...imageProps} />
				</Col>
				<Col className={clsx(classes.text, arrangement === "right" && classes.right)}>
					<h2 className={classes.title}>{title}</h2>
					{/* eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml */}
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
