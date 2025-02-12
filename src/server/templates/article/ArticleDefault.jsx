import React from 'react';
import {MainLayout} from '../../layouts';
import {
    useServerContext,
    defineJahiaComponent,
    Render, Area
} from '@jahia/javascript-modules-library';

export const ArticleDefault = () => {
    const {currentNode} = useServerContext();
    return (
        <MainLayout>
            <Render node={currentNode} view="fullPage"/>
        </MainLayout>
    );
};

ArticleDefault.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:article',
    name: 'default',
    componentType: 'template'
});
