import type { ReactNode } from "react";
import { PageSizeSelector } from "./PageSizeSelector.tsx";
import classes from "./PaginationHeader.module.css";

export interface PaginationHeaderProps {
	label: ReactNode;
	pageSize: number;
	pageSizeOptions: number[];
	onPageSizeChange?: (newPageSize: number) => void;
	pageSizeLabel?: string;
}

export function PaginationHeader({
	label,
	pageSize,
	pageSizeOptions,
	onPageSizeChange,
	pageSizeLabel,
}: PaginationHeaderProps) {
	return (
		<div className={classes.header}>
			<div className={classes.info}>{label}</div>
			<PageSizeSelector
				pageSize={pageSize}
				pageSizeOptions={pageSizeOptions}
				onPageSizeChange={onPageSizeChange}
				label={pageSizeLabel}
			/>
		</div>
	);
}
