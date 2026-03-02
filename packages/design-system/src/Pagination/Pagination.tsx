import { Fragment } from "react";
import clsx from "clsx";
import classes from "./Pagination.module.css";

export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	hasNextPage?: boolean;
	hasPreviousPage?: boolean;
	labels?: {
		previous?: string;
		next?: string;
		page?: string;
		ariaLabel?: string;
	};
	variant?: "default" | "icon-only";
	scrollToTop?: boolean;
	className?: string;
	maxVisiblePages?: number;
}

const DEFAULT_LABELS = {
	previous: "Previous",
	next: "Next",
	page: "Page",
	ariaLabel: "Pagination",
};

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	hasNextPage = currentPage < totalPages,
	hasPreviousPage = currentPage > 1,
	labels,
	variant = "default",
	scrollToTop = true,
	className,
	maxVisiblePages = 7,
}: PaginationProps) {
	const { previous, next, page, ariaLabel } = { ...DEFAULT_LABELS, ...labels };
	const isIconOnly = variant === "icon-only";

	const handlePageChange = (newPageNumber: number) => {
		onPageChange(newPageNumber);

		if (scrollToTop) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	if (totalPages <= 1) {
		return null;
	}

	// Calculate which page numbers to display
	const getPageNumbers = (): number[] => {
		if (totalPages <= maxVisiblePages) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const pages: number[] = [];
		const sidePages = Math.floor((maxVisiblePages - 3) / 2); // Reserve space for first, last, and current

		// Always include first page
		pages.push(1);

		let start = Math.max(2, currentPage - sidePages);
		let end = Math.min(totalPages - 1, currentPage + sidePages);

		// Adjust range if we're near the beginning or end
		if (currentPage <= sidePages + 2) {
			end = Math.min(totalPages - 1, maxVisiblePages - 1);
		} else if (currentPage >= totalPages - sidePages - 1) {
			start = Math.max(2, totalPages - maxVisiblePages + 2);
		}

		// Add pages
		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		// Always include last page if it's not already included
		if (!pages.includes(totalPages)) {
			pages.push(totalPages);
		}

		return pages;
	};

	const pageNumbers = getPageNumbers();

	return (
		<nav className={clsx(classes.pagination, className)} aria-label={ariaLabel}>
			<button
				type="button"
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={!hasPreviousPage}
				className={clsx(classes.button, isIconOnly && classes.iconButton)}
				aria-label={previous}
			>
				{isIconOnly ? "‹" : previous}
			</button>

			<div className={classes.pages}>
				{pageNumbers.map((pageNum, index, array) => {
					// Check if we need to show ellipsis before this page
					const prevPage = array[index - 1];
					const showEllipsis = prevPage && pageNum - prevPage > 1;

					// Hide pages that are +2 or -2 from current page on mobile
					const distanceFromCurrent = Math.abs(pageNum - currentPage);
					const isFirstOrLast = pageNum === 1 || pageNum === totalPages;
					const hideOnMobile = !isFirstOrLast && distanceFromCurrent >= 2;

					return (
						<Fragment key={pageNum}>
							{showEllipsis && <span className={classes.ellipsis}>…</span>}
							<button
								type="button"
								onClick={() => handlePageChange(pageNum)}
								className={clsx(
									classes.button,
									pageNum === currentPage && classes.active,
									hideOnMobile && classes.hideOnMobile,
								)}
								aria-label={`${page} ${pageNum}`}
								aria-current={pageNum === currentPage ? "page" : undefined}
							>
								{pageNum}
							</button>
						</Fragment>
					);
				})}
			</div>

			<button
				type="button"
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={!hasNextPage}
				className={clsx(classes.button, isIconOnly && classes.iconButton)}
				aria-label={next}
			>
				{isIconOnly ? "›" : next}
			</button>
		</nav>
	);
}
