import clsx from "clsx";
import type { CommonsProps } from "../types";
import classes from "./grid.module.css";
export const Col = ({ className, children }: CommonsProps) => {
	return <div className={clsx(classes.col, className)}>{children}</div>;
};
