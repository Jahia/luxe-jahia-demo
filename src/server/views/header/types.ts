import type { JCRNodeWrapper } from "org.jahia.services.content";

export type headerTypes = {
  title: string;
  subtitle?: string;
  image?: JCRNodeWrapper;
};
