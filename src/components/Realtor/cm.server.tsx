import { jahiaComponent, Render } from "@jahia/javascript-modules-library";
import { CMPreview } from "~/templates/CMPreview";

jahiaComponent(
	{
		nodeType: "luxe:realtor",
		name: "cm",
		displayName: "jContent internal view",
		componentType: "view",
	},
	(_, { currentNode }) => (
		<CMPreview>
			<Render node={currentNode} view="fullPage" />
		</CMPreview>
	),
);
