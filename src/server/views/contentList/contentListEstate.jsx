import React from 'react';
import {Col, HeadingSection, Row, Section} from '../../components';
import {useTranslation} from 'react-i18next';
import {Render, useServerContext, getChildNodes, AddContentButtons} from '@jahia/js-server-core';

export const ContentListEstate = () => {
    const {t} = useTranslation();
    const {currentNode, currentResource} = useServerContext();

    // Const contents = getNodeProps(currentNode, ['j:view']);
    const estates = getChildNodes(currentNode, 6, 0, childNode =>
        childNode.isNodeType('luxe:estate')
    );

    const subNodesView = currentResource.getModuleParams().get('subNodesView');

    return (
        <Row className="row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-0">
            {estates.map(estate => (
                <Col key={estate.getIdentifier()} className="g-0">
                    <Render node={estate} view={subNodesView || 'default'}/>
                </Col>
            ))}
            <AddContentButtons childName="estates" nodeTypes="luxe:estate"/>
        </Row>
    );
};

ContentListEstate.jahiaComponent = {
    nodeType: 'jnt:contentList',
    name: 'Estates',
    componentType: 'view'
};
