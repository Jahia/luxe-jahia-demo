import type { FC } from "react";
import type { SvgIconProps } from "./types";

/**
 * Home icon representing a house with roof and door.
 * Matches UI expectation from visual reference.
 */
export const HomeIcon: FC<SvgIconProps> = ({
	width = "24px",
	height = "24px",
	strokeColor = "currentColor",
	...props
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		width={width}
		height={height}
		stroke={strokeColor}
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<path d="M3 10l9-7 9 7" /> {/* roof */}
		<path d="M6 10v10h12V10" /> {/* house walls */}
		<path d="M10 20v-6h4v6" /> {/* door */}
	</svg>
);
