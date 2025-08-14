import type { JCRNodeWrapper } from "org.jahia.services.content";
import { buildNodeUrl } from "@jahia/javascript-modules-library";
import type { ImageConfig, ImageProps } from "~/commons/libs/imageNodeToImgProps/types.ts";

/** Vector formats are not resized */
const isVector = (mime: string) => mime.startsWith("image/svg") || mime.startsWith("image/vnd");

/** Read mime + (if raster) intrinsic dimensions; tolerate missing props */
const readNodeMeta = (node: JCRNodeWrapper) => {
	let mime = "";
	let intrinsicWidth: number | undefined;
	let intrinsicHeight: number | undefined;
	try {
		mime = node.getNode("jcr:content")?.getPropertyAsString("jcr:mimeType") ?? "";
	} catch {}
	if (!isVector(mime)) {
		try {
			const w = node.getProperty("j:width")?.getLong();
			if (w > 0) intrinsicWidth = Number(w);
		} catch {}
		try {
			const h = node.getProperty("j:height")?.getLong();
			if (h > 0) intrinsicHeight = Number(h);
		} catch {}
	}
	return { mime, intrinsicWidth, intrinsicHeight };
};

/** Never request a value larger than the intrinsic size (if known) */
const clampToIntrinsic = (requested: number | undefined, intrinsic?: number) =>
	typeof requested === "number" && requested > 0 && typeof intrinsic === "number" && intrinsic > 0
		? Math.min(requested, intrinsic)
		: requested;

/** Compact logic to return original URL when resize is a no-op */
const sizedUrlOrOriginal = (
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

/** Build an HTML `sizes` string from width-driven pairs (largest first) */
const buildSizes = (pairs: Array<{ media: string; width: number }>) =>
	pairs.length
		? [...pairs]
				.reverse()
				.map((p) => `${p.media} ${p.width}px`)
				.concat("100vw")
				.join(", ")
		: undefined;

/** Try to extract a width (px) from a media query like "(max-width: 600px)" or "(min-width: 768px)" */
const inferWidthFromMedia = (media?: string): number | undefined => {
	if (!media) return undefined;
	// Look for min/max-width: <number>px
	const re = /(min|max)-width\s*:\s*(\d+)\s*px/i;
	const match = media.match(re);
	if (match) {
		const n = Number(match[2]);
		return Number.isFinite(n) && n > 0 ? n : undefined;
	}
	return undefined;
};

/** Map sources to candidate URLs.
 * - width (for img srcset) : source.width si présent, sinon tenté depuis media, sinon absent
 * - sizes utilise source.width, sinon la width déduite du media, sinon baseRequestedW
 * - height (si baseRequestedH présent) n’est utilisé que pour générer l’URL
 */
const toCandidates = (
	sources: ImageConfig["sources"] | undefined,
	baseNode: JCRNodeWrapper,
	baseRequestedW?: number,
	baseRequestedH?: number,
): Array<{ media: string; url: string; width?: number; sizesWidth?: number }> => {
	if (!sources?.length) return [];

	return sources.map((s) => {
		const n = s.node ?? baseNode;
		const meta = readNodeMeta(n);

		// Narrowing: read optional width/height only if property exists and is number
		const srcWidth = "width" in s && typeof s.width === "number" ? s.width : undefined;
		const srcHeight = "height" in s && typeof s.height === "number" ? s.height : undefined;

		// Try to infer a width from media query, e.g. "(max-width: 600px)" -> 600
		const mediaInferredW = inferWidthFromMedia(s.media);

		// Width used for srcset descriptor (prefer explicit width, else inferred from media)
		const rawW = srcWidth ?? mediaInferredW;
		const reqW = rawW != null ? clampToIntrinsic(rawW, meta.intrinsicWidth) : undefined;

		// Width used for `sizes`: prefer source.width -> mediaInferredW -> baseRequestedW
		const rawSizesW = srcWidth ?? mediaInferredW ?? baseRequestedW;
		const sizesWidth =
			rawSizesW != null ? clampToIntrinsic(rawSizesW, meta.intrinsicWidth) : undefined;

		// Height for URL generation only (if base height exists and source provided one)
		const reqH =
			baseRequestedH != null && srcHeight != null
				? clampToIntrinsic(srcHeight, meta.intrinsicHeight)
				: undefined;

		// Build URL (vectors keep original)
		const url = isVector(meta.mime)
			? buildNodeUrl(n)
			: sizedUrlOrOriginal(n, reqW, meta.intrinsicWidth, reqH, meta.intrinsicHeight);

		const out: { media: string; url: string; width?: number; sizesWidth?: number } = {
			media: s.media,
			url,
		};
		if (reqW != null) out.width = reqW; // for <img srcset> "NNNw"
		if (sizesWidth != null) out.sizesWidth = sizesWidth; // for `sizes`
		return out;
	});
};

/** Dedupe by URL and drop entries identical to baseUrl */
const dedupeByUrl = <T extends { url: string }>(items: T[], baseUrl: string) => {
	const seen = new Set<string>([baseUrl]);
	return items.filter(({ url }) => (seen.has(url) ? false : (seen.add(url), true)));
};

/** Build <source>, <img srcSet> and sizes */
const buildArtifacts = (
	candidates: Array<{ media: string; url: string; width?: number; sizesWidth?: number }>,
): { sources: Array<{ media: string; srcSet: string }>; imgSrcSet?: string; sizes?: string } => {
	const sources = candidates.map(({ media, url }) => ({ media, srcSet: url }));

	// srcSet: width descriptor only when we have a width (from source.width or inferred from media)
	const imgSrcSet = candidates
		.map((c) => (c.width != null ? `${c.url} ${c.width}w` : c.url))
		.join(", ");

	// sizes: prefer per-candidate sizesWidth
	const sizePairs = candidates
		.filter((c) => c.sizesWidth != null)
		.map(({ media, sizesWidth }) => ({ media, width: sizesWidth as number }));

	const sizes = buildSizes(sizePairs);
	return { sources, imgSrcSet, sizes };
};

/**
 * Build responsive <img>/<source> props from a Jahia node.
 * - Generates img.srcSet and sizes even without baseWidth by inferring from media when needed.
 */
export function imageNodeToImageProps({
	imageNode,
	alt = imageNode.getDisplayableName(),
	config,
}: {
	imageNode: JCRNodeWrapper;
	alt?: string;
	config?: ImageConfig;
}): ImageProps {
	const meta = readNodeMeta(imageNode);

	// Vector base → plain URL; ignore responsive artifacts
	if (isVector(meta.mime)) {
		return { src: buildNodeUrl(imageNode), alt: alt.trim() };
	}

	// Compute base URL (optional width/height, clamped)
	const baseW = clampToIntrinsic(config?.baseWidth, meta.intrinsicWidth);
	const baseH = clampToIntrinsic(config?.baseHeight, meta.intrinsicHeight);
	const baseUrl = sizedUrlOrOriginal(
		imageNode,
		baseW,
		meta.intrinsicWidth,
		baseH,
		meta.intrinsicHeight,
	);

	// Build + dedupe candidate sources
	const rawCandidates = toCandidates(config?.sources, imageNode, baseW, baseH);
	const candidates = dedupeByUrl(rawCandidates, baseUrl);

	// No useful breakpoints → only base <img>
	if (candidates.length === 0) {
		return {
			src: baseUrl,
			alt: alt.trim(),
			width: meta.intrinsicWidth,
			height: meta.intrinsicHeight,
		};
	}

	// Assemble artifacts
	const { sources, imgSrcSet, sizes } = buildArtifacts(candidates);

	return {
		src: baseUrl,
		alt: alt.trim(),
		srcSet: imgSrcSet,
		sizes,
		sources,
		width: meta.intrinsicWidth,
		height: meta.intrinsicHeight,
	};
}
