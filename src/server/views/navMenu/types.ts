import type { JCRNodeWrapper } from "org.jahia.services.content";

export type navMenuTypes = {
  base?: "home" | "currentPage" | "";
  maxDepth: number;
  startLevel: number;
  menuItemView: string;
  brandText?: string;
  brandImage?: JCRNodeWrapper;
  brandImageMobile?: JCRNodeWrapper;
};
