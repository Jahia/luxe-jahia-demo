import type { JCRNodeWrapper } from "org.jahia.services.content";
import { buildNodeUrl } from "@jahia/javascript-modules-library";

export type ImageMeta = {
	vector: boolean;
	intrinsicWidth?: number;
	intrinsicHeight?: number;
};

/** Read mime + (if raster) intrinsic dimensions; tolerate missing props */
export const readNodeMeta = (node: JCRNodeWrapper): ImageMeta => {
	let vector = false;
	let intrinsicWidth: number | undefined;
	let intrinsicHeight: number | undefined;
	try {
		const mime = node.getNode("jcr:content")?.getPropertyAsString("jcr:mimeType") ?? "";
		vector = mime.startsWith("image/svg") || mime.startsWith("image/vnd");
	} catch {
		// Ignore errors
	}
	if (!vector) {
		try {
			const w = node.getProperty("j:width")?.getLong();
			if (w > 0) intrinsicWidth = Number(w);
		} catch {
			// Ignore errors
		}
		try {
			const h = node.getProperty("j:height")?.getLong();
			if (h > 0) intrinsicHeight = Number(h);
		} catch {
			// Ignore errors
		}
	}
	return { vector, intrinsicWidth, intrinsicHeight };
};

/** Never request a value larger than the intrinsic size (if known) */
export const clampToIntrinsic = (requested: number | undefined, intrinsic?: number) =>
	typeof requested === "number" && requested > 0 && typeof intrinsic === "number" && intrinsic > 0
		? Math.min(requested, intrinsic)
		: requested;

/**
 * Build the node URL, resized to the requested dimensions.
 * Requested values are clamped to the intrinsic size; an axis that is not
 * requested, or that ends up matching the intrinsic size, emits no resize
 * param — so a no-op resize returns the original URL.
 */
export const sizedUrl = (
	node: JCRNodeWrapper,
	meta: ImageMeta,
	requestedWidth?: number,
	requestedHeight?: number,
) => {
	const w = clampToIntrinsic(requestedWidth, meta.intrinsicWidth);
	const h = clampToIntrinsic(requestedHeight, meta.intrinsicHeight);
	const args = {
		...(w != null && w !== meta.intrinsicWidth && { w }),
		...(h != null && h !== meta.intrinsicHeight && { h }),
	};
	return buildNodeUrl(node, Object.keys(args).length > 0 ? { args } : undefined);
};
