import clsx from "clsx";
import classes from "./styles.module.css";
import type { ReactNode } from "react";

interface FigureProps {
	caption?: string;
	layout?: "imgCentered" | "imgLeft" | "imgRight" | "imgFull";
	className?: string;
	children: ReactNode;
}

export const Figure = ({ layout = "imgCentered", caption, className, children }: FigureProps) => {
	if (!children) {
		return null;
	}

	return (
		<figure className={clsx(classes.figure, classes[layout], className)}>
			{children}
			{caption && <figcaption>{caption}</figcaption>}
		</figure>
	);
};
