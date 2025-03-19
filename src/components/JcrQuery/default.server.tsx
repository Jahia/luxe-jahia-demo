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
import type { JcrQueryProps } from "./types";

jahiaComponent(
  {
    nodeType: "luxe:jcrQuery",
    name: "default",
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

    return (
      <>
        {title && queryContent && queryContent.length > 0 && <HeadingSection title={title} />}
        {renderContext.isEditMode() && warn && (
          <div className="alert alert-warning" role="alert">
            {warn}
          </div>
        )}

        {queryContent && queryContent.length > 0 && (
          <Row className="row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-0">
            {queryContent.map((node) => {
              return (
                <Col key={node.getIdentifier()} className="g-0">
                  <Render
                    node={node as JCRNodeWrapper}
                    view={subNodeView || "default"}
                    editable={false}
                  />
                </Col>
              );
            })}
          </Row>
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
