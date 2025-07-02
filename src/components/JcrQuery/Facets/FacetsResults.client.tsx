import { useState, useEffect } from "react";
import classes from "~/components/JcrQuery/Facets/FacetsResults.client.module.css";
import { Col, Row } from "~/commons/grid";
import type { RenderNodeProps } from "~/components/JcrQuery/types";
import SimpleSelect from "~/commons/SimpleSelect";

/* eslint-disable @eslint-react/dom/no-dangerously-set-innerhtml */
export default function FacetsResults({ nodes }: { nodes: RenderNodeProps[] }) {
  // Garde une copie complète de la liste d'origine
  const [allNodes, setAllNodes] = useState<RenderNodeProps[]>(nodes);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Recharge la liste complète si "nodes" change (nouvelle recherche, etc)
  useEffect(() => {
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setAllNodes(nodes);
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setCurrentPage(1); // Reset à la première page
  }, [nodes]);

  const totalPages = Math.ceil(allNodes.length / itemsPerPage);

  // Pagination côté client
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = allNodes.slice(startIndex, endIndex);

  // Changement du nombre d'éléments par page
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Revient page 1 sur changement du nombre d'éléments
  };

  // Pagination précédente/suivante
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Pas de résultat
  const noResults =
    allNodes.length === 0 || (allNodes.length === 1 && allNodes[0].uuid === "no-results");

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div>
          <h2 className={classes.title}>Search Results</h2>
          <span className={classes.count}>
            {allNodes.length} properties found
            {allNodes.length > 0 && !noResults && (
              <span className={classes.pageInfo}>
                {" "}
                - Showing {startIndex + 1}-{Math.min(endIndex, allNodes.length)} of{" "}
                {allNodes.length}
              </span>
            )}
          </span>
        </div>
        <SimpleSelect
          label="Résultats par page :"
          value={itemsPerPage.toString()}
          options={["6", "12", "18", "24"]}
          onChange={handleItemsPerPageChange}
        />
      </div>

      {/* Pagination controls */}
      {totalPages >= 1 && !noResults && (
        <div className={classes.pagination}>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={classes.pageBtn}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? classes.pageBtnActive : classes.pageBtn}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={classes.pageBtn}
          >
            &gt;
          </button>
        </div>
      )}

      <Row className={classes.resultsRow}>
        {noResults ? (
          <Col>
            <div className={classes.noResults}>
              <p className="noResults">No results found</p>
            </div>
          </Col>
        ) : (
          currentProperties.map(({ html, uuid }) => (
            <Col key={uuid}>
              {/* @ts-expect-error <unwanteddiv> is not a valid HTML element */}
              <unwanteddiv
                dangerouslySetInnerHTML={{
                  __html: html,
                }}
              />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}
