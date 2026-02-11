import { jahiaComponent } from "@jahia/javascript-modules-library";
import classes from "./default.module.css";

jahiaComponent(
	{
		nodeType: "luxe:skipLink",
		componentType: "view",
	},
	() => {
		return (
			<a href="#main" className={classes.skipLink}>Skip to content</a>
		);
	},
);
