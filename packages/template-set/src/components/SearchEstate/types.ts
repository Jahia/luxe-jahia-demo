export type QueryConfig = {
	workspace: "EDIT" | "LIVE";
	language: string;
	params: Record<string, string[]>;
	ordering: { property: string; orderType: "ASC" | "DESC" };
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
