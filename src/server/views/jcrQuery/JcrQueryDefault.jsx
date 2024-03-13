import React from 'react';
import {
    useServerContext,
    getNodeProps,
    jAddCacheDependency,
    JRender,
    getNodesByJCRQuery
} from '@jahia/js-server-engine';
import {HeadingSection} from '../../components';

export const JcrQueryDefault = () => {
    const {currentNode} = useServerContext();
    const luxeQuery = getNodeProps(currentNode, [
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

    jAddCacheDependency({flushOnPathMatchingRegexp: `${descendantPath}/.*`});

    const queryContent = getNodesByJCRQuery(currentNode.getSession(), jcrQuery, luxeQuery.maxItems || -1);

    return (
        <>
            <HeadingSection title={currentNode.getDisplayableName()}/>
            <div className="row row-cols-3 g-0">
                {queryContent && queryContent.map(node => {
                        return (
                            <div key={node.getIdentifier()} className="col g-0">
                                <JRender node={node} view={luxeQuery['j:subNodesView'] || 'default'}/>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

JcrQueryDefault.jahiaComponent = {
    nodeType: 'luxe:jcrQuery',
    name: 'default',
    componentType: 'view'
};