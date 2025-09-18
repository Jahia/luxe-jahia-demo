import clsx from "clsx";
import classes from "../styles.module.css";
import type { ElementType, HTMLAttributes } from "react";

export const Row = <T,>({
	className,
	component: Component = "div",
	children,
	...props
}: HTMLAttributes<T> & { component?: ElementType }) => (
	<Component className={clsx(classes.row, className)} {...props}>
		{children}
	</Component>
);
