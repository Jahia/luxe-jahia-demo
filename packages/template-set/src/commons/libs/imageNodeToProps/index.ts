import type { JCRNodeWrapper } from "org.jahia.services.content";
import { mapWidth, clampToIntrinsic, readNodeMeta, sizedUrlOrOriginal } from "./meta";
import { DEFAULT_WIDTHS } from "~/commons/libs/imageNodeToProps/constants.ts";

/**
 * Single `<source>` input for `<picture>`.
 * - `media`: CSS media query, e.g. `(min-width: 1024px)`.
 * - `width`/`height`: requested pixel size for URL generation; clamped to intrinsic when known.
 *   `Infinity` may be passed by callers to mean “use intrinsic/original size” (handled by the builder).
 * - `node`: optional override asset for this variant.
 */
export type SourceInput = {
	media: string;
	width?: number;
	height?: number;
	node?: JCRNodeWrapper;
};

/**
 * Configuration for building props for an `<img>` element.
 * - `baseWidth`/`baseHeight`: base resize for the returned `src` (clamped to intrinsic).
 * - `widths`: candidate widths (px) to construct `srcSet`; defaults are used when omitted.
 *   `Infinity` entries are interpreted as “intrinsic width if known”.
 */
export type ImgConfig = {
	baseWidth?: number;
	baseHeight?: number;
	widths?: number[];
};

/**
 * Configuration for building props for a `<picture>` element.
 * - `baseWidth`/`baseHeight`: base resize for the returned `src` (clamped to intrinsic).
 * - `sources`: optional per-breakpoint list for `<source>`; if omitted, defaults are generated.
 */
export type PictureConfig = {
	baseWidth?: number;
	baseHeight?: number;
	sources?: SourceInput[];
};

/**
 * Returned props for an `<img>` element (no `sizes` by design).
 * - `src`: base URL (may include resize params when not a no-op).
 * - `alt`: alternative text (trimmed).
 * - `srcSet`: comma-separated width-descriptor candidates; includes the base `src` exactly once,
 *   with URLs de-duplicated. Omitted for vector images or when no candidates remain.
 * - `width`/`height`: intrinsic dimensions when available.
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
 * @param options - Object with `{ imageNode, alt?, config? }`.
 * @param options.imageNode - Source node. Vector images are returned as-is.
 * @param options.alt - Fallbacks to the node's displayable name if omitted.
 * @param options.config - Responsive config; `baseWidth` enables width descriptors in `srcSet`.
 *
 * @returns {@link ImgProps}
 * An object you can spread onto an `<img>` element:
 * - `src: string` — Base URL for the image. May include resize params (`?w=` / `?h=`) when resizing is not a no-op.
 * - `alt: string` — Trimmed alternative text; defaults to the node’s display name.
 * - `srcSet?: string` — Comma-separated width-descriptor candidates **including** the base `src` URL exactly once
 *   (as the first entry when it wasn’t already produced by a candidate width). URLs are de-duplicated; each entry
 *   is of the form `"URL NNNw"`. Omitted for vector images or when no candidate remains.
 * - `width?: number`, `height?: number` — Intrinsic dimensions when known (`j:width`/`j:height`); otherwise omitted.
 *
 * @remarks
 * - Raster images: requested width/height are clamped to the intrinsic dimensions when known.
 * - Vector images (e.g. SVG): no resize parameters and no `srcSet` are produced; the original URL is used.
 * - `srcSet` candidates come from `config.widths` or the defaults {@link DEFAULT_WIDTHS}.
 * - If `config.baseWidth` is omitted, the first candidate width is used (`config.widths?.[0]` or `DEFAULT_WIDTHS[0]`).
 * - `Infinity` in `baseWidth` or in `widths` is replaced by the intrinsic width when known; otherwise that entry is dropped
 *   (no `w=Infinity` is ever emitted).
 * - This function does **not** return a `sizes` attribute by design; provide it at call-site if needed.
 *
 * @example
 * ```tsx
 * const props = imageNodeToImgProps({
 *   imageNode,
 *   alt: "Hero",
 *   config: {
 *     baseWidth: 1280,
 *     widths: [600, 900, 1200, 1536, Infinity],
 *   },
 * });
 *
 * <img {...props} />
 * ```
 *
 * @see ImgConfig
 * @see ImgProps
 */

export function imageNodeToImgProps({
	imageNode,
	alt = imageNode.getDisplayableName(),
	config,
}: {
	imageNode: JCRNodeWrapper;
	alt?: string;
	config?: ImgConfig;
}): ImgProps {
	const meta = readNodeMeta(imageNode);

	// Vectors: never resized, no srcSet
	if (meta.vector) {
		return {
			src: sizedUrlOrOriginal(imageNode),
			alt: alt.trim(),
		};
	}

	// Base URL (fallback: config.widths[0] -> DEFAULT_WIDTHS[0])
	const baseWidthCandidate = config?.baseWidth ?? config?.widths?.[0] ?? DEFAULT_WIDTHS[0];
	const baseW = mapWidth(baseWidthCandidate, meta.intrinsicWidth);
	const baseH = clampToIntrinsic(config?.baseHeight, meta.intrinsicHeight);

	const baseUrl = sizedUrlOrOriginal(
		imageNode,
		baseW,
		meta.intrinsicWidth,
		baseH,
		meta.intrinsicHeight,
	);

	// Build width candidates:
	// - If `config.widths` is defined but empty -> [] (invalidate defaults)
	// - If undefined -> use DEFAULT_WIDTHS
	const rawWidths = config?.widths ?? DEFAULT_WIDTHS;

	const requested = rawWidths
		.map((w) => mapWidth(w, meta.intrinsicWidth))
		.filter((w): w is number => typeof w === "number" && isFinite(w) && w > 0);

	// Generate unique URLs and assemble srcSet
	const seen = new Set<string>();
	const pairs: Array<{ url: string; w?: number }> = [];

	for (const w of requested) {
		const url = sizedUrlOrOriginal(
			imageNode,
			w,
			meta.intrinsicWidth,
			undefined,
			meta.intrinsicHeight,
		);
		if (!seen.has(url)) {
			seen.add(url);
			pairs.push({ url, w });
		}
	}

	// Ensure baseUrl appears at least once
	if (!seen.has(baseUrl)) {
		pairs.unshift({ url: baseUrl, w: baseW });
	}

	const srcSet = pairs.length
		? pairs.map((p) => (p.w ? `${p.url} ${p.w}w` : p.url)).join(", ")
		: undefined;

	return {
		src: baseUrl,
		alt: alt.trim(),
		srcSet,
		width: meta.intrinsicWidth,
		height: meta.intrinsicHeight,
	};
}
