import {
  buildModuleFileUrl,
  buildNodeUrl,
  jahiaComponent,
  server,
} from "@jahia/javascript-modules-library";
import { t } from "i18next";
import type { BlogPostProps } from "./types";
import classes from "./card.module.css";
import placeholder from "/static/img/img-placeholder.jpg";

jahiaComponent(
  {
    nodeType: "luxe:blogPost",
    name: "card",
    displayName: "Card",
    componentType: "view",
  },
  ({ title, subtitle, image: imageNode }: BlogPostProps, { currentNode, renderContext }) => {
    const image = {
      src: buildModuleFileUrl(placeholder),
      alt: "Placeholder",
    };

    if (imageNode) {
      image.src = buildNodeUrl(imageNode);
      image.alt = t("alt.blog", { blog: title });

      server.render.addCacheDependency({ node: imageNode }, renderContext);
    }

    return (
      <a href={buildNodeUrl(currentNode)} className={classes.card}>
        <img src={image.src} alt={image.alt} height="265" />
        <h4>{title}</h4>
        {subtitle && <p>{subtitle}</p>}
      </a>
    );
  },
);
