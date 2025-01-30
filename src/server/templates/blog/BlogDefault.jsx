import React from 'react';
import {MainLayout} from '../../layouts';
import {
    useServerContext,
    Render, defineJahiaComponent
} from '@jahia/javascript-modules-library';

export const BlogDefault = () => {
    const {currentNode} = useServerContext();

    return (
        <MainLayout>
            <Render node={currentNode} view="fullPage"/>
        </MainLayout>
    );
};

BlogDefault.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:blog',
    name: 'default',
    componentType: 'template'
});
