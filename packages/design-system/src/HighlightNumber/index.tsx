import type { FC } from "react";
import classes from "./styles.module.css";

export const HighlightNumber: FC<{ big: string; small: string }> = ({ big, small }) => (
	<div className={classes.main}>
		<h4>{big}</h4>
		<p>{small}</p>
	</div>
);
