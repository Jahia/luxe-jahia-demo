import {
  buildModuleFileUrl,
  buildNodeUrl,
  jahiaComponent,
  server,
} from "@jahia/javascript-modules-library";
import { t } from "i18next";
import type { RealtorProps } from "./types.js";

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
    const image = {
      src: buildModuleFileUrl("static/img/agent-placeholder.jpg"),
      alt: "Placeholder",
    };

    if (imageNode) {
      server.render.addCacheDependency({ node: imageNode }, renderContext);
      image.src = buildNodeUrl(imageNode);
      image.alt = t("alt.realtor", { realtor: `${firstName} ${lastName}` });
    }

    return (
      <a href={buildNodeUrl(currentNode)} className="lux-agentCard d-flex flex-column">
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
          <p className="m-0 lux-capitalize">
            {
              {
                junior: t("realtor.jobPosition.junior"),
                senior: t("realtor.jobPosition.senior"),
                director: t("realtor.jobPosition.director"),
              }[jobPosition]
            }
          </p>
        </div>
      </a>
    );
  },
);
