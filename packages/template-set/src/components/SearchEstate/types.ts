export type QueryConfig = {
	workspace: "EDIT" | "LIVE";
	rootPath: string;
	language: string;
	params: Record<string, string[]>;
	pagination?: {
		offset: number;
		limit: number;
	};
};

export interface Estate {
	url: string;
	title: string;
	image: string;
	price: number;
	surface: number;
	bedrooms: number;
}

export interface PaginationInfo {
	currentPage: number;
	pageSize: number;
	totalCount: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}
