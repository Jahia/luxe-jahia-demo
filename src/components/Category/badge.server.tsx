import { jahiaComponent } from "@jahia/javascript-modules-library";
import classes from "./component.module.css";
jahiaComponent(
  {
    nodeType: "jnt:category",
    name: "badge",
    displayName: "Badge",
    componentType: "view",
  },
  ({ "jcr:title": title }: { "jcr:title": string }) => (
    <span className={classes.badge}>{title}</span>
  ),
);
