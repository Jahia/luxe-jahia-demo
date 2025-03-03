import React from "react";
import { jahiaComponent, server, useUrlBuilder } from "@jahia/javascript-modules-library";
import { useTranslation } from "react-i18next";

jahiaComponent(
  {
    nodeType: "luxe:blogPost",
    name: "tile",
    displayName: "Tile",
    componentType: "view",
  },
  ({ title, image: imageNode }, { currentNode, renderContext }) => {
    const { t } = useTranslation();
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
        <figure className="lux-card">
          <img className="lux-card_img" src={image.src} alt={image.alt} />
          <figcaption className="lux-card_figcaption d-flex justify-content-center align-items-center">
            {title}
          </figcaption>
        </figure>
      </a>
    );
  },
);
