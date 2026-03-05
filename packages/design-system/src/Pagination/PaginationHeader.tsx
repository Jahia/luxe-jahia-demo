import clsx from "clsx";
import { PaginationInfo, type PaginationInfoProps } from "./PaginationInfo.tsx";
import { PageSizeSelector } from "./PageSizeSelector.tsx";
import classes from "./PaginationHeader.module.css";

export interface PaginationHeaderProps extends PaginationInfoProps {
	pageSize?: number;
	pageSizeOptions?: number[];
	onPageSizeChange?: (newPageSize: number) => void;
	pageSizeLabel?: string;
	showPageSizeSelector?: boolean;
}

export function PaginationHeader({
	from,
	to,
	total,
	label,
	className,
	pageSize,
	pageSizeOptions,
	onPageSizeChange,
	pageSizeLabel,
	showPageSizeSelector = true,
}: PaginationHeaderProps) {
	if (total === 0) {
		return null;
	}

	const shouldShowSelector = showPageSizeSelector && pageSize && onPageSizeChange;

	return (
		<div className={clsx(classes.header, className)}>
			<PaginationInfo from={from} to={to} total={total} label={label} />
			{shouldShowSelector && (
				<PageSizeSelector
					pageSize={pageSize}
					pageSizeOptions={pageSizeOptions}
					onPageSizeChange={onPageSizeChange}
					label={pageSizeLabel}
				/>
			)}
		</div>
	);
}
