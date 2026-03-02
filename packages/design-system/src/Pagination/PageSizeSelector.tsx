import clsx from "clsx";
import classes from "./PageSizeSelector.module.css";

export interface PageSizeSelectorProps {
	pageSize: number;
	pageSizeOptions?: number[];
	onPageSizeChange: (newPageSize: number) => void;
	label?: string;
	className?: string;
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 30, 50, 100];

export function PageSizeSelector({
	pageSize,
	pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
	onPageSizeChange,
	label = "Items per page:",
	className,
}: PageSizeSelectorProps) {
	return (
		<div className={clsx(classes.container, className)}>
			<label htmlFor="page-size-selector" className={classes.label}>
				{label}
			</label>
			<select
				id="page-size-selector"
				value={pageSize}
				onChange={(e) => onPageSizeChange(Number(e.target.value))}
				className={classes.select}
			>
				{pageSizeOptions.map((size) => (
					<option key={size} value={size}>
						{size}
					</option>
				))}
			</select>
		</div>
	);
}
