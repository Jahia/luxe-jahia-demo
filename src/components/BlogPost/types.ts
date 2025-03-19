import type { JCRNodeWrapper } from "org.jahia.services.content";

export interface BlogPostProps {
  "title": string;
  "subtitle"?: string;
  "image": JCRNodeWrapper;
  "body": string;
  "date": Date;
  "relatedBlogPosts"?: JCRNodeWrapper[];
  "j:defaultCategory": JCRNodeWrapper[];
}
