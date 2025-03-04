import {
  getNodesByJCRQuery,
  jahiaComponent,
  Render,
  server,
} from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import { HeadingSection } from "../../components";
import { useTranslation } from "react-i18next";
import { buildQuery } from "./utils";
import { jcrQueryTypes } from "./types";

jahiaComponent(
  {
    nodeType: "luxe:jcrQuery",
    name: "inline",
    displayName: "Inline Result",
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
    }: jcrQueryTypes,
    { currentNode, renderContext },
  ) => {
    const { t } = useTranslation();
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
        {title && <HeadingSection title={title} />}

        {renderContext.isEditMode() && warn && (
          <div className="alert alert-warning" role="alert">
            {warn}
          </div>
        )}

        {queryContent &&
          queryContent.map((node) => (
            <Render
              key={node.getIdentifier()}
              node={node as JCRNodeWrapper}
              view={subNodeView || "default"}
            />
          ))}
        {(!queryContent || queryContent.length === 0) && renderContext.isEditMode() && (
          <div className="alert alert-dark" role="alert">
            {t(noResultText || "query.noResult")}
          </div>
        )}
      </>
    );
  },
);
