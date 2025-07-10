import {
  buildModuleFileUrl,
  buildNodeUrl,
  HydrateInBrowser,
  jahiaComponent,
  server,
} from "@jahia/javascript-modules-library";
import { t } from "i18next";
import type { RealtorProps } from "./types.js";
import placeholder from "/static/img/agent-placeholder.jpg";
import AnimateClient from "~/components/Realtor/Animate.client";
jahiaComponent(
  {
    nodeType: "luxe:realtor",
    name: "animate",
    displayName: "Animated Picture",
    componentType: "view",
  },
  (
    { firstName, lastName, jobPosition, image: imageNode, animate: videoNode }: RealtorProps,
    { currentNode, renderContext },
  ) => {
    const image = {
      src: buildModuleFileUrl(placeholder),
      alt: "Placeholder",
    };

    if (imageNode) {
      server.render.addCacheDependency({ node: imageNode }, renderContext);
      image.src = buildNodeUrl(imageNode);
      image.alt = t("alt.realtor", { realtor: `${firstName} ${lastName}` });
    }

    const jobPositionLanguagesTranslation = {
      junior: t("realtor.jobPosition.junior"),
      senior: t("realtor.jobPosition.senior"),
      director: t("realtor.jobPosition.director"),
    };

    return (
      <HydrateInBrowser
        child={AnimateClient}
        props={{
          firstName,
          lastName,
          jobPosition: jobPositionLanguagesTranslation[jobPosition],
          image,
          videoUrl: videoNode ? buildNodeUrl(videoNode) : undefined,
          currentNodeUrl: buildNodeUrl(currentNode),
        }}
      />
    );
  },
);
