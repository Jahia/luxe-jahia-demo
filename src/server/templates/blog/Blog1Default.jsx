import React from 'react';
import {MainLayout} from '../../layouts';
import {
    useServerContext,
    defineJahiaComponent,
    Render
} from '@jahia/javascript-modules-library';

export const Blog1Default = () => {
    const {currentNode} = useServerContext();
    // Const blog = getNodeProps(currentNode, [
    //     'relatedBlogs'
    // ]);
    return (
        <MainLayout>
            <Render node={currentNode} view="fullPage"/>
        </MainLayout>
    );
};

Blog1Default.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:blog_1',
    name: 'default',
    componentType: 'template'
});
