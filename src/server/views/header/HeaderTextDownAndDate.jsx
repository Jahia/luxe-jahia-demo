import React from "react";
import {
  useServerContext,
  getNodeProps,
  server,
  defineJahiaComponent,
} from "@jahia/javascript-modules-library";
import { Figure, Row } from "../../components";

export const HeaderTextDownAndDate = () => {
  const { currentNode, renderContext } = useServerContext();
  const header = getNodeProps(currentNode, ["title", "teaser", "image", "date"]);

  if (header.image) {
    server.render.addCacheDependency({ node: header.image }, renderContext);
  }

  const date =
    new Date(header?.date).toLocaleDateString(currentNode.getLanguage(), {
      // Weekday: 'long',
      year: "numeric",
      month: "long",
      day: "numeric",
    }) || null;

  return (
    <header className="container py-4 py-md-5 mb-5">
      {header.image && (
        <Row>
          <Figure
            src={header.image.getUrl()}
            alt={header.image.getDisplayableName()}
            layout="imgFull"
          />
        </Row>
      )}
      <hgroup className="row text-center">
        {date && (
          <time className="fs-6" dateTime={header.date}>
            {date}
          </time>
        )}
        <h1 className="display-1 mb-0">{header.title}</h1>
        <p className="h2 mt-0">{header.teaser}</p>
      </hgroup>
    </header>
  );
};

HeaderTextDownAndDate.jahiaComponent = defineJahiaComponent({
  nodeType: "luxe:header",
  name: "textDownAndDate",
  componentType: "view",
});
