import { jahiaComponent, Render } from "@jahia/javascript-modules-library";
import { Layout } from "~/pages/Layout";

// Content template for full-page rendering of all node types with the jmix:mainResource mixin.
// For example : luxe:realtor, luxe:agency ...
jahiaComponent(
  {
    nodeType: "jmix:mainResource",
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
