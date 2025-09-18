import { buildNodeUrl, Island, jahiaComponent } from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import SearchEstateFormClient from "~/components/SearchEstate/SearchEstateForm.client.tsx";
import { Section } from "~/commons";
jahiaComponent(
	{
		nodeType: "luxe:searchEstate",
		name: "default",
		componentType: "view",
	},
	({ resultsPage, cssStyle }: { resultsPage: JCRNodeWrapper; cssStyle?: string }) => {
		return (
			<Section component="div" cssStyle={cssStyle}>
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
