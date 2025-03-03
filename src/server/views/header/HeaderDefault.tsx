import { jahiaComponent, server } from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";

jahiaComponent(
  {
    nodeType: "luxe:header",
    name: "default",
    componentType: "view",
  },
  ({ title, image }: {title : string, image : JCRNodeWrapper}, { renderContext}) => {
    if (image) {
      server.render.addCacheDependency({ node: image }, renderContext);
    }

    return (
      <section className="lux-cover">
        {/* If you use one of our external DAM plugins, you can specify the image width or height
            to enable live image resizing performed by the DAM provider. */}
        {image && (
          <picture>
            <source
              media="(min-width: 960px)"
              srcSet={`${image.getUrl(["width:1920"])}?w=1920&h=695`}
            />
            <source
              media="(min-width: 480px)"
              srcSet={`${image.getUrl(["width:960"])}?w=960&h=695`}
            />
            <img
              src={`${image.getUrl(["width:480"])}?w=480&h=695`}
              alt={image.getDisplayableName()}
              className="lux-cover_img"
              height="695px"
            />
          </picture>
        )}

        <h1 className="lux-cover_caption">{title}</h1>
      </section>
    );
  },
);
