import React from 'react';
import {defineJahiaComponent, Render, useServerContext} from '@jahia/javascript-modules-library';
import {MainLayout} from '../../layouts';

export const MainRessourceDefault = () => {
    const {currentNode} = useServerContext();
    return (
        <MainLayout>
            <Render node={currentNode} view="fullPage"/>
        </MainLayout>

    );
};

MainRessourceDefault.jahiaComponent = defineJahiaComponent({
    nodeType: 'jmix:mainResource',
    name: 'default',
    displayName: 'Default Main Resource',
    componentType: 'template'
});
