import React from 'react';
import {Area, defineJahiaComponent, useServerContext, Render} from '@jahia/javascript-modules-library';
import {MainLayout} from '../../layouts';
import {Row, Section} from '../../components';

export const PageHeaderTextAndArticles = () => {
    const {renderContext} = useServerContext();
    const articleFolderNode = renderContext.getSite().getNode('contents/blog');

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
                {renderContext.isEditMode() &&
                    <Render node={articleFolderNode}
                            view="createArticle"
                    />}
                <Area name="main" numberOfItems="1"/>
                {renderContext.isEditMode() &&
                    <Render node={articleFolderNode}
                            view="createArticle"
                    />}
            </Section>

            <Section/>
        </MainLayout>
    );
};

PageHeaderTextAndArticles.jahiaComponent = defineJahiaComponent({
    nodeType: 'jnt:page',
    name: 'articles',
    displayName: 'Header, Text & Articles',
    componentType: 'template'
});
