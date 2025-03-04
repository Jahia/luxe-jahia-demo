import type { JCRNodeWrapper } from "org.jahia.services.content";
import type { RenderContext } from "org.jahia.services.render";
import type { TFunction } from "i18next";
import { server } from "@jahia/javascript-modules-library";

export type jcrQueryTypes = {
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
};

export type buildQueryTypes = {
  luxeQuery: jcrQueryTypes;
  t: TFunction;
  server: typeof server;
  currentNode: JCRNodeWrapper;
  renderContext: RenderContext;
};
