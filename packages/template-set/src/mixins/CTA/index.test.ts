import { describe, expect, it, vi } from "vitest";
import type { JCRNodeWrapper } from "org.jahia.services.content";

// "@jahia/javascript-modules-library" is a virtual module only available at runtime inside Jahia.
// Resolving a link is the library's job and is tested there; what belongs to luxe is the mapping
// from the `luxemix:cta` vocabulary onto the resolver's parameters, so <JLink> is replaced by a
// capture of the props it is given: CTA returns the <JLink> element, whose props are the mapping.
vi.mock("@jahia/javascript-modules-library", () => ({
	JLink: () => null,
	getNodeProps: (node: { properties?: Record<string, string> }, props: string[]) =>
		Object.fromEntries(props.map((name) => [name, node.properties?.[name]])),
}));

import type { ReactElement } from "react";
import { CTA } from "./index";

const ctaNode = (properties: Record<string, string> = {}) =>
	({ properties }) as unknown as JCRNodeWrapper;

/** The props CTA hands to <JLink>. */
const propsOf = (node: JCRNodeWrapper) =>
	(CTA({ node }) as ReactElement<Record<string, unknown>>).props;

describe("CTA — the luxemix:cta vocabulary", () => {
	it("names ctaType as the discriminator, so 'none' means no link", () => {
		expect(propsOf(ctaNode())).toMatchObject({ typeProperty: "ctaType" });
	});

	it("reads the internal target from j:linknode only", () => {
		// `j:node` is core's own jnt:nodeLink property and never appears on this mixin: reading it
		// would resolve a reference the mixin does not define
		expect(propsOf(ctaNode())).toMatchObject({ referenceProperties: ["j:linknode"] });
	});

	it("takes the label from ctaLabel, not from the host node's heading", () => {
		// jcr:title on a luxe:textIllustrated is the section heading, not the link text
		expect(propsOf(ctaNode())).toMatchObject({ labelProperties: ["ctaLabel"] });
	});

	it("passes the node itself, so the resolver reads the properties off it", () => {
		const node = ctaNode();
		expect(propsOf(node)).toMatchObject({ content: node });
	});

	it("carries j:linkTitle over as the anchor title", () => {
		expect(propsOf(ctaNode({ "j:linkTitle": "Example" }))).toMatchObject({ title: "Example" });
	});

	it("omits the title when the external link has none", () => {
		expect(propsOf(ctaNode()).title).toBeUndefined();
	});
});
