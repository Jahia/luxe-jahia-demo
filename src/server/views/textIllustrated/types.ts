import type { JCRNodeWrapper } from "org.jahia.services.content";

export type textIllustratedTypes = {
  title: string;
  text: string;
  image: JCRNodeWrapper;
  arrangement: "left" | "right";
};
