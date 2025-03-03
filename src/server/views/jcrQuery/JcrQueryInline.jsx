import React from "react";
import {
  useServerContext,
  getNodeProps,
  server,
  Render,
  getNodesByJCRQuery,
  defineJahiaComponent,
} from "@jahia/javascript-modules-library";
import { HeadingSection } from "../../components";
import { useTranslation } from "react-i18next";
import { buildQuery } from "./utils";

export const JcrQueryInline = () => {
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
  const { jcrQuery, warn } = buildQuery({ luxeQuery, t, server, currentNode, renderContext });
  const queryContent = getNodesByJCRQuery(
    currentNode.getSession(),
    jcrQuery,
    luxeQuery.maxItems || -1,
  );

  return (
    <>
      {luxeQuery["jcr:title"] && <HeadingSection title={luxeQuery["jcr:title"]} />}

      {renderContext.isEditMode() && warn && (
        <div className="alert alert-warning" role="alert">
          {warn}
        </div>
      )}

      {queryContent &&
        queryContent.map((node) => (
          <Render
            key={node.getIdentifier()}
            node={node}
            view={luxeQuery["j:subNodesView"] || "default"}
          />
        ))}
      {(!queryContent || queryContent.length === 0) && renderContext.isEditMode() && (
        <div className="alert alert-dark" role="alert">
          {t("query.noResult")}
        </div>
      )}
    </>
  );
};

JcrQueryInline.jahiaComponent = defineJahiaComponent({
  nodeType: "luxe:jcrQuery",
  name: "inline",
  componentType: "view",
});
