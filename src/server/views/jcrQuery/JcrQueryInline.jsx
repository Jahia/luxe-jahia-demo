import React from 'react';
import {
    useServerContext,
    getNodeProps,
    server,
    Render,
    getNodesByJCRQuery
} from '@jahia/js-server-core';
import {HeadingSection} from '../../components';
import {useTranslation} from 'react-i18next';

export const JcrQueryInline = () => {
    const {t} = useTranslation();
    const {currentNode, renderContext} = useServerContext();
    const luxeQuery = getNodeProps(currentNode, [
        'jcr:title',
        'type',
        'criteria',
        'sortDirection',
        'maxItems',
        'startNode',
        'filter',
        'j:subNodesView'
    ]);
    const asContent = 'content';
    const descendantPath = luxeQuery.startNode?.getPath() || `/sites/${currentNode.getResolveSite().getSiteKey()}`;

    const filter = luxeQuery.filter?.reduce((condition, categoryNode, index) =>
        `${condition} ${index === 0 ? '' : 'OR'} ${asContent}.[j:defaultCategory] = '${categoryNode.getIdentifier()}'`
    , '') || '';
    const queryFilter = filter.trim().length > 0 ? `AND (${filter})` : '';

    const jcrQuery = `SELECT * FROM [${luxeQuery.type}] AS ${asContent}
                   WHERE ISDESCENDANTNODE('${descendantPath}')
                   ${queryFilter}
                   ORDER BY ${asContent}.[${luxeQuery.criteria}] ${luxeQuery.sortDirection}`;

    server.render.addCacheDependency({flushOnPathMatchingRegexp: `${descendantPath}/.*`}, renderContext);

    const queryContent = getNodesByJCRQuery(currentNode.getSession(), jcrQuery, luxeQuery.maxItems || -1);

    return (
        <>
            {luxeQuery['jcr:title'] &&
                <HeadingSection title={luxeQuery['jcr:title']}/>}

            {queryContent && queryContent.map(node =>
                <Render key={node.getIdentifier()} node={node} view={luxeQuery['j:subNodesView'] || 'default'}/>
            )}
            {(!queryContent || queryContent.length === 0) && <em>{t('query.noResult')}</em>}
        </>
    );
};

JcrQueryInline.jahiaComponent = {
    nodeType: 'luxe:jcrQuery',
    name: 'inline',
    componentType: 'view'
};
