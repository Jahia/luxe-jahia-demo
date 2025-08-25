import type { ImgHTMLAttributes, RefObject } from "react";
import classes from "./styles.module.css";
import clsx from "clsx";

/**
 * Image
 * - Accepts native <img> props only.
 * - Does NOT compute any dimensions.
 * - Adds loading="lazy" only when BOTH width and height are provided.
 * - Ensures an explicit `alt` attribute (default "") for a11y linters.
 */
export const Image = ({
	ref,
	alt = "",
	loading,
	width,
	height,
	className,
	...rest
}: ImgHTMLAttributes<HTMLImageElement> & {
	ref?: RefObject<HTMLImageElement | null>;
}) => {
	// Only set loading="lazy" if both width and height exist and user didn't specify loading.
	const finalLoading = loading ?? (width != null && height != null ? "lazy" : undefined);

	return (
		<img
			ref={ref}
			alt={alt}
			width={width}
			height={height}
			loading={finalLoading}
			className={clsx(classes.img, className)}
			{...rest}
		/>
	);
};
