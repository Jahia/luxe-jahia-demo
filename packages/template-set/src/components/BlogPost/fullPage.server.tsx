import {
	buildModuleFileUrl,
	jahiaComponent,
	Render,
	server,
} from "@jahia/javascript-modules-library";
import { Col, HeadingSection, Row, Section } from "~/commons";
import { t } from "i18next";
import type { BlogPostProps } from "./types.js";
import classes from "./fullPage.module.css";
import placeholder from "/static/img/img-placeholder.jpg";
import { Figure, Image } from "design-system";
import { imageNodeToImgProps } from "~/commons/libs/imageNodeToProps";

/* eslint-disable @eslint-react/dom/no-dangerously-set-innerhtml */
jahiaComponent(
	{
		nodeType: "luxe:blogPost",
		name: "fullPage",
		displayName: "Full Page",
		componentType: "view",
	},
	(
		{
			title,
			subtitle,
			"image": imageNode,
			body,
			"date": stringDate,
			"j:defaultCategory": categories,
			relatedBlogPosts,
		}: BlogPostProps,
		{ currentNode, renderContext },
	) => {
		// Image: placeholder by default; override when a real node exists
		let imageProps: React.ImgHTMLAttributes<HTMLImageElement> = {
			src: buildModuleFileUrl(placeholder),
		};

		if (imageNode) {
			// SSR cache dep for this image node
			server.render.addCacheDependency({ node: imageNode }, renderContext);

			// Map Jahia node -> <img> props (+ i18n alt)
			imageProps = imageNodeToImgProps({
				imageNode,
				alt: t("alt.blog", { blog: title }),
			});

			// Responsive slot hint: ≤1320px → 100vw, otherwise ≈1320px
			// (keep in sync with grid breakpoints; effective with width-based srcset)
			imageProps.sizes = "(max-width: 1320px) 100vw, 1320px";
		}

		const date: Date = new Date(stringDate);
		const formatedDate =
			date.toLocaleDateString(currentNode.getLanguage(), {
				// Weekday: 'long',
				year: "numeric",
				month: "long",
				day: "numeric",
			}) || null;

		return (
			<>
				<article>
					<header className={classes.header}>
						<Row>
							<Figure layout="imgFull">
								<Image {...imageProps} />
							</Figure>
						</Row>
						<Row component="hgroup">
							<time dateTime={date.toISOString()}>{formatedDate}</time>
							<h1 className={classes.title}>{title}</h1>
							{subtitle && <p className={classes.hp}>{subtitle}</p>}
						</Row>
					</header>
					<Section>
						<Row
							className={classes.richtext}
							dangerouslySetInnerHTML={{
								__html: body,
							}}
						/>
						{categories && (
							<div className={classes.category}>
								{categories.map((node) => (
									<Render key={node.getIdentifier()} node={node} view="badge" readOnly />
								))}
							</div>
						)}
					</Section>
				</article>
				{relatedBlogPosts && relatedBlogPosts.length > 0 && (
					<Section>
						<HeadingSection title={t("section.heading.relatedBlogPosts")} />
						<Row className={classes.rowRelatedBlogPosts}>
							{relatedBlogPosts.slice(0, 3).map((node) => {
								return (
									<Col key={node.getIdentifier()}>
										<Render node={node} view="card" readOnly />
									</Col>
								);
							})}
						</Row>
					</Section>
				)}
			</>
		);
	},
);
