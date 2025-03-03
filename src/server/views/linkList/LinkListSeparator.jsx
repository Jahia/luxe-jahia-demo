import React, { Fragment } from "react";
import {
  AddContentButtons,
  getChildNodes,
  getNodeProps,
  Render,
  jahiaComponent,
} from "@jahia/javascript-modules-library";

jahiaComponent(
  {
    nodeType: "jnt:linkList",
    name: "separator",
    displayName: "Use Separator",
    componentType: "view",
  },
  (_, { currentNode }) => {
    const links = getChildNodes(currentNode, -1, 0, (child) => {
      return child.getPrimaryNodeTypeName() === "jnt:nodeLink" || "jnt:externalLink";
    });

    return (
      <>
        {links.map((node, index) => {
          const { "j:node": internalNode } = getNodeProps(node, ["j:node"]);
          const node2Render = internalNode ? internalNode : node;
          if (index > 0) {
            return (
              <Fragment key={node2Render.getIdentifier()}>
                <span className="lux-site-footer_disclaimer_seprator"> / </span>
                <Render node={node2Render} view="link" editable={false} />
              </Fragment>
            );
          }

          return (
            <Render
              key={node2Render.getIdentifier()}
              node={node2Render}
              view="link"
              editable={false}
            />
          );
        })}
        <AddContentButtons />
      </>
    );
  },
);
