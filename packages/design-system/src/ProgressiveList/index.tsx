import clsx from "clsx";
import classes from "./styles.module.css";
import type { ReactNode } from "react";

interface ProgressiveListProps<T> {
	items: T[];
	itemKey?: keyof T;
	children: (
		item: T,
		index: number,
		key: string,
		style: React.CSSProperties,
		className: string,
	) => ReactNode;
	delayMs?: number;
	animationType?: "fadeIn" | "fadeInUp";
	className?: string;
}

export function ProgressiveList<T>({
	items,
	itemKey,
	children,
	delayMs = 200,
	animationType = "fadeIn",
	className,
}: ProgressiveListProps<T>) {
	return (
		<>
			{items.map((item, index) => {
				const key = itemKey ? String(item[itemKey]) : `${items.length}-${index}`;
				const style = {
					animationDelay: `${index * delayMs}ms`,
					animationFillMode: "both",
				};
				const combinedClassName = clsx(classes.item, classes[animationType], className);

				return children(item, index, key, style, combinedClassName);
			})}
		</>
	);
}
