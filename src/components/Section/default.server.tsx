import {
	AddContentButtons,
	getChildNodes,
	jahiaComponent,
	Render,
} from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import { Section } from "~/commons";

export interface SectionProps {
	arrangement: "left" | "center" | "right";
}

jahiaComponent(
	{
		nodeType: "luxe:section",
		name: "default",
		componentType: "view",
	},
	({ arrangement = "center" }: SectionProps, { currentNode }) => {
		const sectionContents = getChildNodes(currentNode, 100);
		return (
			<Section>
				{sectionContents.map((content) => (
					<Render
						key={content.getIdentifier()}
						node={content as JCRNodeWrapper}
						parameters={{ arrangement }}
					/>
				))}
				<AddContentButtons />
			</Section>
		);
	},
);
