import type { JCRNodeWrapper } from "org.jahia.services.content";
import { buildNodeUrl } from "@jahia/javascript-modules-library";

/** Read mime + (if raster) intrinsic dimensions; tolerate missing props */
export const readNodeMeta = (node: JCRNodeWrapper) => {
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

/** Return original URL when resize is a no-op */
export const sizedUrlOrOriginal = (
	node: JCRNodeWrapper,
	requestedW?: number,
	intrinsicW?: number,
	requestedH?: number,
	intrinsicH?: number,
) => {
	const sameW = requestedW != null && intrinsicW != null && requestedW === intrinsicW;
	const sameH = requestedH != null && intrinsicH != null && requestedH === intrinsicH;
	const noParams = requestedW == null && requestedH == null;
	const allNoop = (requestedW == null || sameW) && (requestedH == null || sameH);

	return buildNodeUrl(
		node,
		noParams || allNoop
			? undefined
			: {
					parameters: {
						...(requestedW != null && { w: String(requestedW) }),
						...(requestedH != null && { h: String(requestedH) }),
					},
				},
	);
};

/** Map a requested width to an actual number:
 * - Infinity → intrinsic width if known, otherwise drop (returns undefined)
 * - finite  → clamped to intrinsic
 */
export const mapWidth = (w: number | undefined, intrinsic?: number) =>
	w === Infinity
		? typeof intrinsic === "number" && intrinsic > 0
			? intrinsic
			: undefined
		: clampToIntrinsic(w, intrinsic);
