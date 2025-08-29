import { buildNodeUrl, HydrateInBrowser, jahiaComponent } from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import SearchEstateFormClient from "~/components/SearchEstate/SearchEstateForm.client.tsx";

jahiaComponent(
	{
		nodeType: "luxe:searchEstate",
		name: "default",
		componentType: "view",
	},
	({ resultsPage }: { resultsPage: JCRNodeWrapper }, { renderContext }) => {
		// const params = renderContext.getRequest().getParameterMap();
		return (
			<HydrateInBrowser
				child={SearchEstateFormClient}
				props={{ target: resultsPage && buildNodeUrl(resultsPage) }}
			/>
		);
	},
);
