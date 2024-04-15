export const buildQuery = ({luxeQuery, t, server, currentNode, renderContext}) => {
    let warn = null;
    const asContent = 'content';
    const descendantPath = luxeQuery.startNode?.getPath() || `/sites/${currentNode.getResolveSite().getSiteKey()}`;

    const filter = luxeQuery.filter?.reduce((condition, categoryNode, index) => {
    // If category is deleted, the filter contains "undefined" for the deleted category
        if (!categoryNode) {
            warn = t('query.catIsMissing', {queryName: luxeQuery['jcr:title']});
            return condition;
        }

        return `${condition} ${index === 0 ? '' : 'OR'} ${asContent}.[j:defaultCategory] = '${categoryNode.getIdentifier()}'`;
    }, '') || '';
    const queryFilter = filter.trim().length > 0 ? `AND (${filter})` : '';

    const jcrQuery = `SELECT * FROM [${luxeQuery.type}] AS ${asContent}
                   WHERE ISDESCENDANTNODE('${descendantPath}')
                   ${queryFilter}
                   ORDER BY ${asContent}.[${luxeQuery.criteria}] ${luxeQuery.sortDirection}`;

    server.render.addCacheDependency({flushOnPathMatchingRegexp: `${descendantPath}/.*`}, renderContext);
    return {jcrQuery, warn};
};
