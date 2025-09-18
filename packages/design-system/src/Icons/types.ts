import type { SVGAttributes } from "react";

export interface SvgIconProps extends SVGAttributes<SVGElement> {
	width?: string;
	height?: string;
	strokeColor?: string;
}
