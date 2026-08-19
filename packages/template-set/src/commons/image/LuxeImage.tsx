import { buildModuleFileUrl, server, useServerContext } from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import type { ComponentProps } from "react";
import { Image } from "design-system";
import { imageNodeToImgProps } from "~/commons/image/imgProps";
import defaultFallback from "/static/img/img-placeholder.jpg";

type LuxeImageProps = {
	/** JCR image node; when missing, the `fallback` static asset is rendered instead. */
	node?: JCRNodeWrapper | null;
	/** Alternative text; defaults to the node's displayable name. */
	alt?: string;
	/** Module static asset (import from /static/…) used when `node` is missing. */
	fallback?: string;
	/** Candidate widths (px) for `srcSet`; see {@link imageNodeToImgProps}. */
	widths?: number[];
} & Omit<ComponentProps<typeof Image>, "src" | "srcSet" | "width" | "height" | "alt">;

/**
 * Server-side bridge between a JCR image node and the design-system `Image`:
 * - registers an SSR cache dependency on the node,
 * - maps the node to img props (src, srcSet, intrinsic width/height) via
 *   {@link imageNodeToImgProps},
 * - falls back to a bundled placeholder when the node is missing.
 *
 * Pass `sizes` (native prop) to describe the layout slot, and `priority` for
 * the LCP/hero image.
 */
export const LuxeImage = ({
	node,
	alt,
	fallback = defaultFallback,
	widths,
	...imgAttributes
}: LuxeImageProps) => {
	const { renderContext } = useServerContext();

	if (!node) {
		return <Image src={buildModuleFileUrl(fallback)} alt={alt} {...imgAttributes} />;
	}

	server.render.addCacheDependency({ node }, renderContext);
	return <Image {...imageNodeToImgProps(node, { alt, widths })} {...imgAttributes} />;
};
