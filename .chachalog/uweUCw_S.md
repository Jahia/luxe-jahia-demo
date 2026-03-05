---
# Allowed version bumps: patch, minor, major
luxe-jahia-demo: minor
---

Implement GraphQL pagination with UX enhancements (#409)
Backend:
- Add pageNumber and pageSize to EstateSearchInput
- Update estateSearch query to support pagination parameters

Frontend:
- Create Pagination component with smart page number display
- Add automatic scroll-to-top on page change (configurable)
- Integrate pagination in SearchEstate with URL sync
- Add PaginationInfo component showing item range
- Add PageSizeSelector component for dynamic page size control
- Make pagination fully responsive with mobile optimizations
- Add translations for pagination labels (EN, FR, ES, DE)
- Reduce visible pages on mobile (max 5 pages)
- Optimize spacing and layout for small screens

Improves performance and UX for large estate search result sets with proper pagination controls and responsive design.
