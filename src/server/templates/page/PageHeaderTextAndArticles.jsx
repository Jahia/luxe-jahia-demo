import React from 'react';
import {Area, defineJahiaComponent, useServerContext, Render} from '@jahia/javascript-modules-library';
import {MainLayout} from '../../layouts';
import {Row, Section} from '../../components';

export const PageHeaderTextAndArticles = () => {
    const {renderContext} = useServerContext();
    // Const articleFolderNode = renderContext.getSite().getNode('contents/magazine/need-triage');
    // const articleFolderNode = renderContext.getSite().getNode('contents/magazine');
    const articleFolderNode = renderContext.getSite().getNode('contents/mag');

    // Const articleFolder = currentNode.getSession().getNode(`${renderContext.getSite()}/contents/magazine/need-triage`);

    // Const year = new Date().getFullYear();
    // const months = new Date().toLocaleDateString(
    //     renderContext.getSite().getDefaultLanguage(),
    //     {
    //         month: 'long'
    //     }
    // ).toLowerCase();
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
                <Area name="main" numberOfItems="1"/>
            </Section>
            {renderContext.isEditMode() &&
                <Section>
                    {/* <Render path={`${renderContext.getSite()}/contents/magazine/${year}/${months}`} */}
                    {/*        view="createArticle" */}
                    {/* /> */}
                    <Render node={articleFolderNode}
                            view="createArticle"
                    />
                </Section>}
        </MainLayout>
    );
};

PageHeaderTextAndArticles.jahiaComponent = defineJahiaComponent({
    nodeType: 'jnt:page',
    name: 'articles',
    displayName: 'Header, Text & Articles',
    componentType: 'template'
});
