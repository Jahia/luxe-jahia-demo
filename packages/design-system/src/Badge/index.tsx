import classes from "./styles.module.css";
import type { ComponentProps, FC } from "react";
import clsx from "clsx";

export const Badge: FC<ComponentProps<"span">> = (props) => (
	<span {...props} className={clsx(classes.badge, props.className)} />
);
