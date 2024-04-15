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
import {buildQuery} from './utils';

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
    const {jcrQuery, warn} = buildQuery({luxeQuery, t, server, currentNode, renderContext});
    const queryContent = getNodesByJCRQuery(currentNode.getSession(), jcrQuery, luxeQuery.maxItems || -1);

    return (
        <>
            {renderContext.isEditMode() && warn &&
                <p className="text-warning">{warn}</p>}
            {luxeQuery['jcr:title'] &&
                <HeadingSection title={luxeQuery['jcr:title']}/>}

            {queryContent && queryContent.map(node =>
                <Render key={node.getIdentifier()} node={node} view={luxeQuery['j:subNodesView'] || 'default'}/>
            )}
            {(!queryContent || queryContent.length === 0) && renderContext.isEditMode() &&
                <div className="alert alert-dark" role="alert">{t('query.noResult')}</div>}
        </>
    );
};

JcrQueryInline.jahiaComponent = {
    nodeType: 'luxe:jcrQuery',
    name: 'inline',
    componentType: 'view'
};
