import { jahiaComponent } from "@jahia/javascript-modules-library";
import classes from "./default.module.css";
jahiaComponent(
	{
		nodeType: "luxe:highlightNumber",
		displayName: "Default",
		componentType: "view",
	},
	({ text, number }: { text: string; number: bigint }, { currentResource }) => {
		const locale = currentResource.getLocale().getLanguage();
		return (
			<div className={classes.main}>
				<h4>{number.toLocaleString(locale)}</h4>
				<p>{text}</p>
			</div>
		);
	},
);
