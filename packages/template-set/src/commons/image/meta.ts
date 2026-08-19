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
 * True when the node lives in the default JCR provider (local /files asset),
 * false for nodes mounted from an external provider (DAM: Keepeek,
 * Cloudinary picker…). `getProvider()` is not in the published typings but is
 * available at runtime on every JCRNodeWrapper.
 */
const isDefaultProvider = (node: JCRNodeWrapper) => {
	try {
		return (node as unknown as { getProvider(): { isDefault(): boolean } })
			.getProvider()
			.isDefault();
	} catch {
		return true;
	}
};

/**
 * Build the node URL, resized to the requested dimensions.
 * Requested values are clamped to the intrinsic size; an axis that is not
 * requested, or that ends up matching the intrinsic size, emits no resize
 * param — so a no-op resize returns the original URL.
 *
 * The resize channel depends on the node's provider:
 * - External DAM providers (Keepeek, Cloudinary picker…) override
 *   `node.getUrl(List)` and build a signed/transformed URL from the `args`.
 * - The default provider discards `getUrl` args (JCRNodeWrapperImpl), so
 *   sizes are emitted as `?w=`/`?h=` query string parameters — the official
 *   pattern for the Media Optimization (Cloudimage) proxy in live mode,
 *   harmlessly ignored by the plain file servlet.
 *   https://academy.jahia.com/documentation/jahia-cms/jahia-8-2/developer/optional-features/media-optimization-cloudimage
 */
export const sizedUrl = (
	node: JCRNodeWrapper,
	meta: ImageMeta,
	requestedWidth?: number,
	requestedHeight?: number,
) => {
	const w = clampToIntrinsic(requestedWidth, meta.intrinsicWidth);
	const h = clampToIntrinsic(requestedHeight, meta.intrinsicHeight);
	const size = {
		...(w != null && w !== meta.intrinsicWidth && { w }),
		...(h != null && h !== meta.intrinsicHeight && { h }),
	};
	if (Object.keys(size).length === 0) {
		return buildNodeUrl(node);
	}
	if (!isDefaultProvider(node)) {
		return buildNodeUrl(node, { args: size });
	}
	const parameters = {
		...(size.w != null && { w: String(size.w) }),
		...(size.h != null && { h: String(size.h) }),
	};
	return buildNodeUrl(node, { parameters });
};
