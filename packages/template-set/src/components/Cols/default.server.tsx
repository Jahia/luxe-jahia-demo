import { AbsoluteArea, jahiaComponent } from "@jahia/javascript-modules-library";
import classes from "./default.module.css";
import type { SectionProps } from "~/components/Section/default.server";
import { Col, Row } from "design-system";

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
		const cols = Array.from({ length: limit }, (_, i) => i);

		const arrangement = currentResource
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
