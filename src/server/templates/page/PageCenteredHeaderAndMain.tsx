import { Area, jahiaComponent } from "@jahia/javascript-modules-library";
import { MainLayout } from "../../layouts";

jahiaComponent(
  {
    nodeType: "jnt:page",
    name: "centered",
    displayName: "Centered Header & Main ",
    componentType: "template",
  },
  () => {
    return (
      <MainLayout className="lux-centeredLayout">
        <Area name="header" allowedTypes={["luxe:header"]} numberOfItems={1} />
        <Area name="main" />
      </MainLayout>
    );
  },
);
