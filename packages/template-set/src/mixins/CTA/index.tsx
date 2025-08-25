import { buildNodeUrl } from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";

/* Type when `ctaType` is not set to `none`. */
type DefinedCTAProps =
	| {
			"ctaType": "internal";
			"j:linknode"?: JCRNodeWrapper;
			"j:url"?: never; // Can never be set when `ctaType` is external
			"j:linkTitle"?: never;
			"ctaLabel"?: string;
	  }
	| {
			"ctaType": "external";
			"j:linknode"?: never;
			"j:url"?: string;
			"j:linkTitle"?: string;
			"ctaLabel"?: string;
	  };

/** Props created by the `luxemix:cta` mixin. */
export type CTAProps = { ctaType: "none" } | DefinedCTAProps;

/** Renders a Call to Action (CTA) link. */
export function CTA(cta: DefinedCTAProps) {
	return (
		<a
			href={
				cta.ctaType === "internal"
					? cta["j:linknode"] && buildNodeUrl(cta["j:linknode"])
					: cta["j:url"]
			}
			title={cta["j:linkTitle"]}
		>
			{cta.ctaLabel || cta["j:linknode"]?.getPropertyAsString("jcr:title")}
		</a>
	);
}
