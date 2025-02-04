import React from 'react';
import {MainLayout} from '../../layouts';
import {
    useServerContext,
    defineJahiaComponent,
    Area, Render
    // Render,  getNodeProps
} from '@jahia/javascript-modules-library';
import {Row, Section} from '../../components';

export const Blog3Default = () => {
    const {currentNode} = useServerContext();
    // Const blog = getNodeProps(currentNode, [
    //     'relatedBlogs'
    // ]);
    return (
        <MainLayout>
            <Area path="heading"
                  areaType="luxe:header"
                  areaView="textDown"
              />
            {/* <Render path="heading" */}
            {/*        parameters={{ */}
            {/*            nodeType: 'luxe:header' */}
            {/*        }}/> */}
            <Section>
                <Row className="lux-richtext">
                    <Area name="main"
                          areaType="jnt:bigText"
                    />
                    {/* <Render path="main" */}
                    {/*        parameters={{ */}
                    {/*            nodeType: 'jnt:bigText' */}
                    {/*        }}/> */}
                    {/* <AddContentButtons/> */}
                </Row>
            </Section>

            <Render node={currentNode}
                    view="relatedCard"
            />
        </MainLayout>
    );
};

Blog3Default.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:blog_3',
    name: 'default',
    componentType: 'template'
});
