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
 * Renders a JCR image node: registers the SSR cache dependency, maps the node
 * to `<img>` props (src, srcSet, intrinsic width/height) through
 * {@link imageNodeToImgProps}, and falls back to a bundled placeholder when the
 * node is missing. Pass `sizes` (native prop) to describe the layout slot, and
 * `priority` for the LCP/hero image.
 *
 * **This component is the way to render a JCR image.** The one exception is an
 * image that has to cross an `Island` boundary: `Island` props are serialized
 * (devalue), so JSX cannot be one, and passing the image as `Island` children
 * would wrap it in a `<jsm-children>` element. Those call sites — `Gallery` in
 * `Estate/fullPage`, `AnimateClient` in `Realtor/animate` — call
 * {@link imageNodeToImgProps} directly and register their own cache dependency.
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
