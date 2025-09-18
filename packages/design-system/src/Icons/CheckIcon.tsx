import type { FC } from "react";
import type { SvgIconProps } from "./types.ts";

export const CheckIcon: FC<SvgIconProps> = ({
	width = "24px",
	height = "24px",
	strokeColor = "currentColor",
	...props
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth="2"
		stroke={strokeColor}
		width={width}
		height={height}
		{...props}
	>
		<path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
	</svg>
);
