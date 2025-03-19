import { jahiaComponent, server, useUrlBuilder } from "@jahia/javascript-modules-library";
import { t } from "i18next";
import type { BlogPostProps } from "./types";
import classes from "./default.module.css";

jahiaComponent(
  {
    nodeType: "luxe:blogPost",
    name: "default",
    componentType: "view",
  },
  ({ title, subtitle, image: imageNode }: BlogPostProps, { currentNode, renderContext }) => {
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
      <a className={classes.card} href={currentNode.getUrl()}>
        <img className={classes.image} src={image.src} alt={image.alt} width="200" height="200" />

        <div className={classes.main}>
          <h2 className={classes.title}>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </a>
    );
  },
);
