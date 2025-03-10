import type { JCRNodeWrapper } from "org.jahia.services.content";

export interface EstateProps {
  title: string;
  description: string;
  price: bigint;
  images: JCRNodeWrapper[];
  country?: string;
  type?: string;
  surface: bigint;
  rooms: bigint;
  bedrooms: bigint;
  bathrooms: bigint;
  options: string[];
}
