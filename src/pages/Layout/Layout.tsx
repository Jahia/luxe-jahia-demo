import { JSX, ReactNode } from "react";
import { HtmlHead, HtmlFooter } from "./";
import { AbsoluteArea } from "@jahia/javascript-modules-library";

/**
 * Places `children` in an html page.
 *
 * @param head : element to enrich the html Head tag, e.g. :
 * <>
 *     <title>...</title>
 *     <meta property="..." content="...">
 *     <script type="text/javascript" src="..."></script>
 * </>
 * the elements will be place after the others defined in the HtmlHead cmp
 * @param className : used to add css classes to the <main> html tag
 * @param children : content of hte <main> html tag of the page
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
  return (
    <>
      <HtmlHead>{head}</HtmlHead>
      <body>
        <AbsoluteArea name="navArea" allowedTypes={["luxe:navMenu"]} numberOfItems={1} />
        <main className={className}>{children}</main>
        <HtmlFooter />
      </body>
    </>
  );
};
