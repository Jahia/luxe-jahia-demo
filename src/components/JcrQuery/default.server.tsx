import {
  getNodesByJCRQuery,
  jahiaComponent,
  Render,
  server,
} from "@jahia/javascript-modules-library";
import type { JCRNodeWrapper } from "org.jahia.services.content";
import classes from "./default.module.css";
import alert from "~/templates/css/alert.module.css";
import { Col, HeadingSection, Row } from "~/commons";
import { t } from "i18next";
import { mapToJCRQueryBuilderProps } from "./utils";
import type { JcrQueryProps } from "./types";
import { JCRQueryBuilder } from "~/components/JcrQuery/JCRQueryBuilder";

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

    return (
      <div className={classes.root}>
        {title && queryContent && queryContent.length > 0 && <HeadingSection title={title} />}
        {renderContext.isEditMode() && warn && (
          <div className={alert.warning} role="alert">
            {warn}
          </div>
        )}

        {queryContent && queryContent.length > 0 && (
          <Row className={classes.main}>
            {queryContent.map((node) => {
              return (
                <Col key={node.getIdentifier()}>
                  <Render node={node as JCRNodeWrapper} view={subNodeView || "default"} readOnly />
                </Col>
              );
            })}
          </Row>
        )}
        {(!queryContent || queryContent.length === 0) && renderContext.isEditMode() && (
          <div className={alert.dark} role="alert">
            {t(noResultText || "query.noResult")}
          </div>
        )}
      </div>
    );
  },
);
