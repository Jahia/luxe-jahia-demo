import { jahiaComponent } from "@jahia/javascript-modules-library";

jahiaComponent(
  {
    nodeType: "jnt:category",
    name: "badge",
    displayName: "Badge",
    componentType: "view",
  },
  ({ "jcr:title": title }: { "jcr:title": string }) => <span>{title}</span>,
);
