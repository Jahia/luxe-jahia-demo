import React from 'react';
import {MainLayout} from '../../layouts';
import {
    useServerContext,
    defineJahiaComponent,
    Area,
    Render, getNodeProps
} from '@jahia/javascript-modules-library';
import {Row, Section} from '../../components';

export const BlogDefault = () => {
    const {currentNode} = useServerContext();
    const {'j:defaultCategory': categories} = getNodeProps(currentNode, [
        'j:defaultCategory'
    ]);
    let startNode = currentNode.getAncestors().at(-2)?.getIdentifier();
    if (!startNode) {
        startNode = currentNode.getResolveSite().getIdentifier();
    }

    const relatedBlog = {
        name: 'relatedBlog',
        nodeType: 'luxe:jcrQuery',
        properties: {
            'jcr:title': 'Related Blogs',
            type: currentNode.getPrimaryNodeTypeName(),
            criteria: 'j:lastPublished',
            sortDirection: 'asc',
            maxItems: '3',
            startNode,
            excludeNodes: [currentNode.getIdentifier()],
            noResultText: 'Pas de related Blog !',
            'j:subNodesView': 'card'
        }
    };
    if (Array.isArray(categories) && categories.length > 0) {
        relatedBlog.properties.filter = categories.map(node => node.getIdentifier());
    }

    return (
        <MainLayout>
            <article>
                <Area path="header"
                      areaType="luxe:areaHeader"
                      subNodesView="textDown"
                />
                <Section>
                    <Row className="lux-richtext">
                        <Area name="main"
                              areaType="luxe:areaMain"
                        />
                    </Row>
                    {categories &&
                        <div className="lux-richtext lux-category">
                            {categories.map(node => (
                                <Render key={node.getIdentifier()}
                                        node={node}
                                        view="badge"
                                        editable="false"
                            />
))}
                        </div>}
                </Section>
                <Section>
                    <Render content={relatedBlog}/>
                </Section>
            </article>
        </MainLayout>
    );
};

BlogDefault.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:blog',
    name: 'default',
    componentType: 'template'
});
