import { jahiaComponent, server, useUrlBuilder } from "@jahia/javascript-modules-library";
import { useTranslation } from "react-i18next";
import { blogPostTypes } from "./types";

jahiaComponent(
  {
    nodeType: "luxe:blogPost",
    name: "card",
    displayName: "Card",
    componentType: "view",
  },
  ({ title, subtitle, image: imageNode }: blogPostTypes, { currentNode, renderContext }) => {
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
      <a href={currentNode.getUrl()} className="lux-estateCard">
        <img src={image.src} alt={image.alt} height="265" />
        <h4 className="my-2">{title}</h4>
        {subtitle && <p className="lux-estateCard_informations">{subtitle}</p>}
      </a>
    );
  },
);
