import { jahiaComponent, server, useUrlBuilder } from "@jahia/javascript-modules-library";
import { t } from "i18next";
import type { BlogPostProps } from "./types";

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
      <a className="lux-agencyCard d-flex" href={currentNode.getUrl()}>
        <img
          className="lux-agencyCard_image me-4"
          src={image.src}
          alt={image.alt}
          width="200"
          height="200"
        />

        <div className="d-flex flex-column justify-content-center flex-fill">
          <h2 className="my-0 lux-capitalize">{title}</h2>
          {subtitle && <p className="m-0">{subtitle}</p>}
        </div>
      </a>
    );
  },
);
