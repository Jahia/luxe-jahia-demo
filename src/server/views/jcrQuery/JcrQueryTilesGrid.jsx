import React, {Fragment} from 'react';
import {
    useServerContext,
    getNodeProps,
    server,
    Render,
    getNodesByJCRQuery,
    defineJahiaComponent
} from '@jahia/javascript-modules-library';
import {Col, HeadingSection, Row} from '../../components';
import {useTranslation} from 'react-i18next';
import {buildQuery} from './utils';
import clsx from 'clsx';

export const JcrQueryTilesGrid = () => {
    const {t} = useTranslation();
    const {currentNode, renderContext} = useServerContext();
    const luxeQuery = getNodeProps(currentNode, [
        'jcr:title',
        'type',
        'criteria',
        'sortDirection',
        'maxItems',
        'startNode',
        'excludeNodes',
        'filter',
        'noResultText',
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
                                <Row key={`${row[0].getIdentifier()}-${row[1]?.getIdentifier() || row[0].getIdentifier()}`}>
                                    {row.map(node => (
                                        <Col key={node.getIdentifier()}>
                                            <Render node={node} view={luxeQuery['j:subNodesView'] || 'default'} editable={false}/>
                                        </Col>
                                    ))}
                                </Row>
                            );
                        }

                        return (
                            <Row key={`${row[0].getIdentifier()}-${row[1]?.getIdentifier() || row[0].getIdentifier()}`}>
                                {row.map((node, nodeIndex) => (
                                    <Col key={node.getIdentifier()}
                                         className={clsx({
                                                'col-4': nodeIndex === 0,
                                                'col-8': nodeIndex === 1
                                             })}
                                    >
                                        <Render node={node} view={luxeQuery['j:subNodesView'] || 'default'} editable={false}/>
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

JcrQueryTilesGrid.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:jcrQuery',
    name: 'tilesGrid',
    displayName: 'Tiles Grid',
    componentType: 'view'
});
