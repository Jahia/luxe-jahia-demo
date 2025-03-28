import {
  buildNodeUrl,
  getChildNodes,
  jahiaComponent,
  server,
} from "@jahia/javascript-modules-library";
import clsx from "clsx";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { JCRNodeWrapper } from "org.jahia.services.content";

interface Props {
  brandText?: string;
  brandImage?: JCRNodeWrapper;
  brandImageMobile?: JCRNodeWrapper;
}

jahiaComponent(
  {
    nodeType: "luxe:navigationMenu",
    displayName: "Navigation Menu",
    name: "default",
    componentType: "view",
    properties: {
      "cache.mainResource": "true",
    },
  },
  ({ brandText, brandImage }: Props, { renderContext, mainNode }) => {
    const mainPath = renderContext.getMainResource().getPath();
    const siteName = renderContext.getSite().getTitle();
    const home = renderContext.getSite().getHome();

    const menu = getChildNodes(home, 10, 0, (node) => node.isNodeType("jnt:page"));

    if (brandImage) {
      server.render.addCacheDependency({ node: brandImage }, renderContext);
    }

    return (
      <nav className={clsx("navbar", "navbar-expand-lg", "bg-body", "px-5", "py-4")}>
        <div className="container-fluid gap-5">
          <a href={buildNodeUrl(home)} className="navbar-brand">
            {brandImage && (
              <img src={buildNodeUrl(brandImage)} alt={`Logo-${siteName}`} width="100" />
            )}
            {brandText}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div id="navbarSupportedContent" className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-4">
              {menu.map((node) => (
                <li key={node.getIdentifier()} className="nav-item">
                  <a
                    href={buildNodeUrl(node)}
                    className={clsx("nav-link", {
                      active: node === mainNode || mainPath.includes(node.getPath()),
                    })}
                  >
                    {node.getDisplayableName()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <LanguageSwitcher />
        </div>
      </nav>
    );
  },
);
