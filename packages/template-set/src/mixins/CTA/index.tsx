import { getNodeProps, JLink } from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";

/** Props created by the `luxemix:cta` mixin, as a view receives them. */
export type CTAProps = {
	/** `undefined` on content that predates the mixin. */
	ctaType?: "none" | "internal" | "external";
};

/**
 * Renders the call to action carried by `luxemix:cta`.
 *
 * The mixin is `j:linkType` under another name — `ctaType` instead of the property the Jahia/default
 * module uses, and `ctaLabel` instead of `jcr:title`, which on the host node is the heading. Both
 * are parameters of the platform resolver, so the mapping is these three props.
 */
export function CTA({ node }: { node: JCRNodeWrapper }) {
	// `j:linkTitle` is a label candidate to the resolver, never the title attribute, and there is no
	// property to name for that one: the external link's tooltip is read here
	const { "j:linkTitle": linkTitle } = getNodeProps<{ "j:linkTitle"?: string }>(node, [
		"j:linkTitle",
	]);

	return (
		<JLink
			content={node}
			typeProperty="ctaType"
			// The mixin only ever carries `j:linknode`; `j:node` belongs to core's own link types
			referenceProperties={["j:linknode"]}
			// The host node's jcr:title is its heading, not the label of the link on it
			labelProperties={["ctaLabel"]}
			title={linkTitle}
		/>
	);
}
