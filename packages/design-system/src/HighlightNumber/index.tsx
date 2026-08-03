import type { FC } from "react";
import classes from "./styles.module.css";

export const HighlightNumber: FC<{ big: string; small: string }> = ({ big, small }) => (
	<div className={classes.main}>
		<h3>{big}</h3>
		<p>{small}</p>
	</div>
);
