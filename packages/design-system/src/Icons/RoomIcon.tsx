import type { FC } from "react";
import type { SvgIconProps } from "./types";

/**
 * Room icon: rounded room frame with centered bed (headboard and legs).
 * Minimalist and clear for bedroom or room type.
 */
export const RoomIcon: FC<SvgIconProps> = ({
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
		<rect x="3" y="3" width="18" height="18" rx="3" /> {/* room frame */}
		<path d="M7 17v-3h10v3" /> {/* bed base */}
		<path d="M9 14v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /> {/* headboard */}
	</svg>
);
