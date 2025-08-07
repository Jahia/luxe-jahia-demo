import { jahiaComponent, Render } from "@jahia/javascript-modules-library";
import { Layout } from "~/templates/Layout";

// Content template for full-page rendering of all node types with the jmix:mainResource mixin.
// (e.g. luxe:realtor, luxe:agency...)
// It is expected that all node types with the jmix:mainResource mixin have a view named `fullPage`.
// This naming convention is rather new, if you intend to be compatible with JSP views, ensure
// that the naming convention between your full-page views is the same across your whole ecosystem.
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
