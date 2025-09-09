import type { ElementType, HTMLAttributes } from "react";
import classes from "./grid.module.css";

interface SectionProps extends HTMLAttributes<HTMLElement> {
	component?: ElementType;
	cssStyle: string | undefined;
}

export const Section = ({
	className,
	cssStyle,
	component: Component = "section",
	children,
	...props
}: SectionProps) => {
	return (
		<Component className={className} Style={cssStyle} {...props}>
			<div className={classes.container}>{children}</div>
		</Component>
	);
};
