import type { JSX, ReactNode } from "react";
import {
	AbsoluteArea,
	AddResources,
	buildModuleFileUrl,
	getNodeProps,
	Island,
	Render,
	server,
	useServerContext,
} from "@jahia/javascript-modules-library";
import CopyrightYearClient from "./CopyrightYear.client";
import "./css/global.module.css";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import classes from "./Layout.module.css";
import grid from "design-system/Grid/styles.module.css";
import favicon from "/static/favicon-32x32.png";
import { Col, Row, Section } from "design-system";
import { useTranslation } from "react-i18next";

/**
 * Layout : Places 'children' in an html page.
 *
 * @param head : element to enrich the html Head tag, e.g. :
 * <>
 *     <title>...</title>
 *     <meta property="..." content="...">
 *     <script type="text/javascript" src="..."></script>
 * </>
 * the elements will be place after the others defined in the HtmlHead cmp
 * @param className : used to add css classes to the <main> html tag
 * @param children : content of the <main> html tag of the page
 * @returns {JSX.Element}
 * @constructor
 */
export const Layout = ({
	head,
	className,
	children,
}: {
	head?: ReactNode;
	className?: string;
	children: ReactNode;
}): JSX.Element => {
	const { t } = useTranslation();
	const { currentResource } = useServerContext();
	return (
		<html lang={currentResource.getLocale().getLanguage()}>
			<HtmlHead>{head}</HtmlHead>
			<body>
				<a href="#main" className={classes.skipLink}>
					{t("skipToContent")}
				</a>
				<VirtualNavMenu />
				<main id="main" className={className}>
					{children}
				</main>
				<HtmlFooter className={classes.footer} />
			</body>
		</html>
	);
};

/**
 * HtmlHead
 * @param children : content added at the end of <head> html tag of the page
 * @returns {JSX.Element}
 * @constructor
 */
const HtmlHead = ({ children }: { children: ReactNode }): JSX.Element => {
	return (
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<SeoMetaTags />

			<link rel="icon" type="image/png" href={buildModuleFileUrl(favicon)} />
			<AddResources type="css" resources={buildModuleFileUrl("dist/assets/style.css")} />
			{children}
		</head>
	);
};

/**
 * Virtual navigation menu used as a workaround for a known limitation: empty areas (`<AbsoluteArea>` or `<Area>`) are not rendered in "preview" mode. See https://github.com/Jahia/luxe-jahia-demo/issues/226 for details.
 * The temporary solution is to use a virtual node: a `"jnt:contentList"` containing a single child, the `"luxe:navigationMenu"`.
 *
 * TODO once Jahia 8.2.2.0, that contains the fix, is released, replace with:
 * <code>
 *     <AbsoluteArea
 *        name="nav"
 *         parent={renderContext.getSite().getHome()}
 *         nodeType="luxe:navigationMenu"
 *       />
 * </code>
 */
const VirtualNavMenu = (): JSX.Element | null => {
	const { renderContext } = useServerContext();
	// getHome() returns null in live until the home page is published
	const homeNode = renderContext.getSite().getHome();
	if (!homeNode) {
		return null;
	}

	const navNode = homeNode.hasNode("nav") ? homeNode.getNode("nav") : null;
	if (navNode) {
		// The menu is built from the nav node's properties: without this
		// dependency the cached fragment goes stale when the node changes
		server.render.addCacheDependency({ node: navNode }, renderContext);
	}

	const props = navNode ? navNode.getPropertiesAsString() : new Map();
	return (
		<Render
			content={{
				name: "virtualArea",
				nodeType: "jnt:contentList",
				children: [
					{
						name: "menu",
						nodeType: "luxe:navigationMenu",
						// copy the known properties of "luxe:navigationMenu" to discard the read-only/protected ones (jcr:created, etc.)
						properties: {
							brandText: props.get("brandText"),
							brandImage: props.get("brandImage"),
							brandImageMobile: props.get("brandImageMobile"),
						},
					},
				],
			}}
		/>
	);
};

// The login form is implemented as static content.
// It will be added to the footer and cannot be modified by Jahia contributors.
const loginForm = {
	name: "loginForm",
	nodeType: "luxe:loginForm",
	properties: {
		"j:displayRememberMeButton": "true",
	},
};

/**
 * HtmlFooter
 * @param className
 * @returns {JSX.Element}
 * @constructor
 */
const HtmlFooter = ({ className }: { className?: string }): JSX.Element => {
	const { renderContext } = useServerContext();
	const { t } = useTranslation();
	return (
		<Section component="footer" className={className}>
			<Row>
				<Col className={grid.col_4}>
					<h2 className={[classes.capitalize, classes.footerHeading].join(" ")}>
						{t("footer.resources")}
					</h2>
					<ul className={classes.list}>
						<li>
							<a
								className={classes.fullTextCapitalize}
								href="https://academy.jahia.com/home"
								target="_blank"
								rel="noreferrer"
							>
								{t("footer.academy")}
							</a>
						</li>
						<li>
							<a
								className={classes.capitalize}
								href="https://academy.jahia.com/get-started"
								target="_blank"
								rel="noreferrer"
							>
								{t("footer.tutorial")}
							</a>
						</li>
						<li>
							<a
								className={classes.capitalize}
								href="https://github.com/Jahia/luxe-jahia-demo/"
								target="_blank"
								rel="noreferrer"
							>
								{t("footer.sourceCode")}
							</a>
						</li>
					</ul>
				</Col>
				<Col className={grid.col_5}>
					<Render content={loginForm} />
				</Col>
			</Row>
			<Row className={classes.disclaimer}>
				<Col>
					{/* numberOfItems={4} */}
					<AbsoluteArea
						name="footerNavLinkArea"
						parent={renderContext.getSite().getHome()}
						nodeType="jnt:linkList"
						allowedNodeTypes={["jnt:nodeLink", "jnt:externalLink"]}
					/>
				</Col>
				<Col className={classes.copyright}>
					<Island component={CopyrightYearClient} />
				</Col>
			</Row>
		</Section>
	);
};

interface SeoMetaTagsProps {
	// Main-resource types store their name in a type-specific property, so
	// jcr:title can be absent at runtime — the view falls back on the display name
	"jcr:title"?: string;
	"jcr:description"?: string;
	"openGraphImage"?: JCRNodeWrapper;
	"seoKeywords"?: string[];
}

/**
 * SeoMetaTags
 * @returns {JSX.Element | null}
 * @constructor
 */
const SeoMetaTags = (): JSX.Element | null => {
	const { currentNode, currentResource, renderContext } = useServerContext();

	//is it really usefull ? Layout must be called from template only, if user forget jmix:mainResource is it really an issue ?
	const isDisplayableNodeType =
		currentNode.isNodeType("jnt:page") || currentNode.isNodeType("jmix:mainResource");
	if (!isDisplayableNodeType) {
		return null;
	}

	const {
		"jcr:title": seoTitle,
		"jcr:description": seoDescription,
		openGraphImage,
		seoKeywords,
	}: SeoMetaTagsProps = getNodeProps(currentNode, [
		"jcr:title",
		"jcr:description",
		"openGraphImage",
		"seoKeywords",
	]) as SeoMetaTagsProps;

	const locale = currentResource.getLocale().getLanguage();
	const absOgImageUrl = openGraphImage?.getAbsoluteUrl(renderContext.getRequest());
	let openGraphImageSizes: { "j:width"?: number; "j:height"?: number } = {};

	if (openGraphImage) {
		// og:image URL and dimensions come from the referenced node: without
		// this dependency they go stale when the image is replaced
		server.render.addCacheDependency({ node: openGraphImage }, renderContext);
		openGraphImageSizes = getNodeProps(openGraphImage, ["j:width", "j:height"]) as {
			"j:width"?: number;
			"j:height"?: number;
		};
	}

	// Main-resource types (estate, realtor…) store their name in a
	// type-specific property, not jcr:title — fall back on the display name
	const pageTitle = seoTitle || currentNode.getDisplayableName();
	const fullTitle = pageTitle
		? `${pageTitle} | ${renderContext.getSite().getTitle()}`
		: renderContext.getSite().getTitle();

	return (
		<>
			<title>{fullTitle}</title>
			<meta property="og:title" content={fullTitle} />
			<meta property="og:locale" content={locale} />
			<meta property="og:type" content="website" />
			{seoDescription && (
				<>
					<meta property="og:description" content={seoDescription} />
					<meta name="description" content={seoDescription} />
				</>
			)}
			<meta property="og:url" content={currentNode.getAbsoluteUrl(renderContext.getRequest())} />
			<meta property="og:site_name" content={renderContext.getSite().getTitle()} />
			{seoKeywords?.length && <meta name="keywords" content={seoKeywords.join(",")} />}
			{absOgImageUrl && (
				<>
					<meta property="og:image" content={absOgImageUrl} />
					{openGraphImageSizes["j:width"] && (
						<meta property="og:image:width" content={`${openGraphImageSizes["j:width"]}px`} />
					)}
					{openGraphImageSizes["j:height"] && (
						<meta property="og:image:height" content={`${openGraphImageSizes["j:height"]}px`} />
					)}
				</>
			)}
		</>
	);
};
