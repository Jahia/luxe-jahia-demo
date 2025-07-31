import { jahiaComponent } from "@jahia/javascript-modules-library";
import { Badge } from "design-system";

jahiaComponent(
	{
		nodeType: "jnt:category",
		name: "badge",
		displayName: "Badge",
		componentType: "view",
	},
	(props: { "jcr:title": string }) => <Badge>{props["jcr:title"]}</Badge>,
);
