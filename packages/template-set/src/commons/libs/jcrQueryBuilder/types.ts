export type JCRQueryConfig = {
	workspace: "EDIT" | "LIVE";
	type: string;
	startNodePath: string;
	criteria: "jcr:created" | "jcr:lastModified" | "j:lastPublished";
	sortDirection: "asc" | "desc";
	categories: { id: string }[];
	excludeNodes: { id: string; translationId?: string }[];
	uuid: string;
	subNodeView: string;
	language: string;
	limit?: number;
	offset?: number;
};

export interface RenderNodeProps {
	uuid: string;
	html: string;
}
