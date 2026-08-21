import { jahiaComponent } from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import classes from "~/components/TextIllustrated/default.module.css";
import clsx from "clsx";
import { LuxeImage } from "~/commons/image/LuxeImage";
import { Col, Row } from "design-system";
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
	({ title, text, image: imageNode, arrangement, ...props }: Props) => (
		<Row className={classes.main}>
			<Col className={classes.imageCol}>
				<LuxeImage
					node={imageNode}
					className={classes.image}
					sizes="(max-width: 576px) 100vw,(max-width: 1320px) 45vw, 650px"
				/>
			</Col>
			<Col className={clsx(classes.text, arrangement === "right" && classes.right)}>
				<h2 className={classes.title}>{title}</h2>
				{/* eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml */}
				{text && <div dangerouslySetInnerHTML={{ __html: text }} />}
				{/* ctaType is undefined on content predating the CTA mixin */}
				{props.ctaType && props.ctaType !== "none" && (
					<p>
						<CTA {...props} />
					</p>
				)}
			</Col>
		</Row>
	),
);
