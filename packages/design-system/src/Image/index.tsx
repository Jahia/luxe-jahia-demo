import type { ImgHTMLAttributes, RefObject } from "react";
import classes from "./styles.module.css";
import clsx from "clsx";

/** The Luxe image look, for an `<img>` rendered outside this component (the platform `<JImage>`). */
export const imageClass = classes.img;

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
}: ImgHTMLAttributes<HTMLImageElement> & {
	ref?: RefObject<HTMLImageElement | null>;
	/** Set on the LCP/hero image so it is not lazy-loaded. */
	priority?: boolean;
}) => {
	// `priority` wins over a `loading` carried by the props (`getImageProps` defaults it to "lazy");
	// otherwise set loading="lazy" only if both width and height exist and the caller did not say.
	const finalLoading = priority
		? "eager"
		: (loading ?? (width != null && height != null ? "lazy" : undefined));

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
