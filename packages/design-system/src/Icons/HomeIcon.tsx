import type { FC } from "react";
import type { SvgIconProps } from "./types";

export const HomeIcon: FC<SvgIconProps> = ({
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
		<path d="m3 9 9-7 9 7" />
		<path d="M9 22V12h6v10" />
	</svg>
);
