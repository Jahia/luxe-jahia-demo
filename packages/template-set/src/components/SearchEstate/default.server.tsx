import {
	getLinkProps,
	Island,
	jahiaComponent,
	useServerContext,
} from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import SearchEstateFormClient from "./SearchEstateForm.client.tsx";
import { Section } from "design-system";

jahiaComponent(
	{
		componentType: "view",
		nodeType: "luxe:searchEstate",
	},
	({ resultsPage, cssStyle }: { resultsPage?: JCRNodeWrapper; cssStyle?: string }) => {
		// A form action is not an anchor, so only the URL of the link is taken — the rest of the
		// anchor props has nowhere to go on a <form>
		const { anchor } = getLinkProps(resultsPage, {}, useServerContext());

		return (
			<Section component="div" cssStyle={cssStyle}>
				<Island
					component={SearchEstateFormClient}
					props={{
						action: anchor.href,
					}}
				/>
			</Section>
		);
	},
);
