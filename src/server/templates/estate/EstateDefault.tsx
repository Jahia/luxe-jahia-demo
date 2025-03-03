import { jahiaComponent, Render } from "@jahia/javascript-modules-library";
import { MainLayout } from "../../layouts";

jahiaComponent(
  {
    nodeType: "luxe:estate",
    name: "default",
    componentType: "template",
  },
  (_, { currentNode }) => {
    return (
      <MainLayout>
        <Render node={currentNode} view="fullPage" />
      </MainLayout>
    );
  },
);
