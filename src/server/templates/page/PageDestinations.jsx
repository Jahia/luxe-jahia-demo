import React from 'react';
import {Area} from '@jahia/js-server-core';
import {MainLayout} from '../../layouts';
import {Row, Section} from '../../components';

export const PageDestinations = () => {
    return (
        <MainLayout>
            <Area name="heading"
                  allowedTypes={['luxe:header']}
                  subNodesView="textUp"
                  numberOfItems={1}/>
            <Section>
                <Row className="lux-richtext">
                    <Area name="main"
                          allowedTypes={['jnt:bigText']}
                          numberOfItems={1}/>
                </Row>
            </Section>
            <Section>
                <Area name="related-destinations"
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
