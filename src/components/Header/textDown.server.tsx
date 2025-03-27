import { buildNodeUrl, jahiaComponent, server } from "@jahia/javascript-modules-library";
import { Figure, Row } from "~/commons";
import type { HeaderProps } from "./types";

jahiaComponent(
  {
    nodeType: "luxe:header",
    name: "textDown",
    displayName: "Image & Text Down",
    componentType: "view",
  },
  ({ title, subtitle, image }: HeaderProps, { renderContext }) => {
    if (image) {
      server.render.addCacheDependency({ node: image }, renderContext);
    }

    return (
      <header className="container py-4 py-md-5 mb-5">
        {image && (
          <Row>
            <Figure src={buildNodeUrl(image)} alt={image.getDisplayableName()} layout="imgFull" />
          </Row>
        )}

        <hgroup className="row text-center">
          <h1 className="display-1 mb-0">{title}</h1>
          <p className="h2 mt-0">{subtitle}</p>
        </hgroup>
      </header>
    );
  },
);
