import type { JCRNodeWrapper } from "org.jahia.services.content";
import type { RenderContext } from "org.jahia.services.render";

export type agencyLanguageType = {
  realtors: JCRNodeWrapper[] | undefined;
  country: string | undefined;
  renderContext: RenderContext;
};

export type agencyTypes = {
  name: string;
  description: string;
  image: JCRNodeWrapper;
  creationDate: Date;
  country?: string;
  address?: string;
  phone?: string;
  email?: string;
  realtors?: JCRNodeWrapper[];
};
