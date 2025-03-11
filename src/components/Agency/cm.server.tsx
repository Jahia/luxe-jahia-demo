import { jahiaComponent, Render } from "@jahia/javascript-modules-library";
import { CMPreview } from "../../commons";

jahiaComponent(
  {
    nodeType: "luxe:agency",
    name: "cm",
    displayName: "jContent internal view",
    componentType: "view",
  },
  (_, { currentNode }) => (
    <CMPreview>
      <Render node={currentNode} view="fullPage" />
    </CMPreview>
  ),
);
