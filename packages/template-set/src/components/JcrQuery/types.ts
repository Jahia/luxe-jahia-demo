import type { JCRNodeWrapper } from "org.jahia.services.content";

// All props are optional at runtime, even CND-mandatory ones: a node can
// reach the view before its mandatory fields are filled in
export interface JcrQueryProps {
	"jcr:title"?: string;
	"type"?: string;
	"criteria"?: "jcr:created" | "jcr:lastModified" | "j:lastPublished";
	"sortDirection"?: "asc" | "desc";
	"maxItems"?: number;
	"startNode"?: JCRNodeWrapper;
	"excludeNodes"?: JCRNodeWrapper[];
	"filter"?: JCRNodeWrapper[];
	"noResultText"?: string;
	"j:subNodesView"?: string;
}
