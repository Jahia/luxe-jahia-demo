import clsx from "clsx";
import classes from "../styles.module.css";
import type { HTMLAttributes } from "react";

export const Col = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
	<div className={clsx(classes.col, className)} {...props} />
);
