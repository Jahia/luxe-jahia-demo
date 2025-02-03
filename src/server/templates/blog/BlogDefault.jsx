import React from 'react';
import {MainLayout} from '../../layouts';
import {
    useServerContext,
    defineJahiaComponent,
    Area, Render, AddContentButtons
    // Render,  getNodeProps
} from '@jahia/javascript-modules-library';
import {Row, Section} from '../../components';

export const BlogDefault = () => {
    const {currentNode} = useServerContext();
    // Const blog = getNodeProps(currentNode, [
    //     'relatedBlogs'
    // ]);
    return (
        <MainLayout>
            {/* <Render path="heading" */}
            {/*        parameters={{ */}
            {/*            nodeType: 'luxe:header' */}
            {/*        }}/> */}
            <Area path="heading"
                  allowedTypes={['luxe:header']}
                  subNodesView="textDown"
                  areaType="luxe:areaHeading"/>
            <Section>
                <Row className="lux-richtext">
                    {/* <Render path="main" */}
                    {/*        parameters={{ */}
                    {/*            nodeType: 'jnt:bigText' */}
                    {/*        }}/> */}
                    <Area name="main" areaType="luxe:areaMain"/>
                    {/* <AddContentButtons/> */}
                </Row>
            </Section>
            {/* {blog.relatedBlogs && */}
            {/*    <Render node={currentNode} */}
            {/*            view="relatedContent" */}
            {/*            parameters={{ */}
            {/*                nodeType: 'luxe:agency', */}
            {/*                maxItems: 3, */}
            {/*                label: 'page.relatedContent.agencies', */}
            {/*                descendantPath: '/contents/agencies' */}
            {/*            }}/>} */}
        </MainLayout>
    );
};

BlogDefault.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:blog_2',
    name: 'default',
    componentType: 'template'
});
