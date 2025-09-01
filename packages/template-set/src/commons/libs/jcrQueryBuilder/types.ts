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

export type Constraint = {
	prop: string;
	operator: string;
	values: Array<string | number | boolean | Date>;
};

export type ConstraintJoiner = "AND" | "OR";

export type GqlNode = {
	uuid: string;
	renderedContent: { output: string };
};
