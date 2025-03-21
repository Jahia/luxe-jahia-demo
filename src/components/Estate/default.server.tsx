import { jahiaComponent, server, useUrlBuilder } from "@jahia/javascript-modules-library";
import { t } from "i18next";
import type { EstateProps } from "./types";

jahiaComponent(
  {
    nodeType: "luxe:estate",
    name: "default",
    componentType: "view",
  },
  (
    { title, price, images, surface, bedrooms }: EstateProps,
    { currentNode, currentResource, renderContext },
  ) => {
    const { buildStaticUrl } = useUrlBuilder();
    const locale = currentResource.getLocale().getLanguage();
    const image = {
      src: buildStaticUrl({ assetPath: "img/img-placeholder.jpg" }),
      alt: "Placeholder",
    };

    if (images[0]) {
      const _image = images[0];
      image.src = _image.getUrl();
      image.alt = t("alt.estate", { estate: title });

      server.render.addCacheDependency({ node: _image }, renderContext);
    }

    return (
      <a href={currentNode.getUrl()} className="lux-estateCard">
        <img src={image.src} alt={image.alt} height="265" />
        <h4 className="my-2">{title}</h4>
        <p className="lux-estateCard_informations">
          {bedrooms} {t("estate.bedrooms.label")} <span className="lux-diamond">✦</span>{" "}
          {surface.toLocaleString(locale)} m<sup>2</sup>
        </p>
        <strong className="lux-estateCard_price">{price.toLocaleString(locale)}€</strong>
      </a>
    );
  },
);
