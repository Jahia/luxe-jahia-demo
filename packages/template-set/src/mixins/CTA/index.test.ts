import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { JCRNodeWrapper } from "org.jahia.services.content";

// "@jahia/javascript-modules-library" is a virtual module only available at
// runtime inside Jahia: mock the three APIs the CTA uses. The vite pipeline
// does not transform JSX in test files, so the component is invoked as a
// plain function (its useServerContext "hook" is mocked away).
const addCacheDependency = vi.fn();
vi.mock("@jahia/javascript-modules-library", () => ({
	buildNodeUrl: (node: { url: string }) => node.url,
	// Not a real hook factory: this is the vi.mock replacement of the library
	// eslint-disable-next-line @eslint-react/component-hook-factories
	useServerContext: () => ({ renderContext: {} }),
	server: { render: { addCacheDependency: (...args: unknown[]) => addCacheDependency(...args) } },
}));

import { CTA } from "./index";

type CTARenderProps = Parameters<typeof CTA>[0];

const render = (props: CTARenderProps) => renderToStaticMarkup(CTA(props));

const fakePageNode = ({ url = "/cms/render/live/en/sites/luxe/home/buy.html", title = "Buy" } = {}) =>
	({
		url,
		getPropertyAsString: (prop: string) => (prop === "jcr:title" ? title : ""),
	}) as unknown as JCRNodeWrapper;

describe("CTA — internal link", () => {
	it("builds the href from the linked node and uses the explicit label", () => {
		const html = render({
			"ctaType": "internal",
			"j:linknode": fakePageNode(),
			"ctaLabel": "See the offers",
		});
		expect(html).toBe('<a href="/cms/render/live/en/sites/luxe/home/buy.html">See the offers</a>');
	});

	it("falls back to the linked page title when no label is set", () => {
		const html = render({ "ctaType": "internal", "j:linknode": fakePageNode({ title: "Buy" }) });
		expect(html).toContain(">Buy</a>");
	});

	it("registers a cache dependency on the linked node", () => {
		addCacheDependency.mockClear();
		const node = fakePageNode();
		render({ "ctaType": "internal", "j:linknode": node, "ctaLabel": "Go" });
		expect(addCacheDependency).toHaveBeenCalledWith({ node }, {});
	});

	it("renders no href and no cache dependency when the linked node is missing (dangling ref)", () => {
		addCacheDependency.mockClear();
		const html = render({ ctaType: "internal", ctaLabel: "Broken" });
		expect(html).toBe("<a>Broken</a>");
		expect(addCacheDependency).not.toHaveBeenCalled();
	});
});

describe("CTA — external link", () => {
	it("uses the contributed URL and link title", () => {
		const html = render({
			"ctaType": "external",
			"j:url": "https://example.com",
			"j:linkTitle": "Example",
			"ctaLabel": "Visit",
		});
		expect(html).toBe('<a href="https://example.com" title="Example">Visit</a>');
	});

	it("renders the label even without a URL", () => {
		const html = render({ ctaType: "external", ctaLabel: "No URL" });
		expect(html).toBe("<a>No URL</a>");
	});
});
