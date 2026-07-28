/**
 * Parse and clamp the page/limit request parameters: page is at least 1,
 * limit is clamped to [1, 100]; non-numeric (and zero) values fall back to
 * the defaults (page 1, 30 items).
 */
export const parsePagination = (pageParam: string, limitParam: string) => {
	const page = Math.max(1, parseInt(pageParam, 10) || 1);
	const limit = Math.max(1, Math.min(100, parseInt(limitParam, 10) || 30)); // Max 100 items per page
	return { page, limit, offset: (page - 1) * limit };
};
