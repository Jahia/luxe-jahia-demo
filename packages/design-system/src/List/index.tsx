import clsx from "clsx";
import classes from "./styles.module.css";
import type { JSX } from "react";

export interface ListRowProps {
	title: string;
	value: string | JSX.Element;
	className?: string;
}

/* eslint-disable @eslint-react/dom/no-dangerously-set-innerhtml */
export const List = ({ rows, className }: { rows?: ListRowProps[]; className?: string }) => {
	if (!rows?.length) return null;
	return (
		<dl className={clsx(classes.main, className)}>
			{rows?.map(({ title, value, className }) => (
				<div key={title} className={clsx(classes.row, className)}>
					<dt className={classes.label}>{title}</dt>
					{typeof value === "string" ? (
						<dd className={classes.value} dangerouslySetInnerHTML={{ __html: value }} />
					) : (
						<dd className={classes.value}>{value}</dd>
					)}
				</div>
			))}
		</dl>
	);
};
