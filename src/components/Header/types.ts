import type { JCRNodeWrapper } from "org.jahia.services.content";

export interface HeaderProps {
  title: string;
  subtitle?: string;
  image?: JCRNodeWrapper;
}
