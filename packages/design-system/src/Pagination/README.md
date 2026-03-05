# Pagination Component

Generic, reusable pagination component for consistent pagination across the application.

## Components

### `Pagination`
Main pagination navigation with page numbers, previous/next buttons.

**Props:**
- `currentPage: number` - Current active page
- `totalPages: number` - Total number of pages
- `onPageChange: (page: number) => void` - Callback when page changes
- `hasNextPage?: boolean` - Whether next page exists (auto-calculated if not provided)
- `hasPreviousPage?: boolean` - Whether previous page exists (auto-calculated if not provided)
- `labels?: object` - Custom labels for buttons and aria
- `className?: string` - Additional CSS class
- `maxVisiblePages?: number` - Max page numbers to show (default: 7)

**Features:**
- Smart ellipsis display for large page ranges
- Always shows first and last page
- Fully accessible (ARIA labels, keyboard navigation)
- Responsive and customizable

### `PaginationInfo`
Displays textual information about current results.

**Props:**
- `from: number` - Starting result number
- `to: number` - Ending result number
- `total: number` - Total number of results
- `label?: string` - Custom label template (supports {{from}}, {{to}}, {{total}})
- `className?: string` - Additional CSS class

### `PageSizeSelector`
Dropdown selector for changing the number of items per page.

**Props:**
- `pageSize: number` - Current page size
- `pageSizeOptions?: number[]` - Available page size options (default: [10, 20, 30, 50, 100])
- `onPageSizeChange: (newPageSize: number) => void` - Callback when page size changes
- `label?: string` - Label text (default: "Items per page:")
- `className?: string` - Additional CSS class

**Features:**
- Customizable page size options
- Accessible dropdown with proper focus states
- Consistent styling with the design system

### `PaginationHeader`
Composite component that combines `PaginationInfo` and `PageSizeSelector` in a responsive header.

**Props:**
- All props from `PaginationInfo` (`from`, `to`, `total`, `label`, `className`)
- `pageSize?: number` - Current page size
- `pageSizeOptions?: number[]` - Available page size options
- `onPageSizeChange?: (newPageSize: number) => void` - Callback when page size changes
- `pageSizeLabel?: string` - Label for page size selector
- `showPageSizeSelector?: boolean` - Whether to show the page size selector (default: true)

**Features:**
- Combines pagination info and page size selector in one component
- Responsive layout (horizontal on desktop, vertical on mobile)
- Automatically hides if total is 0

## Usage

```tsx
import { Pagination, PaginationHeader } from "design-system";

// In your component
<PaginationHeader
	from={1}
	to={30}
	total={150}
	label={t("pagination.showing")}
	pageSize={30}
	pageSizeOptions={[10, 20, 30, 50, 100]}
	onPageSizeChange={handlePageSizeChange}
	pageSizeLabel={t("pagination.itemsPerPage")}
/>

<YourContent />

<Pagination
	currentPage={currentPage}
	totalPages={totalPages}
	onPageChange={handlePageChange}
	labels={{
		previous: t("pagination.previous"),
		next: t("pagination.next"),
		page: t("pagination.page"),
		ariaLabel: t("pagination.label"),
	}}
/>
```

## Styling

Component uses CSS modules with CSS variables for easy theming:
- `--luxe-color-gold`
- `--luxe-color-darkBlue`
- `--luxe-color-darkBlue60`
- `--luxe-color-darkBlue30`

## Accessibility

- Semantic `<nav>` element for Pagination
- `aria-label` on navigation and form controls
- `aria-current="page"` on active page
- `aria-label` on all buttons
- Keyboard navigable
- Disabled states properly handled
- Proper label associations for PageSizeSelector
