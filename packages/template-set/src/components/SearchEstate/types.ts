export type QueryConfig = {
	workspace: "EDIT" | "LIVE";
	rootPath: string;
	language: string;
	params: Record<string, string[]>;
	offset: number;
	limit: number;
};

export interface Estate {
	url: string;
	title: string;
	image: string;
	price: number;
	surface: number;
	bedrooms: number;
}

export interface FetchEstateResult {
	currentPage: number;
	totalCount: number;
	estates: Estate[];
}
