import React from 'react';
import {Area, getNodeProps, Render, useServerContext, defineJahiaComponent} from '@jahia/javascript-modules-library';
import {MainLayout} from '../../layouts';
import {Row, Section} from '../../components';

export const PageDestination = () => {
    const {currentNode} = useServerContext();
    const page = getNodeProps(currentNode, ['enableEstates', 'enableAgencies']);
    return (
        <MainLayout>
            <Area name="heading"
                  allowedTypes={['luxe:header']}
                  subNodesView="textDown"
                  numberOfItems={1}/>
            <Section>
                <Row className="lux-richtext">
                    <Area name="main"
                          allowedTypes={['jnt:bigText']}
                          numberOfItems={1}/>
                </Row>
            </Section>
            {page.enableEstates &&
                <Render node={currentNode}
                        view="relatedContent"
                        parameters={{
                            nodeType: 'luxe:estate',
                            maxItems: 6,
                            label: 'page.relatedContent.estateSelection',
                            descendantPath: '/contents/agencies'
                }}/>}

            {page.enableAgencies &&
                <Render node={currentNode}
                        view="relatedContent"
                        parameters={{
                            nodeType: 'luxe:agency',
                            maxItems: 3,
                            label: 'page.relatedContent.agencies',
                            descendantPath: '/contents/agencies'
                        }}/>}
        </MainLayout>

    );
};

PageDestination.jahiaComponent = defineJahiaComponent({
    nodeType: 'jnt:page',
    name: 'destination',
    displayName: 'Destination',
    componentType: 'template'
});
