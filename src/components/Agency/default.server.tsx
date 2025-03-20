import { jahiaComponent, server, useUrlBuilder } from "@jahia/javascript-modules-library";
import { t } from "i18next";
import type { AgencyProps } from "./types";
import classes from "./default.module.css";

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
      <a className={classes.card} href={currentNode.getUrl()}>
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
