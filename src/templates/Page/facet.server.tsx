import { Area, jahiaComponent, Render } from "@jahia/javascript-modules-library";
import { Layout } from "../Layout";
import classes from "./centered.module.css";
import { Col, Row, Section } from "~/commons";

jahiaComponent(
  {
    nodeType: "jnt:page",
    name: "facet",
    displayName: "Facet to filter real estate",
    componentType: "template",
  },
  () => {
    return (
      <Layout className={classes.main}>
        <Area name="header" allowedNodeTypes={["luxe:header"]} numberOfItems={1} />
        {/*<Section>*/}
        {/*  <Row>*/}
        {/*    <Col></Col>*/}
        {/*    <Col></Col>*/}
        {/*  </Row>*/}
        {/*</Section>*/}
        <Area name="main" />
      </Layout>
    );
  },
);
