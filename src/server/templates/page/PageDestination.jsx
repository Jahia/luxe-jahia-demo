import React from 'react';
import {Area} from '@jahia/js-server-core';
import {MainLayout} from '../../layouts';
import {Row, Section} from '../../components';

export const PageDestination = () => {
    return (
        <MainLayout>
            <Area name="heading"
                   allowedTypes={['luxe:header']}
                   subNodesView="textDown"
                   numberOfItems={1}/>
            <Section>
                <Row className="lux-richtext">
                    <Area name="main"
                           allowedTypes={['jnt:bigText']} numberOfItems={1}
                           numberOfItems={1}/>
                </Row>
            </Section>
            {/* TODO: do not display section if no destinations */}
            <Section>
                <Area name="related-destinations" allowedTypes={['']}/>
            </Section>
            {/* TODO: do not display section if no agencies */}
            <Section>
                <Area name="related-agencies" allowedTypes={['']}/>
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
