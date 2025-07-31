import { jahiaComponent } from "@jahia/javascript-modules-library";
import { HighlightNumber } from "design-system";

jahiaComponent(
	{
		nodeType: "luxe:highlightNumber",
		displayName: "Default",
		componentType: "view",
	},
	({ text, number }: { text: string; number: bigint }, { currentResource }) => {
		const locale = currentResource.getLocale().getLanguage();
		return <HighlightNumber big={number.toLocaleString(locale)} small={text} />;
	},
);
