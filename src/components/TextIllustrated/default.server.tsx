import { buildModuleFileUrl, jahiaComponent, server } from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import { TextIllustrated } from "./TextIllustrated";

jahiaComponent(
  {
    nodeType: "luxe:textIllustrated",
    name: "default",
    componentType: "view",
  },
  (
    {
      title,
      text,
      image: imageNode,
      arrangement,
    }: { title: string; text: string; image: JCRNodeWrapper; arrangement: "left" | "right" },
    { renderContext },
  ) => {
    const image = {
      src: buildModuleFileUrl("static/img/img-placeholder.jpg"),
      alt: "placeholder",
    };

    if (imageNode) {
      image.src = imageNode.getUrl();
      image.alt = imageNode.getDisplayableName();

      server.render.addCacheDependency({ node: imageNode }, renderContext);
    }

    return (
      <TextIllustrated
        {...{
          title: title,
          text: text,
          arrangement: arrangement,
          image,
        }}
      />
    );
  },
);
