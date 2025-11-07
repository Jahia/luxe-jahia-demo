export type QueryConfig = {
	workspace: "EDIT" | "LIVE";
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
