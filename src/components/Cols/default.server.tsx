import { AbsoluteArea, jahiaComponent } from "@jahia/javascript-modules-library";
import { Col, Row } from "~/commons";
import classes from "./default.module.css";
import type { SectionProps } from "~/components/Section/default.server";

jahiaComponent(
  {
    nodeType: "luxe:cols",
    name: "default",
    componentType: "view",
  },
  ({ colsNumber }: { colsNumber: string }, { currentNode, currentResource }) => {
    const iColsNumber = Number(colsNumber);
    const limit = isNaN(iColsNumber) ? 1 : iColsNumber;
    // Create an array of integers from 0 to 'limit - 1'
    const cols = Array.from(Array(limit).keys());

    const arrangement: SectionProps["arrangement"] = currentResource
      .getModuleParams()
      .get("arrangement") as SectionProps["arrangement"];

    return (
      <Row className={classes[arrangement]}>
        {cols.map((col) => (
          <Col key={col}>
            <AbsoluteArea parent={currentNode} name={`${currentNode.getName()}-col-${col}`} />
          </Col>
        ))}
      </Row>
    );
  },
);
