import {
	buildModuleFileUrl,
	jahiaComponent,
	Render,
	server,
} from "@jahia/javascript-modules-library";
import type { BlogPostProps } from "./types.js";
import classes from "./fullPage.module.css";
import placeholder from "/static/img/img-placeholder.jpg";
import { Col, Figure, HeadingSection, Image, Row, Section } from "design-system";
import { imageNodeToImgProps } from "~/commons/libs/imageNodeToProps";
import type { ImgHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

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
		const { t } = useTranslation();
		// Image: placeholder by default; override when a real node exists
		let imageProps: ImgHTMLAttributes<HTMLImageElement> = {
			src: buildModuleFileUrl(placeholder),
		};

		if (imageNode) {
			// SSR cache dep for this image node
			server.render.addCacheDependency({ node: imageNode }, renderContext);

			// Map Jahia node -> <img> props (+ i18n alt)
			imageProps = imageNodeToImgProps(imageNode, {
				alt: t("alt.blog", { blog: title }),
			});

			// Responsive slot hint: ≤1320px → 100vw, otherwise ≈1320px
			// (keep in sync with grid breakpoints; effective with width-based srcset)
			imageProps.sizes = "(max-width: 1320px) 100vw, 1320px";
		}

		// Guard against a missing or invalid date: new Date(undefined) is an
		// Invalid Date and toISOString() would throw a RangeError
		const date = stringDate ? new Date(stringDate) : undefined;
		const formatedDate =
			date && !Number.isNaN(date.getTime())
				? date.toLocaleDateString(currentNode.getLanguage(), {
						// Weekday: 'long',
						year: "numeric",
						month: "long",
						day: "numeric",
					})
				: null;

		// A deleted reference leaves a null entry in weakreference arrays
		const related = relatedBlogPosts?.filter(Boolean).slice(0, 3) ?? [];

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
							{formatedDate && date && <time dateTime={date.toISOString()}>{formatedDate}</time>}
							<h1 className={classes.title}>{title}</h1>
							{subtitle && <p className={classes.hp}>{subtitle}</p>}
						</Row>
					</header>
					<Section>
						<Row
							className={classes.richtext}
							dangerouslySetInnerHTML={{
								__html: body ?? "",
							}}
						/>
						{categories && (
							<div className={classes.category}>
								{categories.filter(Boolean).map((node) => (
									<Render key={node.getIdentifier()} node={node} view="badge" readOnly />
								))}
							</div>
						)}
					</Section>
				</article>
				{related.length > 0 && (
					<Section>
						<HeadingSection title={t("section.heading.relatedBlogPosts")} />
						<Row className={classes.rowRelatedBlogPosts}>
							{related.map((node) => {
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
