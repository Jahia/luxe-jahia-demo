import clsx from "clsx";
import classes from "./styles.module.css";
import type { ReactNode } from "react";

export interface ListRowProps {
	title: string;
	value: ReactNode;
	className?: string;
}

export const List = ({ rows, className }: { rows?: ListRowProps[]; className?: string }) => {
	if (!rows?.length) return null;
	return (
		<dl className={clsx(classes.main, className)}>
			{rows?.map(({ title, value, className }) => (
				<div key={title} className={clsx(classes.row, className)}>
					<dt className={classes.label}>{title}</dt>
					<dd className={classes.value}>{value}</dd>
				</div>
			))}
		</dl>
	);
};
