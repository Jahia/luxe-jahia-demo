import { Fragment } from "react";
import {
  AddContentButtons,
  getChildNodes,
  getNodeProps,
  jahiaComponent,
  Render,
} from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";

jahiaComponent(
  {
    nodeType: "jnt:linkList",
    name: "separator",
    displayName: "Use Separator",
    componentType: "view",
  },
  (_, { currentNode }) => {
    const links = getChildNodes(
      currentNode,
      -1,
      0,
      (child) =>
        (child as JCRNodeWrapper).getPrimaryNodeTypeName() === "jnt:nodeLink" ||
        (child as JCRNodeWrapper).getPrimaryNodeTypeName() === "jnt:externalLink",
    );

    return (
      <>
        {links.map((node, index) => {
          const { "j:node": internalNode } = getNodeProps(node as JCRNodeWrapper, ["j:node"]);
          const node2Render = internalNode ? internalNode : node;
          if (index > 0) {
            return (
              <Fragment key={node2Render.getIdentifier()}>
                <span className="lux-site-footer_disclaimer_seprator"> / </span>
                <Render node={node2Render} view="link" readOnly />
              </Fragment>
            );
          }

          return (
            <Render key={node2Render.getIdentifier()} node={node2Render} view="link" readOnly />
          );
        })}
        <AddContentButtons />
      </>
    );
  },
);
