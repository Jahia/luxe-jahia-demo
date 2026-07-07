import type { JCRNodeWrapper } from "org.jahia.services.content";

// All fields are optional at runtime, even when mandatory in the CND:
// a freshly created or partially filled node renders with missing props.
export interface BlogPostProps {
	"title"?: string;
	"subtitle"?: string;
	"image"?: JCRNodeWrapper;
	"body"?: string;
	"date"?: string;
	"relatedBlogPosts"?: JCRNodeWrapper[];
	"j:defaultCategory"?: JCRNodeWrapper[];
}
