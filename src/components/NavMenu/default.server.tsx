import { jahiaComponent, server } from "@jahia/javascript-modules-library";
import clsx from "clsx";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import classes from "./default.module.css";
import { NavigationToggler } from "~/components/NavMenu/NavigationToggler";

interface navMenuBrandProps {
  // base?: "home" | "currentPage" | "";
  // maxDepth: number;
  // startLevel: number;
  // menuItemView: string;
  brandText?: string;
  brandImage?: JCRNodeWrapper;
  brandImageMobile?: JCRNodeWrapper;
}

jahiaComponent(
  {
    nodeType: "luxe:navMenu",
    displayName: "Navbar Nav Menu",
    name: "default",
    componentType: "view",
    properties: {
      "cache.mainResource": "true",
    },
  },
  ({ brandText, brandImage }: navMenuBrandProps, { renderContext }) => {
    const siteName = renderContext.getSite().getTitle();
    const home = renderContext.getSite().getHome();

    if (brandImage) {
      server.render.addCacheDependency({ node: brandImage }, renderContext);
    }

    return (
      <nav className={clsx(classes.navbar /*"navbar-expand-lg"*/)}>
        <div className={classes.containerFluid}>
          <a href={home.getUrl()} className={classes.brand}>
            {brandImage && <img src={brandImage.getUrl()} alt={`Logo-${siteName}`} width="100px" />}
            {brandText}
          </a>
          <NavigationToggler />
          <LanguageSwitcher />
        </div>
      </nav>
    );
  },
);
