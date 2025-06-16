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
  "facetFields"?: string[];
}

export interface FacetProps {
  name: string;
  hidden: boolean;
  displayName: string;
  mandatory: boolean;
  requiredType: string;
  isActive: boolean;
  multiple: boolean;
  internationalized: boolean;
  values?: unknown[];
}

export interface RenderNodeProps {
  uuid: string;
  html: string;
}

export type NodeResult = Record<
  string,
  {
    value?: unknown;
    values?: unknown[];
    longValue?: number;
    longValues?: number[];
    booleanValue?: boolean;
    booleanValues?: boolean[];
    dateValue?: string;
    dateValues?: string[];
    decimalValue?: number;
    decimalValues?: number[];
    doubleValue?: number;
    doubleValues?: number[];
  }
>;

export type ExtractedProps = Record<string, unknown>;
