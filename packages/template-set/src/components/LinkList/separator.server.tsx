import { Fragment } from "react";
import {
	AddContentButtons,
	getChildNodes,
	jahiaComponent,
	JLink,
} from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";

jahiaComponent(
	{
		nodeType: "jnt:linkList",
		name: "separator",
		displayName: "Use Separator",
		componentType: "view",
	},
	(_, { currentNode }) => {
		const links = getChildNodes(
			currentNode,
			-1,
			0,
			(child) =>
				(child as JCRNodeWrapper).getPrimaryNodeTypeName() === "jnt:nodeLink" ||
				(child as JCRNodeWrapper).getPrimaryNodeTypeName() === "jnt:externalLink",
		);

		return (
			<>
				{links.map((node, index) => (
					<Fragment key={node.getIdentifier()}>
						{index > 0 && <span> / </span>}
						{/* Both node types are what the resolver reads by default: `j:node` for
						    jnt:nodeLink, `j:url` for jnt:externalLink, jcr:title / j:linkTitle for
						    the label, and `j:target` for the anchor target. */}
						<JLink content={node as JCRNodeWrapper} />
					</Fragment>
				))}
				<AddContentButtons />
			</>
		);
	},
);
