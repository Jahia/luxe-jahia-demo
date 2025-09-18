import type { FC } from "react";
import type { SvgIconProps } from "./types";

export const MapPinIcon: FC<SvgIconProps> = ({
	width = "24px",
	height = "24px",
	strokeColor = "currentColor",
	...props
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={width}
		height={height}
		viewBox="0 0 24 24"
		fill="none"
		stroke={strokeColor}
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
		<circle cx="12" cy="10" r="3" />
	</svg>
);
