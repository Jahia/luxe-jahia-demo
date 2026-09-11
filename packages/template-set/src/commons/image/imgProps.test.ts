import { describe, expect, it, vi } from "vitest";
import type { JCRNodeWrapper } from "org.jahia.services.content";

// "@jahia/javascript-modules-library" is a virtual module only available at
// runtime inside Jahia. The mock reproduces both resize channels of the real
// buildNodeUrl:
// - `parameters` are appended as a query string (default provider — honored
//   by the Media Optimization/Cloudimage proxy, ignored by the file servlet);
// - `args` go through node.getUrl(["w:600", …]), which DAM decorators
//   (e.g. KeepeekDecorator) turn into a signed transformed URL.
vi.mock("@jahia/javascript-modules-library", () => ({
	buildNodeUrl: (
		node: { url: string; getUrl: (params: string[]) => string },
		config?: {
			parameters?: Record<string, string>;
			args?: Record<string, string | number | boolean>;
		},
	) => {
		if (config?.args) {
			return node.getUrl(Object.entries(config.args).map(([k, v]) => `${k}:${v}`));
		}
		return config?.parameters ? `${node.url}?${new URLSearchParams(config.parameters)}` : node.url;
	},
}));

import {
	clampToIntrinsic,
	DEFAULT_WIDTHS,
	imageNodeToImgProps,
	readNodeMeta,
	sizedUrl,
} from "./imgProps";

const fakeImageNode = ({
	url = "/files/img.jpg",
	name = "img.jpg",
	mime = "image/jpeg",
	width,
	height,
	defaultProvider = true,
}: {
	url?: string;
	name?: string;
	mime?: string;
	width?: number;
	height?: number;
	/** false emulates a DAM node (external provider mount, e.g. Keepeek) */
	defaultProvider?: boolean;
} = {}) =>
	({
		url,
		getProvider: () => ({ isDefault: () => defaultProvider }),
		// Emulates a DAM decorator: signed transformed URL built from the params
		getUrl: (params: string[]) => `${url}#signed(${params.join(",")})`,
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
		expect(sizedUrl(node, meta, 2000)).toBe("/files/img.jpg");
		expect(sizedUrl(node, meta, 3000)).toBe("/files/img.jpg"); // clamped to intrinsic
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

	it("honours custom widths", () => {
		const props = imageNodeToImgProps(fakeImageNode({ width: 2000, height: 1000 }), {
			widths: [200, 400],
		});
		// The base src is the first candidate
		expect(props.src).toBe("/files/img.jpg?w=200");
		// The 2000px original is far beyond 2×400: not a candidate
		expect(props.srcSet).toBe("/files/img.jpg?w=200 200w, /files/img.jpg?w=400 400w");
	});

	it("de-duplicates candidates that clamp to the same width", () => {
		const props = imageNodeToImgProps(fakeImageNode({ width: 650, height: 400 }), {
			widths: [600, 600, 700],
		});
		expect(props.srcSet).toBe("/files/img.jpg?w=600 600w, /files/img.jpg 650w");
	});

	it("routes resizes through node.getUrl(List) args for DAM provider nodes", () => {
		const node = fakeImageNode({
			url: "https://assets.keepeek.example/media.jpg",
			width: 8256,
			height: 5504,
			defaultProvider: false,
		});
		const props = imageNodeToImgProps(node, { widths: [600, 1200] });
		// Sized variants go through the decorator (signed URL), never ?w= query
		// params; the huge master (8256px >> 2×1200) is not a candidate
		expect(props.src).toBe("https://assets.keepeek.example/media.jpg#signed(w:600)");
		expect(props.srcSet).toBe(
			"https://assets.keepeek.example/media.jpg#signed(w:600) 600w, " +
				"https://assets.keepeek.example/media.jpg#signed(w:1200) 1200w",
		);
	});

	it("percent-encodes commas inside srcSet URLs (Cloudinary transformations)", () => {
		const node = {
			...fakeImageNode({
				url: "https://cdn.example/image/upload/v1/img.jpg",
				width: 1024,
				height: 500,
				defaultProvider: false,
			}),
			// Emulates CloudinaryDecorator: transformations joined with commas in the path
			getUrl: (params: string[]) =>
				`https://cdn.example/image/upload/f_auto,${params.join(",").replace(":", "_")}/v1/img.jpg`,
		} as unknown as JCRNodeWrapper;
		const props = imageNodeToImgProps(node, { widths: [600] });
		// src is a single URL: the raw comma is unambiguous there
		expect(props.src).toBe("https://cdn.example/image/upload/f_auto,w_600/v1/img.jpg");
		// srcSet entries must not contain raw commas (candidate separator +
		// Jahia's SrcSetURLReplacer splits on them)
		expect(props.srcSet).toBe(
			"https://cdn.example/image/upload/f_auto%2Cw_600/v1/img.jpg 600w, " +
				"https://cdn.example/image/upload/v1/img.jpg 1024w",
		);
	});

	it("keeps the smallest width when a DAM collapses several widths onto one rendition", () => {
		const node = {
			...fakeImageNode({
				url: "https://dam.example/photo.jpg",
				width: 2048,
				defaultProvider: false,
			}),
			// Emulates a fixed-rendition DAM: every requested width snaps to 320/1024/2048
			getUrl: (params: string[]) => {
				const w = Number(params[0].split(":")[1]);
				const rendition = [320, 1024, 2048].find((r) => r >= w) ?? 2048;
				return `https://dam.example/photo.jpg#rendition(${rendition})`;
			},
		} as unknown as JCRNodeWrapper;
		const props = imageNodeToImgProps(node, { widths: [600, 900] });
		// 600 and 900 both snap to the 1024 rendition: the descriptor must
		// under-claim (600w), so the browser climbs to a bigger candidate
		// instead of painting the 1024px rendition into a 900 CSS-px slot
		expect(props.srcSet).toBe("https://dam.example/photo.jpg#rendition(1024) 600w");
	});

	it("keeps the intrinsic width as a candidate only when close to the requested widths", () => {
		// 2000 <= 2×1536: the original is a useful top candidate
		expect(imageNodeToImgProps(fakeImageNode({ width: 2000, height: 1000 })).srcSet).toContain(
			"/files/img.jpg 2000w",
		);
		// 8256 > 2×1536: the master asset must never be served
		expect(imageNodeToImgProps(fakeImageNode({ width: 8256, height: 5504 })).srcSet).not.toContain(
			"8256w",
		);
	});

	it("defaults alt to the node displayable name and trims a custom alt", () => {
		expect(imageNodeToImgProps(fakeImageNode({ name: "photo.jpg" })).alt).toBe("photo.jpg");
		expect(imageNodeToImgProps(fakeImageNode(), { alt: "  hello  " }).alt).toBe("hello");
	});
});
