import type { JSX, ReactNode } from "react";
import {
  AbsoluteArea,
  AddResources,
  buildModuleFileUrl,
  getNodeProps,
  Render,
  useServerContext,
} from "@jahia/javascript-modules-library";
import { Col, Row, Section } from "~/commons";
import { t } from "i18next";
import "./css/global.module.css";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import classes from "./Layout.module.css";
import grid from "~/commons/grid/grid.module.css";

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
  const { renderContext } = useServerContext();
  return (
    <>
      <HtmlHead>{head}</HtmlHead>
      <body>
        <AbsoluteArea
          name="nav"
          parent={renderContext.getSite().getHome()}
          nodeType="luxe:navigationMenu"
        />
        <main className={className}>{children}</main>
        <HtmlFooter />
      </body>
    </>
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

      <link rel="icon" type="image/png" href={buildModuleFileUrl("static/favicon-32x32.png")} />
      <AddResources type="css" resources={buildModuleFileUrl("dist/server/style.css")} />
      {children}
    </head>
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
  return (
    <Section component="footer" className={className}>
      <Row>
        <Col className={grid.col_4}>
          <h5 className={classes.capitalize}>{t("footer.resources")}</h5>
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
        <Col className={grid.col_3}>
          <></>
          {/* <h5>Join us</h5> */}
          {/* <ul className="list-inline"> */}
          {/*    <li className="list-inline-item"> */}
          {/*        <a href="#">youtube</a> */}
          {/*    </li> */}
          {/*    <li className="list-inline-item"> */}
          {/*        <a href="#">Github</a> */}
          {/*    </li> */}
          {/* </ul> */}
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
          <span>{t("footer.copyright", { currentDate: new Date().getFullYear() })}</span>
        </Col>
      </Row>
    </Section>
  );
};

interface SeoMetaTagsProps {
  "jcr:title": string;
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
    openGraphImageSizes = getNodeProps(openGraphImage, ["j:width", "j:height"]) as {
      "j:width"?: number;
      "j:height"?: number;
    };
  }

  return (
    <>
      {seoTitle && (
        <>
          <title>{seoTitle}</title>
          <meta property="og:title" content={seoTitle} />
        </>
      )}
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
