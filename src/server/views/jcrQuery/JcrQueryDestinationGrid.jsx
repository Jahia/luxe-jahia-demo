import React, {Fragment} from 'react';
import {
    useServerContext,
    getNodeProps,
    server,
    Render,
    getNodesByJCRQuery,
    defineJahiaComponent
} from '@jahia/js-server-core';
import {Col, HeadingSection, Row} from '../../components';
import {useTranslation} from 'react-i18next';
import {buildQuery} from './utils';
import clsx from 'clsx';

export const JcrQueryDestinationGrid = () => {
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
    let queryContent = getNodesByJCRQuery(currentNode.getSession(), jcrQuery, luxeQuery.maxItems || -1);

    queryContent = queryContent.reduce((row, node, index) => {
        if (index % 2 === 0) {
            row.push([node]);
        } else {
            const currentRow = row.pop();
            currentRow.push(node);
            row.push(currentRow);
        }

        return row;
    }, []);

    return (
        <>
            {luxeQuery['jcr:title'] &&
                <HeadingSection title={luxeQuery['jcr:title']}/>}
            {renderContext.isEditMode() && warn &&
                <div className="alert alert-warning" role="alert">{warn}</div>}

            {queryContent && queryContent.length > 0 &&
                <>
                    {queryContent.map((row, index) => {
                        if (index % 2 === 0) {
                            return (
                                <Row key={`${row[0].getIdentifier()}-${row[1].getIdentifier() || '0'}`}>
                                    {row.map(node => (
                                        <Col key={node.getIdentifier()}>
                                            <Render node={node} view={luxeQuery['j:subNodesView'] || 'default'}/>
                                        </Col>
                                    ))}
                                </Row>
                            );
                        }

                        return (
                            <Row key={`${row[0].getIdentifier()}-${row[1].getIdentifier() || '0'}`}>
                                {row.map((node, nodeIndex) => (
                                    <Col key={node.getIdentifier()}
                                         className={clsx({
                                                'col-4': nodeIndex === 0,
                                                'col-8': nodeIndex === 1
                                             })}
                                    >
                                        <Render node={node} view={luxeQuery['j:subNodesView'] || 'default'}/>
                                    </Col>
                                    ))}
                            </Row>
                        );
                    })}
                </>}
            {(!queryContent || queryContent.length === 0) && renderContext.isEditMode() &&
                <div className="alert alert-dark" role="alert">{t('query.noResult')}</div>}
        </>
    );
};

JcrQueryDestinationGrid.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:jcrQuery',
    name: 'destination-grid',
    componentType: 'view'
});
