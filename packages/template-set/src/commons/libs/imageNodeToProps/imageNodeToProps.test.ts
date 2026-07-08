import { describe, expect, it, vi } from "vitest";
import type { JCRNodeWrapper } from "org.jahia.services.content";

// "@jahia/javascript-modules-library" is a virtual module only available at
// runtime inside Jahia. The mock emulates a resize-capable URL builder so the
// srcSet machinery can be exercised (real Jahia file nodes currently ignore
// the args — see the image-architecture audit).
vi.mock("@jahia/javascript-modules-library", () => ({
	buildNodeUrl: (
		node: { url: string },
		config?: { args?: Record<string, string | number | boolean> },
	) =>
		config?.args
			? `${node.url}?${Object.entries(config.args)
					.map(([k, v]) => `${k}=${v}`)
					.join("&")}`
			: node.url,
}));

import { imageNodeToImgProps } from "./index";
import { clampToIntrinsic, readNodeMeta, sizedUrl } from "./meta";
import { DEFAULT_WIDTHS } from "./constants";

const fakeImageNode = ({
	url = "/files/img.jpg",
	name = "img.jpg",
	mime = "image/jpeg",
	width,
	height,
}: {
	url?: string;
	name?: string;
	mime?: string;
	width?: number;
	height?: number;
} = {}) =>
	({
		url,
		getDisplayableName: () => name,
		getNode: (child: string) =>
			child === "jcr:content"
				? { getPropertyAsString: (p: string) => (p === "jcr:mimeType" ? mime : "") }
				: null,
		getProperty: (prop: string) => {
			const value = prop === "j:width" ? width : prop === "j:height" ? height : undefined;
			// A JCR node throws PathNotFoundException on a missing property
			if (value == null) throw new Error(`no such property: ${prop}`);
			return { getLong: () => value };
		},
	}) as unknown as JCRNodeWrapper;

describe("clampToIntrinsic", () => {
	it("clamps a request larger than the intrinsic size", () => {
		expect(clampToIntrinsic(1200, 800)).toBe(800);
	});

	it("keeps a request smaller than the intrinsic size", () => {
		expect(clampToIntrinsic(400, 800)).toBe(400);
	});

	it("passes the request through when the intrinsic size is unknown", () => {
		expect(clampToIntrinsic(1200, undefined)).toBe(1200);
	});

	it("passes undefined through", () => {
		expect(clampToIntrinsic(undefined, 800)).toBeUndefined();
	});
});

describe("readNodeMeta", () => {
	it("flags vector images and skips dimension reads", () => {
		const meta = readNodeMeta(fakeImageNode({ mime: "image/svg+xml", width: 100 }));
		expect(meta).toEqual({ vector: true, intrinsicWidth: undefined, intrinsicHeight: undefined });
	});

	it("reads intrinsic dimensions of raster images", () => {
		const meta = readNodeMeta(fakeImageNode({ width: 2000, height: 1000 }));
		expect(meta).toEqual({ vector: false, intrinsicWidth: 2000, intrinsicHeight: 1000 });
	});

	it("tolerates missing dimension properties", () => {
		const meta = readNodeMeta(fakeImageNode());
		expect(meta).toEqual({ vector: false, intrinsicWidth: undefined, intrinsicHeight: undefined });
	});
});

describe("sizedUrl", () => {
	const node = fakeImageNode({ width: 2000, height: 1000 });
	const meta = readNodeMeta(node);

	it("emits a resize param for a downsize", () => {
		expect(sizedUrl(node, meta, 600)).toBe("/files/img.jpg?w=600");
	});

	it("returns the original URL when the resize is a no-op", () => {
		expect(sizedUrl(node, meta)).toBe("/files/img.jpg");
		expect(sizedUrl(node, meta, 2000)).toBe("/files/img.jpg");
		expect(sizedUrl(node, meta, 3000)).toBe("/files/img.jpg"); // clamped to intrinsic
	});

	it("emits both width and height params", () => {
		expect(sizedUrl(node, meta, 600, 300)).toBe("/files/img.jpg?w=600&h=300");
	});

	it("drops only the no-op axis", () => {
		expect(sizedUrl(node, meta, 2000, 300)).toBe("/files/img.jpg?h=300");
	});
});

describe("imageNodeToImgProps", () => {
	it("returns the original URL without srcSet for vector images", () => {
		const props = imageNodeToImgProps(
			fakeImageNode({ url: "/files/logo.svg", name: "logo.svg", mime: "image/svg+xml" }),
		);
		expect(props).toEqual({ src: "/files/logo.svg", alt: "logo.svg" });
	});

	it("builds a srcSet from the default widths plus the intrinsic width", () => {
		const props = imageNodeToImgProps(fakeImageNode({ width: 2000, height: 1000 }));
		expect(props.src).toBe(`/files/img.jpg?w=${DEFAULT_WIDTHS[0]}`);
		expect(props.srcSet).toBe(
			"/files/img.jpg?w=600 600w, /files/img.jpg?w=900 900w, /files/img.jpg?w=1200 1200w, /files/img.jpg?w=1536 1536w, /files/img.jpg 2000w",
		);
		expect(props.width).toBe(2000);
		expect(props.height).toBe(1000);
	});

	it("collapses all candidates into one entry when the image is small", () => {
		const props = imageNodeToImgProps(fakeImageNode({ width: 500, height: 250 }));
		// Every candidate clamps to the intrinsic width -> single original URL
		expect(props.src).toBe("/files/img.jpg");
		expect(props.srcSet).toBe("/files/img.jpg 500w");
	});

	it("omits intrinsic data when dimensions are unknown", () => {
		const props = imageNodeToImgProps(fakeImageNode());
		expect(props.src).toBe("/files/img.jpg?w=600");
		expect(props.srcSet).toBe(
			"/files/img.jpg?w=600 600w, /files/img.jpg?w=900 900w, /files/img.jpg?w=1200 1200w, /files/img.jpg?w=1536 1536w",
		);
		expect(props.width).toBeUndefined();
		expect(props.height).toBeUndefined();
	});

	it("honours custom widths and baseWidth", () => {
		const props = imageNodeToImgProps(fakeImageNode({ width: 2000, height: 1000 }), {
			widths: [200, 400],
			baseWidth: 400,
		});
		expect(props.src).toBe("/files/img.jpg?w=400");
		expect(props.srcSet).toBe(
			"/files/img.jpg?w=200 200w, /files/img.jpg?w=400 400w, /files/img.jpg 2000w",
		);
	});

	it("de-duplicates candidates that clamp to the same width", () => {
		const props = imageNodeToImgProps(fakeImageNode({ width: 650, height: 400 }), {
			widths: [600, 600, 700],
		});
		expect(props.srcSet).toBe("/files/img.jpg?w=600 600w, /files/img.jpg 650w");
	});

	it("defaults alt to the node displayable name and trims a custom alt", () => {
		expect(imageNodeToImgProps(fakeImageNode({ name: "photo.jpg" })).alt).toBe("photo.jpg");
		expect(imageNodeToImgProps(fakeImageNode(), { alt: "  hello  " }).alt).toBe("hello");
	});
});
