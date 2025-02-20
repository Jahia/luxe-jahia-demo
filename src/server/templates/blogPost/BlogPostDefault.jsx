import React from 'react';
import {MainLayout} from '../../layouts';
import {
    useServerContext,
    defineJahiaComponent,
    Render
} from '@jahia/javascript-modules-library';

export const BlogPostDefault = () => {
    const {currentNode} = useServerContext();

    return (
        <MainLayout>
            <Render node={currentNode} view="fullPage"/>
        </MainLayout>
    );
};

BlogPostDefault.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:blogPost',
    name: 'default',
    componentType: 'template'
});
