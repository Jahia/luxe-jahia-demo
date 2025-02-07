import React from 'react';
import {
    useServerContext,
    getNodeProps,
    defineJahiaComponent, Render, AddContentButtons
} from '@jahia/javascript-modules-library';
import {useTranslation} from 'react-i18next';
import {Row, Section} from '../../components';

export const ArticleFullPage = () => {
    const {currentNode} = useServerContext();
    const {'j:defaultCategory': categories} = getNodeProps(currentNode, [
        'j:defaultCategory'
    ]);
    let startNode = currentNode.getAncestors().at(-2)?.getIdentifier();
    if (!startNode) {
        startNode = currentNode.getResolveSite().getIdentifier();
    }

    const relatedArticles = {
        name: 'relatedArticles',
        nodeType: 'luxe:jcrQuery',
        properties: {
            'jcr:title': 'Related Articles',
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
        relatedArticles.properties.filter = categories.map(node => node.getIdentifier());
    }

    return (
        <article>
            <Render path="header"
                    view="textDownFull"/>
            <AddContentButtons nodeTypes="luxe:header" childName="header"/>
            <Section>
                <Row className="lux-richtext">
                    <Render path="main"/>
                    <AddContentButtons nodeTypes="jnt:bigText" childName="main"/>
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
                <Render content={relatedArticles}/>
            </Section>
        </article>
    );
};

ArticleFullPage.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:article',
    name: 'fullPage',
    componentType: 'view'
});
