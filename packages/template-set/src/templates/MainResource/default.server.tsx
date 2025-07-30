import { jahiaComponent, Render } from "@jahia/javascript-modules-library";
import { Layout } from "~/templates/Layout";

// Content template for full-page rendering of all node types with the jmix:mainResource mixin.
// For example : luxe:realtor, luxe:agency ...
// Note : if needed, you can also create a dedicated template for these content types.
jahiaComponent(
	{
		nodeType: "jmix:mainResource",
		name: "default",
		componentType: "template",
	},
	(_, { currentNode }) => {
		return (
			<Layout>
				<Render node={currentNode} view="fullPage" />
			</Layout>
		);
	},
);
