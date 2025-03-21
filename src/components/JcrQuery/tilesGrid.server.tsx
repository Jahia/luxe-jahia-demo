import {
  getNodesByJCRQuery,
  jahiaComponent,
  Render,
  server,
} from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import { Col, HeadingSection, Row } from "~/commons";
import { t } from "i18next";
import { buildQuery } from "./utils";
import clsx from "clsx";
import type { JcrQueryProps } from "./types";

jahiaComponent(
  {
    nodeType: "luxe:jcrQuery",
    name: "tilesGrid",
    displayName: "Tiles Grid",
    componentType: "view",
  },
  (
    {
      "jcr:title": title,
      type,
      criteria,
      sortDirection,
      maxItems,
      startNode,
      excludeNodes,
      filter,
      noResultText,
      "j:subNodesView": subNodeView,
    }: JcrQueryProps,
    { currentNode, renderContext },
  ) => {
    const { jcrQuery, warn } = buildQuery({
      luxeQuery: {
        "jcr:title": title,
        type,
        criteria,
        sortDirection,
        startNode,
        filter,
        excludeNodes,
      },
      t,
      server,
      currentNode,
      renderContext,
    });
    const queryContent = getNodesByJCRQuery(currentNode.getSession(), jcrQuery, maxItems || -1);
    const rowQueryContent = queryContent.reduce((row: JCRNodeWrapper[][], node, index) => {
      if (index % 2 === 0) {
        row.push([node as JCRNodeWrapper]);
      } else {
        const currentRow = row.pop();
        if (currentRow) {
          currentRow.push(node as JCRNodeWrapper);
          row.push(currentRow);
        }
      }
      return row;
    }, []);

    return (
      <>
        {title && <HeadingSection title={title} />}
        {renderContext.isEditMode() && warn && (
          <div className="alert alert-warning" role="alert">
            {warn}
          </div>
        )}

        {rowQueryContent && rowQueryContent.length > 0 && (
          <>
            {rowQueryContent.map((row, index) => {
              if (index % 2 === 0) {
                return (
                  <Row
                    key={`${row[0].getIdentifier()}-${row[1]?.getIdentifier() || row[0].getIdentifier()}`}
                  >
                    {row.map((node) => (
                      <Col key={node.getIdentifier()}>
                        <Render node={node} view={subNodeView || "default"} readOnly />
                      </Col>
                    ))}
                  </Row>
                );
              }

              return (
                <Row
                  key={`${row[0].getIdentifier()}-${row[1]?.getIdentifier() || row[0].getIdentifier()}`}
                >
                  {row.map((node, nodeIndex) => (
                    <Col
                      key={node.getIdentifier()}
                      className={clsx({
                        "col-4": nodeIndex === 0,
                        "col-8": nodeIndex === 1,
                      })}
                    >
                      <Render node={node} view={subNodeView || "default"} readOnly />
                    </Col>
                  ))}
                </Row>
              );
            })}
          </>
        )}
        {(!queryContent || queryContent.length === 0) && renderContext.isEditMode() && (
          <div className="alert alert-dark" role="alert">
            {t(noResultText || "query.noResult")}
          </div>
        )}
      </>
    );
  },
);
