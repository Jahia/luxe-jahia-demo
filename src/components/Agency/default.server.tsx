import { jahiaComponent, server, useUrlBuilder } from "@jahia/javascript-modules-library";
import { t } from "i18next";
import type { AgencyProps } from "./types";

jahiaComponent(
  {
    nodeType: "luxe:agency",
    name: "default",
    componentType: "view",
  },
  ({ name, address, phone, image: imageNode }: AgencyProps, { currentNode, renderContext }) => {
    const { buildStaticUrl } = useUrlBuilder();

    const image = {
      src: buildStaticUrl({ assetPath: "img/agency-placeholder.jpg" }),
      alt: "Placeholder",
    };

    if (imageNode) {
      image.src = imageNode.getUrl();
      image.alt = t("alt.agency", { agency: name });

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
          <h2 className="my-0 lux-capitalize">{name}</h2>
          {address && <p className="m-0">{address}</p>}
          {phone && <p className="m-0">{phone}</p>}
        </div>
      </a>
    );
  },
);
