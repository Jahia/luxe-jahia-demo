import type { JCRNodeWrapper } from "org.jahia.services.content";

export interface JcrQueryProps {
	"jcr:title": string;
	"type": string;
	"criteria": "jcr:created" | "jcr:lastModified" | "j:lastPublished";
	"sortDirection": "asc" | "desc";
	"maxItems"?: number;
	"startNode"?: JCRNodeWrapper;
	"excludeNodes"?: JCRNodeWrapper[];
	"filter"?: JCRNodeWrapper[];
	"noResultText"?: string;
	"j:subNodesView"?: string;
}
