import {
  buildModuleFileUrl,
  buildNodeUrl,
  jahiaComponent,
  server,
} from "@jahia/javascript-modules-library";
import { t } from "i18next";
import type { AgencyProps } from "./types";
import classes from "./default.module.css";
import placeholder from "/static/img/agency-placeholder.jpg";

jahiaComponent(
  {
    nodeType: "luxe:agency",
    name: "default",
    componentType: "view",
  },
  ({ name, address, phone, image: imageNode }: AgencyProps, { currentNode, renderContext }) => {
    const image = {
      src: buildModuleFileUrl(placeholder),
      alt: "Placeholder",
    };

    if (imageNode) {
      image.src = buildNodeUrl(imageNode);
      image.alt = t("alt.agency", { agency: name });

      server.render.addCacheDependency({ node: imageNode }, renderContext);
    }

    return (
      <a className={classes.card} href={buildNodeUrl(currentNode)}>
        <img className={classes.image} src={image.src} alt={image.alt} width="200" height="200" />

        <div className={classes.main}>
          <h2 className={classes.title}>{name}</h2>
          {address && <p>{address}</p>}
          {phone && <p>{phone}</p>}
        </div>
      </a>
    );
  },
);
