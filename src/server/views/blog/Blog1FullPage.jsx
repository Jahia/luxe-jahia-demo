import React from 'react';
import {
    useServerContext,
    getNodeProps,
    useUrlBuilder,
    server, defineJahiaComponent, Area, Render, AddContentButtons
} from '@jahia/javascript-modules-library';
import {useTranslation} from 'react-i18next';
import {Row, Section} from '../../components';

export const Blog1FullPage = () => {
    const {t} = useTranslation();
    const {currentNode, renderContext} = useServerContext();
    const {buildStaticUrl} = useUrlBuilder();
    const blog = getNodeProps(currentNode, [
        'title',
        'teaser',
        'image'
    ]);

    const image = {
        src: buildStaticUrl({assetPath: 'img/img-placeholder.jpg'}),
        alt: 'Placeholder'
    };

    if (blog.image) {
        image.src = blog.image.getUrl();
        image.alt = t('alt.blog', {blog: blog.title});

        server.render.addCacheDependency({node: blog.image}, renderContext);
    }

    return (
        <>
            <Render path="heading"
                    view="textDown"/>
            <AddContentButtons nodeTypes="luxe:header" childName="heading"/>
            <Section>
                <Row className="lux-richtext">
                    <Render path="main"/>
                    {/* <Area name="main" */}
                    {/*      allowedTypes={['jnt:bigText']} */}
                    {/*      numberOfItems={1}/> */}
                    <AddContentButtons nodeTypes="jnt:bigText" childName="main"/>
                </Row>
            </Section>
        </>
    );
};

Blog1FullPage.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:blog_1',
    name: 'fullPage',
    componentType: 'view'
});
