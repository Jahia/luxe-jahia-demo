import { jahiaComponent, Render } from "@jahia/javascript-modules-library";
import { Layout } from "~/pages/Layout";

// Content template to render a BlogPost in full page
jahiaComponent(
  {
    nodeType: "luxe:blogPost",
    name: "default",
    componentType: "template",
  },
  (_, { currentNode }) => {
    return (
      <Layout>
        <Render node={currentNode} view="fullPage" />
      </Layout>
    );
  },
);
