import { Area, jahiaComponent } from "@jahia/javascript-modules-library";
import { Layout } from "../Layout";
import classes from "./centered.module.css";

jahiaComponent(
  {
    nodeType: "jnt:page",
    name: "centered",
    displayName: "Centered Header & Main ",
    componentType: "template",
  },
  () => {
    return (
      <Layout className={classes.main}>
        <Area name="header" allowedNodeTypes={["luxe:header"]} numberOfItems={1} />
        <Area name="main" />
      </Layout>
    );
  },
);
