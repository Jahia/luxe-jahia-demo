import { jahiaComponent, JImage } from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import classes from "~/components/TextIllustrated/default.module.css";
import clsx from "clsx";
import placeholder from "/static/img/img-placeholder.jpg";
import { Col, imageClass, Row } from "design-system";
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
	({ title, text, image: imageNode, arrangement, ...props }: Props, { currentNode }) => (
		<Row className={classes.main}>
			<Col className={classes.imageCol}>
				<JImage
					node={imageNode}
					// Unchanged from the previous default; meaningful text is tracked in #454
					alt={imageNode?.getDisplayableName() ?? ""}
					fallback={placeholder}
					className={clsx(imageClass, classes.image)}
					layout="constrained"
					// Two columns above sm, a full-bleed backdrop below it
					sizes="(max-width: 576px) 100vw,(max-width: 1320px) 45vw, 650px"
				/>
			</Col>
			<Col className={clsx(classes.text, arrangement === "right" && classes.right)}>
				<h2 className={classes.title}>{title}</h2>
				{/* eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml */}
				{text && <div dangerouslySetInnerHTML={{ __html: text }} />}
				{/* ctaType is undefined on content predating the CTA mixin. The test has to stay
				    here: <JLink content> renders nothing for a node carrying no link, but the <p>
				    around it would still be emitted. */}
				{props.ctaType && props.ctaType !== "none" && (
					<p>
						<CTA node={currentNode} />
					</p>
				)}
			</Col>
		</Row>
	),
);
