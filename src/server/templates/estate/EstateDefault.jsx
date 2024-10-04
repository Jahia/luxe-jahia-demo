import React from 'react';
import {Render, useServerContext, defineJahiaComponent} from '@jahia/js-server-core';
import {MainLayout} from '../../layouts';

export const EstateDefault = () => {
    const {currentNode} = useServerContext();
    return (
        <MainLayout>
            <Render node={currentNode} view="fullPage"/>
        </MainLayout>
    );
};

EstateDefault.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:estate',
    name: 'default',
    componentType: 'template'
});
