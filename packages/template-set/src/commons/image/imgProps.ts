import { buildNodeUrl } from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";

/**
 * Default `srcSet` candidate widths (CSS px), from the Material UI
 * breakpoints: 600 (sm), 900 (md), 1200 (lg), 1536 (xl).
 */
export const DEFAULT_WIDTHS = [600, 900, 1200, 1536];

/** Options of {@link imageNodeToImgProps}. */
export type ImgOptions = {
	/** Alternative text; defaults to the node's displayable name. */
	alt?: string;
	/** Candidate widths (px) for `srcSet`; defaults to {@link DEFAULT_WIDTHS}. */
	widths?: number[];
};

/**
 * `<img>` props built from a JCR image node. No `sizes`: it describes the
 * layout slot, so it belongs to the call site — `LuxeImage` forwards it.
 */
export type ImgProps = {
	src: string;
	alt: string;
	srcSet?: string;
	width?: number;
	height?: number;
};

type ImageMeta = {
	vector: boolean;
	intrinsicWidth?: number;
	intrinsicHeight?: number;
};

/** A JCR node throws on a property it does not carry, and `j:*` are optional. */
const readPositiveLong = (node: JCRNodeWrapper, property: string) => {
	try {
		const value = Number(node.getProperty(property)?.getLong());
		return value > 0 ? value : undefined;
	} catch {
		return undefined;
	}
};

/** Mime type, plus the intrinsic dimensions of a raster image. */
export const readNodeMeta = (node: JCRNodeWrapper): ImageMeta => {
	let mime = "";
	try {
		mime = node.getNode("jcr:content")?.getPropertyAsString("jcr:mimeType") ?? "";
	} catch {
		// Ignore errors
	}

	return mime.startsWith("image/svg") || mime.startsWith("image/vnd")
		? { vector: true }
		: {
				vector: false,
				intrinsicWidth: readPositiveLong(node, "j:width"),
				intrinsicHeight: readPositiveLong(node, "j:height"),
			};
};

/** Never request more than the intrinsic width, when it is known. */
export const clampToIntrinsic = (requested: number, intrinsic?: number) =>
	intrinsic ? Math.min(requested, intrinsic) : requested;

/**
 * True when the node lives in the default JCR provider (a local /files asset),
 * false when it comes from an external provider mount (DAM: Keepeek,
 * Cloudinary picker…). `getProvider()` is absent from the published typings,
 * but present on every JCRNodeWrapper at runtime.
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
 * The node URL, resized to `width` — clamped to the intrinsic width, and left
 * untouched when the resize would be a no-op.
 *
 * The requested size reaches the image through a different channel per
 * provider:
 * - an external DAM provider overrides `node.getUrl(List)` and builds a signed,
 *   transformed URL out of the `args`;
 * - the default provider discards those args (`JCRNodeWrapperImpl.getUrl(List)`
 *   is `return getUrl()`), so the size travels in the query string instead —
 *   the pattern the Media Optimization (Cloudimage) proxy honours in live mode,
 *   harmlessly ignored by the plain file servlet.
 *   https://academy.jahia.com/documentation/jahia-cms/jahia-8-2/developer/optional-features/media-optimization-cloudimage
 */
export const sizedUrl = (node: JCRNodeWrapper, meta: ImageMeta, width: number) => {
	const w = clampToIntrinsic(width, meta.intrinsicWidth);
	if (w === meta.intrinsicWidth) return buildNodeUrl(node);

	return isDefaultProvider(node)
		? buildNodeUrl(node, { parameters: { w: String(w) } })
		: buildNodeUrl(node, { args: { w } });
};

/**
 * Commas are legal inside a URL but ambiguous with the `srcSet` candidate
 * separator, and Jahia's srcset rewriter (SrcSetURLReplacer) splits on every
 * comma — corrupting e.g. a Cloudinary transformation URL
 * (…/upload/f_auto,w_600/…). https://github.com/Jahia/jahia/issues/23
 */
const srcSetSafe = (url: string) => url.replaceAll(",", "%2C");

/**
 * Build `<img>` props from a Jahia image node.
 *
 * Prefer the `LuxeImage` component; call this directly only when the props have
 * to cross an `Island` boundary — see the module documentation of `LuxeImage`.
 */
export function imageNodeToImgProps(
	imageNode: JCRNodeWrapper,
	{ alt = imageNode.getDisplayableName(), widths = DEFAULT_WIDTHS }: ImgOptions = {},
): ImgProps {
	const meta = readNodeMeta(imageNode);

	// A vector is never resized, and a one-URL srcSet would say nothing
	if (meta.vector) {
		return { src: buildNodeUrl(imageNode), alt: alt.trim() };
	}

	// Never empty, which is what makes `src` the first candidate below
	const usable = widths.filter((width) => width > 0);
	const requested = (usable.length ? usable : DEFAULT_WIDTHS).map((width) =>
		clampToIntrinsic(width, meta.intrinsicWidth),
	);
	// The intrinsic width joins the candidates only when the original is close
	// enough to the largest requested width: a huge master asset (an 8000px DAM
	// original, say) must never be served into a 1536px slot.
	if (meta.intrinsicWidth && meta.intrinsicWidth <= 2 * Math.max(...requested)) {
		requested.push(meta.intrinsicWidth);
	}

	// Keying by URL is the de-duplication: on an original smaller than the slot,
	// several requested widths clamp to the same size and share one URL.
	const widthByUrl = new Map<string, number>(
		requested.map((width) => [sizedUrl(imageNode, meta, width), width]),
	);
	const candidates = [...widthByUrl].map(([url, width]) => `${srcSetSafe(url)} ${width}w`);

	return {
		src: sizedUrl(imageNode, meta, requested[0]),
		alt: alt.trim(),
		srcSet: candidates.join(", "),
		width: meta.intrinsicWidth,
		height: meta.intrinsicHeight,
	};
}
