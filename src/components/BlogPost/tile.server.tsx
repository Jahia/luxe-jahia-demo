import { jahiaComponent, server, useUrlBuilder } from "@jahia/javascript-modules-library";
import { t } from "i18next";
import type { BlogPostProps } from "./types";
import classes from "./tile.module.css";

jahiaComponent(
  {
    nodeType: "luxe:blogPost",
    name: "tile",
    displayName: "Tile",
    componentType: "view",
  },
  ({ title, image: imageNode }: BlogPostProps, { currentNode, renderContext }) => {
    const { buildStaticUrl } = useUrlBuilder();
    const image = {
      src: buildStaticUrl({ assetPath: "img/img-placeholder.jpg" }),
      alt: "Placeholder",
    };

    if (imageNode) {
      image.src = imageNode.getUrl();
      image.alt = t("alt.blog", { blog: title });

      server.render.addCacheDependency({ node: imageNode }, renderContext);
    }

    return (
      <a href={currentNode.getUrl()}>
        <figure className={classes.card}>
          <img src={image.src} alt={image.alt} />
          <figcaption>{title}</figcaption>
        </figure>
      </a>
    );
  },
);
