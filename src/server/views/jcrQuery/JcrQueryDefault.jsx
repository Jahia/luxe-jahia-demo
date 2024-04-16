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

export const JcrQueryDefault = () => {
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
            {luxeQuery['jcr:title'] &&
                <HeadingSection title={luxeQuery['jcr:title']}/>}
            {renderContext.isEditMode() && warn &&
                <div className="alert alert-warning" role="alert">{warn}</div>}

            {queryContent && queryContent.length > 0 &&
                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-0">
                    {queryContent.map(node => {
                            return (
                                <div key={node.getIdentifier()} className="col g-0">
                                    <Render node={node} view={luxeQuery['j:subNodesView'] || 'default'}/>
                                </div>
                            );
                        })}
                </div>}
            {(!queryContent || queryContent.length === 0) && renderContext.isEditMode() &&
                <div className="alert alert-dark" role="alert">{t('query.noResult')}</div>}
        </>
    );
};

JcrQueryDefault.jahiaComponent = {
    nodeType: 'luxe:jcrQuery',
    name: 'default',
    componentType: 'view'
};
