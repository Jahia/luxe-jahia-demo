import {
  getNodesByJCRQuery,
  jahiaComponent,
  Render,
  server,
} from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import { Col, HeadingSection, Row } from "~/commons";
import { t } from "i18next";
import { mapToJCRQueryBuilderProps } from "./utils";
import clsx from "clsx";
import type { JcrQueryProps } from "./types";
import alert from "~/templates/css/alert.module.css";
import grid from "~/commons/grid/grid.module.css";
import { JCRQueryBuilder } from "~/components/JcrQuery/JCRQueryBuilder";

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
    // const { jcrQuery, warn } = buildJCRQuery({
    //   luxeQuery: {
    //     "jcr:title": title,
    //     type,
    //     criteria,
    //     sortDirection,
    //     startNode,
    //     filter,
    //     excludeNodes,
    //   },
    //   t,
    //   server,
    //   currentNode,
    //   renderContext,
    // });
    // const queryContent = getNodesByJCRQuery(currentNode.getSession(), jcrQuery, maxItems || -1);
    const jcrQueryBuilderProps = mapToJCRQueryBuilderProps({
      luxeQuery: {
        "jcr:title": title,
        type,
        criteria,
        sortDirection,
        startNode,
        filter,
        excludeNodes,
        "j:subNodesView": subNodeView,
      },
      t,
      currentNode,
      renderContext,
    });

    const builder = new JCRQueryBuilder(jcrQueryBuilderProps);

    const { jcrQuery, warn, cacheDependency } = builder.build();
    server?.render.addCacheDependency(
      { flushOnPathMatchingRegexp: cacheDependency },
      renderContext,
    );
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
          <div className={alert.warning} role="alert">
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
                        [grid.col_4]: nodeIndex === 0,
                        [grid.col_8]: nodeIndex === 1,
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
          <div className={alert.dark} role="alert">
            {t(noResultText || "query.noResult")}
          </div>
        )}
      </>
    );
  },
);
