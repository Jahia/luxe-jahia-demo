import React from 'react';
import {JArea} from '@jahia/js-server-engine';
import {MainLayout} from '../../layouts';
import {Row, Section} from '../../components';

export const PageDestinations = () => {
    return (
        <MainLayout>
            <JArea name="heading"
                   allowedTypes={['luxe:header']}
                   subNodesView="textUp"
                   numberOfItems={1}/>
            <Section>
                <Row className="lux-richtext">
                    <JArea name="main"
                           allowedTypes={['jnt:bigText']}
                           numberOfItems={1}/>
                </Row>
            </Section>
            <Section>
                <JArea name="related-destinations"
                       allowedTypes={['luxe:textIllustrated', 'luxe:navMenu']}/>
            </Section>
        </MainLayout>
    );
};

PageDestinations.jahiaComponent = {
    nodeType: 'jnt:page',
    name: 'destinations',
    displayName: 'Destinations',
    componentType: 'template'
};
