import React from 'react';
import {Area, defineJahiaComponent} from '@jahia/javascript-modules-library';
import {MainLayout} from '../../layouts';
import {Row, Section} from '../../components';

export const PageHeaderTextAndFree = () => {
    return (
        <MainLayout>
            <Area name="header"
                  allowedTypes={['luxe:header']}
                  subNodesView="textUp"
                  numberOfItems={1}/>
            <Section>
                <Row className="lux-richtext">
                    <Area name="text"
                          allowedTypes={['jnt:bigText']}
                          numberOfItems={1}/>
                </Row>
            </Section>
            <Section>
                <Area name="main"/>
            </Section>
        </MainLayout>
    );
};

PageHeaderTextAndFree.jahiaComponent = defineJahiaComponent({
    nodeType: 'jnt:page',
    name: 'main',
    displayName: 'Header, Text & Free Design',
    componentType: 'template'
});
