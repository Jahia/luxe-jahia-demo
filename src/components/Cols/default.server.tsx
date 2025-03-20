import { Area, jahiaComponent } from "@jahia/javascript-modules-library";
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

    // @ts-expect-error getModuleParams() is not available in currentResource
    const arrangement: SectionProps = currentResource.getModuleParams().get("arrangement");
    return (
      // @ts-expect-error arrangement is the appropriate type but maybe need a better cast...
      <Row className={classes[arrangement]}>
        {cols.map((col) => (
          <Col key={col}>
            <Area areaAsSubNode name={`${currentNode.getName()}-col-${col}`} />
          </Col>
        ))}
      </Row>
    );
  },
);
