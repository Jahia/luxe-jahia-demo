import React from 'react';
import {Render, useServerContext, defineJahiaComponent} from '@jahia/javascript-modules-library';
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
