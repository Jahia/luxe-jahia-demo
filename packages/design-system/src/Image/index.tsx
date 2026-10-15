import type { ImgHTMLAttributes, RefObject } from "react";
import classes from "./styles.module.css";
import clsx from "clsx";

/** Props of {@link Image}: the native `<img>` attributes, plus `priority`. */
export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
	ref?: RefObject<HTMLImageElement | null>;
	/** Set on the LCP/hero image so it is not lazy-loaded. */
	priority?: boolean;
};

/**
 * Image
 * - Accepts native <img> props only.
 * - Does NOT compute any dimensions.
 * - `priority` marks an above-the-fold/LCP image: eager loading + high fetch priority.
 * - Adds loading="lazy" only when BOTH width and height are provided.
 * - Ensures an explicit `alt` attribute (default "") for a11y linters.
 */
export const Image = ({
	ref,
	alt = "",
	loading,
	fetchPriority,
	priority = false,
	width,
	height,
	className,
	...rest
}: ImageProps) => {
	// Only set loading="lazy" if both width and height exist and user didn't specify loading.
	const finalLoading =
		loading ?? (priority ? "eager" : width != null && height != null ? "lazy" : undefined);

	return (
		<img
			ref={ref}
			alt={alt}
			width={width}
			height={height}
			loading={finalLoading}
			fetchPriority={fetchPriority ?? (priority ? "high" : undefined)}
			className={clsx(classes.img, className)}
			{...rest}
		/>
	);
};
