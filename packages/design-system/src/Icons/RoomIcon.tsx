import type { FC } from "react";
import type { SvgIconProps } from "./types";

/**
 * Room icon: represents a bedroom or room in a floor plan.
 * Bed + wall frame layout. 24x24 viewBox.
 */
export const RoomIcon: FC<SvgIconProps> = ({
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
		<rect x="3" y="6" width="18" height="12" rx="2" ry="2" />
		<path d="M3 10h18" /> {/* lit horizontal */}
		<path d="M7 6v4" /> {/* séparation oreiller */}
	</svg>
);
