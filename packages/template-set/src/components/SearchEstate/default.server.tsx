import { buildNodeUrl, Island, jahiaComponent } from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import SearchEstateFormClient from "~/components/SearchEstate/SearchEstateForm.client.tsx";

jahiaComponent(
	{
		nodeType: "luxe:searchEstate",
		name: "default",
		componentType: "view",
	},
	({ resultsPage }: { resultsPage: JCRNodeWrapper }) => {
		return (
			<Island
				component={SearchEstateFormClient}
				props={{ target: resultsPage && buildNodeUrl(resultsPage), mode: "url" }}
			/>
		);
	},
);
