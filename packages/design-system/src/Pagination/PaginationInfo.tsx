import clsx from "clsx";
import classes from "./PaginationInfo.module.css";

export interface PaginationInfoProps {
	from: number;
	to: number;
	total: number;
	label?: string;
	className?: string;
}

export function PaginationInfo({ from, to, total, label, className }: PaginationInfoProps) {
	if (total === 0) {
		return null;
	}

	const text = label
		? label
				.replace("{{from}}", String(from))
				.replace("{{to}}", String(to))
				.replace("{{total}}", String(total))
		: `Showing ${from} to ${to} of ${total} results`;

	return <div className={clsx(classes.info, className)}>{text}</div>;
}
