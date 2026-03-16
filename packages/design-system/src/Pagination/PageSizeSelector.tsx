import classes from "./PageSizeSelector.module.css";
import type { ReactNode } from "react";

export interface PageSizeSelectorProps {
	pageSize: number;
	pageSizeOptions: number[];
	onPageSizeChange?: (newPageSize: number) => void;
	label: ReactNode;
}

export function PageSizeSelector({
	pageSize,
	pageSizeOptions,
	onPageSizeChange,
	label,
}: PageSizeSelectorProps) {
	return (
		<label className={classes.container}>
			<span className={classes.label}>{label}</span>
			<select
				value={pageSize}
				onChange={(e) => onPageSizeChange?.(Number(e.currentTarget.value))}
				className={classes.select}
			>
				{pageSizeOptions.map((size) => (
					<option key={size} value={size}>
						{size}
					</option>
				))}
			</select>
		</label>
	);
}
