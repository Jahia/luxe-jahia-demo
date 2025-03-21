import { Area, jahiaComponent } from "@jahia/javascript-modules-library";
import clsx from "clsx";

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

    const arrangement = currentResource.getModuleParams().get("arrangement");
    return (
      <div className={clsx("row", arrangement)}>
        {cols.map((col) => (
          <div key={col} className={clsx("col")}>
            <Area areaAsSubNode name={`${currentNode.getName()}-col-${col}`} />
          </div>
        ))}
      </div>
    );
  },
);
