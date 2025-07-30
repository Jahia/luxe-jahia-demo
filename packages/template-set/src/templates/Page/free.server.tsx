import { Area, jahiaComponent } from "@jahia/javascript-modules-library";
import { Layout } from "../Layout";

jahiaComponent(
	{
		nodeType: "jnt:page",
		name: "free",
		displayName: "Free Design",
		componentType: "template",
	},
	() => {
		return (
			<Layout>
				<Area name="main" />
			</Layout>
		);
	},
);
