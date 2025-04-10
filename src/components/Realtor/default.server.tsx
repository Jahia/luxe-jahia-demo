import {
  buildModuleFileUrl,
  buildNodeUrl,
  jahiaComponent,
  server,
} from "@jahia/javascript-modules-library";
import { t } from "i18next";
import type { RealtorProps } from "./types.js";
import classes from "./default.module.css";

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

    const jobPositionLanguagesTranslation = {
      junior: t("realtor.jobPosition.junior"),
      senior: t("realtor.jobPosition.senior"),
      director: t("realtor.jobPosition.director"),
    };

    return (
      <a href={buildNodeUrl(currentNode)} className={classes.card}>
        <img src={image.src} alt={image.alt} width="250px" height="250px" />
        <div className={classes.main}>
          <h4>
            {firstName} {lastName}
          </h4>
          <p className={classes.jobPosition}>{jobPositionLanguagesTranslation[jobPosition]}</p>
        </div>
      </a>
    );
  },
);
