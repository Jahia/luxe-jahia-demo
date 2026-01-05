export type QueryConfig = {
	workspace: "EDIT" | "LIVE";
	root: string;
	language: string;
	params: Record<string, string[]>;
};

export interface Estate {
	url: string;
	title: string;
	image: string;
	price: number;
	surface: number;
	bedrooms: number;
}
