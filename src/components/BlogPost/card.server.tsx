import { buildModuleFileUrl, jahiaComponent, server } from "@jahia/javascript-modules-library";
import { t } from "i18next";
import type { BlogPostProps } from "./types";
import classes from "./component.module.css";

jahiaComponent(
  {
    nodeType: "luxe:blogPost",
    name: "card",
    displayName: "Card",
    componentType: "view",
  },
  ({ title, subtitle, image: imageNode }: BlogPostProps, { currentNode, renderContext }) => {
    const image = {
      src: buildModuleFileUrl("static/img/img-placeholder.jpg"),
      alt: "Placeholder",
    };

    if (imageNode) {
      image.src = imageNode.getUrl();
      image.alt = t("alt.blog", { blog: title });

      server.render.addCacheDependency({ node: imageNode }, renderContext);
    }

    return (
      <a href={currentNode.getUrl()} className={classes.card}>
        <img src={image.src} alt={image.alt} height="265" />
        <h4>{title}</h4>
        {subtitle && <p>{subtitle}</p>}
      </a>
    );
  },
);
