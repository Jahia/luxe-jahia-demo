# Pagination Implementation for SearchEstate

## Overview

Pagination has been implemented in the `SearchEstate` component to manage the display of real estate search results.

## Chosen Approach: `offset` + `limit`

### Why `offset`/`limit` instead of `after`/`before`?

The Jahia GraphQL schema supports two types of pagination:

#### 1. **Offset/limit pagination** (numeric pagination) ✅ CHOSEN
- `offset`: number of results to skip (inclusive)
- `limit`: maximum number of results to return

**Advantages:**
- Intuitive user interface with page numbers (Page 1, 2, 3...)
- Direct access to any page
- Simple calculation: `offset = (pageNumber - 1) * limit`
- Suitable for search results that rarely change
- Easier to implement and understand for users

**Disadvantages:**
- Less performant on very large datasets (millions of records)
- Potentially inconsistent results if data is added/removed between pages

#### 2. **Cursor-based pagination**
- `after`/`before`: opaque cursors for navigation
- `first`/`last`: number of results to retrieve

**Advantages:**
- GraphQL standard (Relay Connection Specification)
- More performant on very large datasets
- Always consistent results even if data changes
- Ideal for infinite scroll feeds

**Disadvantages:**
- No direct access to a specific page
- Less intuitive interface (no page numbers)
- More complex to implement

### Conclusion

For a real estate search engine, **`offset`/`limit` is the best choice** because:
- Users expect to see "Page 1, 2, 3..." (familiar UX)
- Number of results remains reasonable (typically < 10,000)
- Results don't change in real-time
- Implementation is simpler and more maintainable

## Implémentation

### 1. Types (`types.ts`)

```typescript
export type QueryConfig = {
  // ...existing fields...
  pagination?: {
    offset: number;
    limit: number;
  };
};

export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
```

### 2. GraphQL Query (`graphql.ts`)

The query now uses:
- `$offset: Int!` and `$limit: Int!` as parameters
- `nodesByCriteria(criteria: $query, offset: $offset, limit: $limit)`
- `pageInfo { hasNextPage, hasPreviousPage, totalCount, nodesCount }`

The return now includes:
```typescript
{
  estates: Estate[];
  pagination: PaginationInfo;
}
```

### 3. Server Component (`results.server.tsx`)

- Extracts `page` and `limit` parameters from the URL
- Calculates offset: `offset = (page - 1) * limit`
- Limits page size between 1 and 100 to prevent abuse
- Adds `page` and `limit` to cache parameters

### 4. Client Component (`SearchEstate.client.tsx`)

- Manages pagination state with `useState`
- `handlePageChange`: changes page and updates URL
- When filters change, resets to page 1
- Updates URL with pagination parameters

### 5. Results Display (`SearchResults.tsx`)

Displays:
- Pagination info: "Showing X to Y of Z results"
- "Previous" button (disabled on first page)
- Page numbers with ellipses for large lists
- "Next" button (disabled on last page)

**Page display algorithm:**
- Always show first and last page
- Show current page and adjacent pages (±1)
- Add ellipses (`…`) for gaps

Example: On 20 pages, if on page 10, display:
`1 ... 9 10 11 ... 20`

### 6. Translations

Added translation keys in 4 languages (en, fr, es, de):
```json
"pagination": {
  "label": "Pagination",
  "previous": "Précédent",
  "next": "Suivant",
  "page": "Page {{page}}",
  "showing": "Affichage de {{from}} à {{to}} sur {{total}} résultats"
}
```

### 7. CSS Styles (`SearchResults.module.css`)

- `.paginationInfo`: textual information
- `.paginationControls`: main container
- `.pagination`: flex navigation with gap
- `.paginationButton`: button styles with hover/disabled/active states
- `.ellipsis`: ellipsis styling

## Usage

### URL Parameters

- `page`: page number (default: 1)
- `limit`: number of results per page (default: 30, max: 100)
- Other search parameters: `country`, `type`, `bedrooms`

**URL Examples:**
```
/search-estates.html
/search-estates.html?page=2
/search-estates.html?page=3&limit=20
/search-estates.html?country=FR&page=2
```

### Cache Configuration

The `page` and `limit` parameters are part of the cache key:
```
"cache.requestParameters": "country,type,bedrooms,page,limit"
```

Each parameter combination generates a distinct cache entry (TTL: 10 minutes).

## Accessibility

- Semantic navigation with `<nav>` and `aria-label`
- `aria-label` on each button for screen readers
- `aria-current="page"` on active page
- `disabled` states properly managed
- All buttons have `type="button"` to prevent form submission

## Possible Future Improvements

1. **Infinite scroll**: Use cursor-based pagination with `after`/`first`
2. **Per-page configuration**: Allow user to choose 10/20/30/50 results
3. **Jump to page**: Input field to go directly to a specific page
4. **Keyboard navigation**: Arrow keys to navigate between pages
5. **Scroll to top**: Automatically scroll to top when changing pages

