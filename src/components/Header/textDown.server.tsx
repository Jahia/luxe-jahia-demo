import { jahiaComponent, server } from "@jahia/javascript-modules-library";
import { Figure, Row } from "../_commons";
import { HeaderProps } from "./types";

jahiaComponent(
  {
    nodeType: "luxe:Heading",
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
            <Figure src={image.getUrl()} alt={image.getDisplayableName()} layout="imgFull" />
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
