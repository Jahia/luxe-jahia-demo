import {
  buildModuleFileUrl,
  buildNodeUrl,
  jahiaComponent,
  server,
} from "@jahia/javascript-modules-library";
import { t } from "i18next";
import type { BlogPostProps } from "./types";

jahiaComponent(
  {
    nodeType: "luxe:blogPost",
    name: "tile",
    displayName: "Tile",
    componentType: "view",
  },
  ({ title, image: imageNode }: BlogPostProps, { currentNode, renderContext }) => {
    const image = {
      src: buildModuleFileUrl("static/img/img-placeholder.jpg"),
      alt: "Placeholder",
    };

    if (imageNode) {
      image.src = buildNodeUrl(imageNode);
      image.alt = t("alt.blog", { blog: title });

      server.render.addCacheDependency({ node: imageNode }, renderContext);
    }

    return (
      <a href={buildNodeUrl(currentNode)}>
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
