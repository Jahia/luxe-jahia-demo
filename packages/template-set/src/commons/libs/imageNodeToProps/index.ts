import type { JCRNodeWrapper } from "org.jahia.services.content";
import { clampToIntrinsic, readNodeMeta, sizedUrl } from "./meta";
import { DEFAULT_WIDTHS } from "./constants";

/**
 * Options for building props for an `<img>` element.
 */
export type ImgOptions = {
	/** Alternative text; defaults to the node's displayable name. */
	alt?: string;
	/** Base resize width (px) for the returned `src`; defaults to the first candidate width. */
	baseWidth?: number;
	/** Base resize height (px) for the returned `src`. */
	baseHeight?: number;
	/**
	 * Candidate widths (px) for `srcSet`; defaults to {@link DEFAULT_WIDTHS}.
	 * Candidates are clamped to the intrinsic width, and the intrinsic width
	 * itself is always added as a candidate when known.
	 */
	widths?: number[];
};

/**
 * Returned props for an `<img>` element (no `sizes` by design — it describes
 * the layout slot, so it belongs to the call site; `LuxeImage` exposes it).
 */
export type ImgProps = {
	src: string;
	alt: string;
	srcSet?: string;
	width?: number;
	height?: number;
};

/**
 * Build `<img>`-ready props from a Jahia image node.
 *
 * - Raster images: requested sizes are clamped to the intrinsic dimensions
 *   (`j:width` / `j:height`) when known; `srcSet` URLs are de-duplicated and
 *   always include the base `src`.
 * - Vector images (e.g. SVG): original URL, no resize params, no `srcSet`.
 *
 * @example
 * ```tsx
 * <img {...imageNodeToImgProps(imageNode, { alt: "Hero", widths: [600, 1200] })} />
 * ```
 */
export function imageNodeToImgProps(
	imageNode: JCRNodeWrapper,
	{ alt = imageNode.getDisplayableName(), baseWidth, baseHeight, widths }: ImgOptions = {},
): ImgProps {
	const meta = readNodeMeta(imageNode);

	// Vectors: never resized, no srcSet
	if (meta.vector) {
		return { src: sizedUrl(imageNode, meta), alt: alt.trim() };
	}

	const requestedBase = baseWidth ?? widths?.[0] ?? DEFAULT_WIDTHS[0];
	const src = sizedUrl(imageNode, meta, requestedBase, baseHeight);

	// srcSet candidates: requested widths clamped to intrinsic, plus the intrinsic width itself
	const candidates = (widths ?? DEFAULT_WIDTHS)
		.map((w) => clampToIntrinsic(w, meta.intrinsicWidth))
		.filter((w): w is number => typeof w === "number" && Number.isFinite(w) && w > 0);
	if (meta.intrinsicWidth) {
		candidates.push(meta.intrinsicWidth);
	}

	// One srcSet entry per unique URL; make sure the base src is listed
	const seen = new Set<string>();
	const pairs: { url: string; w: number }[] = [];
	for (const w of candidates) {
		const url = sizedUrl(imageNode, meta, w);
		if (!seen.has(url)) {
			seen.add(url);
			pairs.push({ url, w });
		}
	}
	if (!seen.has(src)) {
		pairs.unshift({ url: src, w: clampToIntrinsic(requestedBase, meta.intrinsicWidth) as number });
	}

	return {
		src,
		alt: alt.trim(),
		srcSet: pairs.map(({ url, w }) => `${url} ${w}w`).join(", ") || undefined,
		width: meta.intrinsicWidth,
		height: meta.intrinsicHeight,
	};
}
