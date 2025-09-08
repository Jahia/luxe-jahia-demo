import { buildNodeUrl, Island, jahiaComponent } from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import SearchEstateFormClient from "~/components/SearchEstate/SearchEstateForm.client.tsx";
import classes from "./default.module.css";
import { Section } from "~/commons";
jahiaComponent(
	{
		nodeType: "luxe:searchEstate",
		name: "default",
		componentType: "view",
	},
	({
		resultsPage,
		cssClassName,
	}: {
		resultsPage: JCRNodeWrapper;
		cssClassName?: string;
		cssStyle?: string;
	}) => {
		return (
			<Section component="div" className={cssClassName ? classes[cssClassName] : ""}>
				<Island
					component={SearchEstateFormClient}
					props={{
						target: resultsPage && buildNodeUrl(resultsPage),
						mode: "url",
					}}
				/>
			</Section>
		);
	},
);
