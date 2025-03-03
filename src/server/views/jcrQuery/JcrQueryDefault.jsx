import React from "react";
import {
  useServerContext,
  getNodeProps,
  server,
  Render,
  getNodesByJCRQuery,
  defineJahiaComponent,
} from "@jahia/javascript-modules-library";
import { Col, HeadingSection, Row } from "../../components";
import { useTranslation } from "react-i18next";
import { buildQuery } from "./utils";

export const JcrQueryDefault = () => {
  const { t } = useTranslation();
  const { currentNode, renderContext } = useServerContext();
  const luxeQuery = getNodeProps(currentNode, [
    "jcr:title",
    "type",
    "criteria",
    "sortDirection",
    "maxItems",
    "startNode",
    "excludeNodes",
    "filter",
    "noResultText",
    "j:subNodesView",
  ]);
  const noResultText = luxeQuery.noResultText ? t(luxeQuery.noResultText) : t("query.noResult");
  const { jcrQuery, warn } = buildQuery({ luxeQuery, t, server, currentNode, renderContext });
  const queryContent = getNodesByJCRQuery(
    currentNode.getSession(),
    jcrQuery,
    luxeQuery.maxItems || -1,
  );

  return (
    <>
      {luxeQuery["jcr:title"] && queryContent && queryContent.length > 0 && (
        <HeadingSection title={luxeQuery["jcr:title"]} />
      )}
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
                  node={node}
                  view={luxeQuery["j:subNodesView"] || "default"}
                  editable={false}
                />
              </Col>
            );
          })}
        </Row>
      )}
      {(!queryContent || queryContent.length === 0) && renderContext.isEditMode() && (
        <div className="alert alert-dark" role="alert">
          {noResultText}
        </div>
      )}
    </>
  );
};

JcrQueryDefault.jahiaComponent = defineJahiaComponent({
  nodeType: "luxe:jcrQuery",
  name: "default",
  componentType: "view",
});
