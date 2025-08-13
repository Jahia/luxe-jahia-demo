import type { JCRNodeWrapper } from "org.jahia.services.content";
import type { RenderContext } from "org.jahia.services.render";
import { buildNodeUrl, server } from "@jahia/javascript-modules-library";

/** Mobile-first config for responsive images */
export type ImageConfig = {
	/** Fallback <img src> width (px) */
	baseWidth: number;
	/** Optional target height (px) for resized renditions */
	height?: number;
	/** Optional responsive breakpoints for <picture> (desktop → tablet → …) */
	sources?: Array<{ media: string; width: number }>;
};

/** Props consumable by either <picture> (via .sources) or <img> (via .srcSet) */
export type ImageProps = {
	src: string; // <img src>
	alt: string; // <img alt>
	srcSet?: string; // <img srcSet="... 960w, ... 1920w">
	sources?: Array<{ media: string; srcSet: string }>; // <source media srcSet>
	width?: number; // intrinsic width for layout stability (rasters only)
	height?: number; // intrinsic height for layout stability (rasters only)
};

/** Detect vector image types */
const isVector = (mime: string) => mime.startsWith("image/svg") || mime.startsWith("image/vnd");

/** Read MIME and, if raster, intrinsic dimensions once */
const readNodeMeta = (node: JCRNodeWrapper) => {
	let mime = "";
	try {
		mime = node.getNode("jcr:content")?.getPropertyAsString("jcr:mimeType") ?? "";
	} catch {
		/* ignore */
	}

	// For vector formats, skip width/height entirely
	if (isVector(mime)) {
		return { mime };
	}

	let intrinsicWidth: number | undefined;
	let intrinsicHeight: number | undefined;

	try {
		const w = node.getProperty("j:width")?.getLong();
		if (Number.isFinite(w) && w > 0) intrinsicWidth = Number(w);
	} catch {
		/* ignore */
	}

	try {
		const h = node.getProperty("j:height")?.getLong();
		if (Number.isFinite(h) && h > 0) intrinsicHeight = Number(h);
	} catch {
		/* ignore */
	}

	return { mime, intrinsicWidth, intrinsicHeight };
};

/** Avoid upscaling by clamping requested width to intrinsic width (if known) */
const clampToIntrinsic = (requested: number, intrinsicWidth?: number) =>
	typeof intrinsicWidth === "number" && intrinsicWidth > 0
		? Math.min(requested, intrinsicWidth)
		: requested;

/** Build a sized URL; include height params only when provided */
const buildSizedUrl = (node: JCRNodeWrapper, width: number, height?: number) => {
	const parameters: Record<string, string> = { width: String(width), w: String(width) };
	if (height != null) {
		parameters.height = String(height);
		parameters.h = String(height);
	}
	return buildNodeUrl(node, { parameters });
};

/**
 * Convert a Jahia image node into props usable with both <picture> and <img>.
 * - Adds SSR cache dependency
 * - Skips resizing for vector formats (SVG, vnd/*) and does not return intrinsic dims for them
 * - Honors optional config.height and config.sources
 * - Returns intrinsic width/height only for raster images
 */
export function imageNodeToImageProps({
	imageNode,
	alt,
	renderContext,
	config,
}: {
	imageNode: JCRNodeWrapper;
	alt: string;
	renderContext: RenderContext;
	config: ImageConfig;
}): ImageProps {
	// Ensure SSR cache invalidation when this node changes
	server.render.addCacheDependency({ node: imageNode }, renderContext);

	// Read metadata once
	const { mime, intrinsicWidth, intrinsicHeight } = readNodeMeta(imageNode);

	// Vector: return plain URL; omit intrinsic width/height and responsive sources
	if (isVector(mime)) {
		return {
			src: buildNodeUrl(imageNode),
			alt,
		};
	}

	// Raster case
	const useHeight = config.height; // may be undefined → we won't add height params
	const safeBase = clampToIntrinsic(config.baseWidth, intrinsicWidth);

	// Optional <picture> sources
	const pictureSources = config.sources?.map(({ media, width }) => {
		const w = clampToIntrinsic(width, intrinsicWidth);
		return { media, srcSet: buildSizedUrl(imageNode, w, useHeight) };
	});

	// Optional <img> srcSet
	const imgSrcSet = config.sources
		?.map(({ width }) => {
			const w = clampToIntrinsic(width, intrinsicWidth);
			return `${buildSizedUrl(imageNode, w, useHeight)} ${w}w`;
		})
		.join(", ");

	return {
		src: buildSizedUrl(imageNode, safeBase, useHeight),
		alt,
		srcSet: imgSrcSet || undefined,
		sources: pictureSources || undefined,
		width: intrinsicWidth,
		height: intrinsicHeight,
	};
}
