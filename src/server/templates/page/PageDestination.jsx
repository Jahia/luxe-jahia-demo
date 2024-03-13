import React from 'react';
import {JArea} from '@jahia/js-server-engine';
import {MainLayout} from '../../layouts';
import {Row, Section} from '../../components';

export const PageDestination = () => {
    return (
        <MainLayout>
            <JArea name="heading"
                   allowedTypes={['luxe:header']}
                   subNodesView="textDown"
                   numberOfItems={1}/>
            <Section>
                <Row className="lux-richtext">
                    <JArea name="main"
                           allowedTypes={['jnt:bigText']}
                           numberOfItems={1}/>
                </Row>
            </Section>
            <Section>
                <JArea name="related-destinations" allowedTypes={['']}/>
            </Section>
            <Section>
                <JArea name="related-agencies" allowedTypes={['']}/>
            </Section>
        </MainLayout>

    );
};

PageDestination.jahiaComponent = {
    nodeType: 'jnt:page',
    name: 'destination',
    displayName: 'Destination',
    componentType: 'template'
};
