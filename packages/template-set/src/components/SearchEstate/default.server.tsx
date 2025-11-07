import { buildNodeUrl, Island, jahiaComponent } from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import SearchEstateFormClient from "./SearchEstateForm.client.tsx";
import { Section } from "design-system";

jahiaComponent(
	{
		componentType: "view",
		nodeType: "luxe:searchEstate",
	},
	({ resultsPage, cssStyle }: { resultsPage?: JCRNodeWrapper; cssStyle?: string }) => {
		return (
			<Section component="div" cssStyle={cssStyle}>
				<Island
					component={SearchEstateFormClient}
					props={{
						action: resultsPage && buildNodeUrl(resultsPage),
					}}
				/>
			</Section>
		);
	},
);
