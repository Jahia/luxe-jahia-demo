import { buildModuleFileUrl, JImage, type JImageProps } from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import clsx from "clsx";
import { Image, imageClass } from "design-system";
import defaultFallback from "/static/img/img-placeholder.jpg";

/** `Omit` on a union keeps the common keys only; distributing it keeps each branch's own options. */
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

type LuxeImageProps = DistributiveOmit<JImageProps, "src" | "alt" | "className"> & {
	/** Image node; when missing, `fallback` is rendered instead. */
	src?: JCRNodeWrapper | null;
	/** Module static asset (import from /static/…) shown when `src` is missing. */
	fallback?: string;
	/** No file of the site carries a jcr:title, so the library's default would be an empty alt. */
	alt: string;
	className?: string;
};

/** A JCR image with the Luxe look, or a bundled placeholder when the node is missing. */
export const LuxeImage = ({
	src,
	fallback = defaultFallback,
	className,
	...props
}: LuxeImageProps) =>
	src ? (
		<JImage src={src} className={clsx(imageClass, className)} {...props} />
	) : (
		// A static file has one size, so only the loading attributes carry over to the placeholder
		<Image
			src={buildModuleFileUrl(fallback)}
			alt={props.alt}
			className={className}
			loading={props.loading}
			fetchPriority={props.fetchPriority}
		/>
	);
