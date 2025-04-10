import { buildNodeUrl, jahiaComponent, server } from "@jahia/javascript-modules-library";
import { Figure, Row } from "~/commons";
import type { HeaderProps } from "./types";
import classes from "./textDown.module.css";

jahiaComponent(
  {
    nodeType: "luxe:header",
    name: "textDown",
    displayName: "Image & Text Down",
    componentType: "view",
  },
  ({ title, subtitle, image: imageNode }: HeaderProps, { renderContext }) => {
    if (imageNode) {
      server.render.addCacheDependency({ node: imageNode }, renderContext);
    }

    return (
      <header className={classes.header}>
        {imageNode && (
          <Row>
            <Figure
              src={buildNodeUrl(imageNode)}
              alt={imageNode.getDisplayableName()}
              layout="imgFull"
            />
          </Row>
        )}

        <Row component="hgroup">
          <h1 className={classes.title}>{title}</h1>
          <p className={classes.hp}>{subtitle}</p>
        </Row>
      </header>
    );
  },
);
