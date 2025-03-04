import { jahiaComponent, server } from "@jahia/javascript-modules-library";
import { Figure, PageTitle, Row } from "../../components";
import { headerTypes } from "./types.js";

jahiaComponent(
  {
    nodeType: "luxe:header",
    name: "textUp",
    displayName: "Image & Text Up",
    componentType: "view",
  },
  ({ title, subtitle, image }: headerTypes, { renderContext }) => {
    if (image) {
      server.render.addCacheDependency({ node: image }, renderContext);
    }

    return (
      <header className="container d-flex flex-column py-2 py-md-4 gap-3">
        <Row>
          <PageTitle title={title} description={subtitle} />
        </Row>
        {image && (
          <Row>
            <Figure src={image.getUrl()} alt={image.getDisplayableName()} layout="imgFull" />
          </Row>
        )}
      </header>
    );
  },
);
