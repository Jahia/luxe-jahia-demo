import { Area, jahiaComponent } from "@jahia/javascript-modules-library";
import { Layout } from "../Layout";

jahiaComponent(
  {
    nodeType: "jnt:page",
    name: "centered",
    displayName: "Centered Header & Main ",
    componentType: "template",
  },
  () => {
    return (
      <Layout className="lux-centeredLayout">
        <Area name="header" allowedTypes={["luxe:header"]} numberOfItems={1} />
        <Area name="main" />
      </Layout>
    );
  },
);
