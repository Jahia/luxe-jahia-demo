import { Area, jahiaComponent } from "@jahia/javascript-modules-library";
import { MainLayout } from "../../layouts";

jahiaComponent(
  {
    nodeType: "jnt:page",
    name: "free",
    displayName: "Free Design",
    componentType: "template",
  },
  () => {
    return (
      <MainLayout>
        <Area name="main" />
      </MainLayout>
    );
  },
);
