import type { JCRNodeWrapper } from "org.jahia.services.content";

export type blogPostTypes = {
  "title": string;
  "subtitle"?: string;
  "image": JCRNodeWrapper;
  "body": string;
  "date": Date;
  "relatedBlogPosts"?: JCRNodeWrapper[];
  "j:defaultCategory": JCRNodeWrapper[];
};
