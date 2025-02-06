export const buildQuery = ({luxeQuery, t, server, currentNode, renderContext}) => {
    let warn = null;
    const asContent = 'content';
    // Const descendantPath = luxeQuery.startNode?.getPath() || `/sites/${currentNode.getResolveSite().getSiteKey()}`;
    const descendantPath = luxeQuery.startNode?.getPath() || `${currentNode.getResolveSite().getPath()}`;

    const filter = luxeQuery.filter?.reduce((condition, categoryNode, index) => {
        // If category is deleted, the filter contains "undefined" for the deleted category
        if (!categoryNode) {
            warn = t('query.catIsMissing', {queryName: luxeQuery['jcr:title']});
            return condition;
        }

        return `${condition} ${index === 0 ? '' : 'OR'} ${asContent}.[j:defaultCategory] = '${categoryNode.getIdentifier()}'`;
    }, '') || '';
    const queryFilter = filter.trim().length > 0 ? `AND (${filter})` : '';

    const excludeNodes = luxeQuery.excludeNodes?.reduce((condition, excludeNode, index) => {
        // If category is deleted, the filter contains "undefined" for the deleted category
        if (!excludeNode) {
            warn = t('query.excludeIsMissing', {queryName: luxeQuery['jcr:title']});
            return condition;
        }

        // Const translationNodes = excludeNode.getI18Ns();
        // const translationNode = translationNodes?.find(node => node['jcr:language'] === renderContext.getMainResourceLocale().getLanguage())?.getIdentifier();
        const translationNode = excludeNode.getNode(`j:translation_${renderContext.getMainResourceLocale().getLanguage()}`);
        const extraLanguageNode = translationNode ? `AND ${asContent}.[jcr:uuid] <> '${translationNode.getIdentifier()}'` : '';
        return `${condition} ${index === 0 ? '' : 'OR'} (${asContent}.[jcr:uuid] <> '${excludeNode.getIdentifier()}' ${extraLanguageNode})`;
    }, '') || '';
    const queryExcludeNodes = excludeNodes.trim().length > 0 ? `AND (${excludeNodes})` : '';

    const jcrQuery = `SELECT *
                      FROM [${luxeQuery.type}] AS ${asContent}
                      WHERE ISDESCENDANTNODE('${descendantPath}') ${queryFilter} ${queryExcludeNodes}
                      ORDER BY ${asContent}.[${luxeQuery.criteria}] ${luxeQuery.sortDirection}`;

    server.render.addCacheDependency({flushOnPathMatchingRegexp: `${descendantPath}/.*`}, renderContext);
    return {jcrQuery, warn};
};
