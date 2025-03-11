import { jahiaComponent, server, useUrlBuilder } from "@jahia/javascript-modules-library";
import { useTranslation } from "react-i18next";
import { RealtorProps } from "./types.js";

jahiaComponent(
  {
    nodeType: "luxe:realtor",
    name: "default",
    componentType: "view",
  },
  (
    { firstName, lastName, jobPosition, image: imageNode }: RealtorProps,
    { currentNode, renderContext },
  ) => {
    const { t } = useTranslation();
    const { buildStaticUrl } = useUrlBuilder();
    const image = {
      src: buildStaticUrl({ assetPath: "img/agent-placeholder.jpg" }),
      alt: "Placeholder",
    };

    if (imageNode) {
      server.render.addCacheDependency({ node: imageNode }, renderContext);
      image.src = imageNode.getUrl();
      image.alt = t("alt.realtor", { realtor: `${firstName} ${lastName}` });
    }

    return (
      <a href={currentNode.getUrl()} className="lux-agentCard d-flex flex-column">
        <img
          className="lux-agentCard_image"
          src={image.src}
          alt={image.alt}
          width="250px"
          height="250px"
        />

        <div className="lux-agentCard_informations d-flex py-3 flex-column justify-content-center">
          <h4 className="my-0">
            {firstName} {lastName}
          </h4>
          <p className="m-0 lux-capitalize">{t(`realtor.jobPosition.${jobPosition}`)}</p>
        </div>
      </a>
    );
  },
);
