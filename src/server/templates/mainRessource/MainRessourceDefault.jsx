import React from 'react';
import {Render, useServerContext} from '@jahia/js-server-core';
import {MainLayout} from '../../layouts';

export const MainRessourceDefault = () => {
    const {currentNode} = useServerContext();
    return (
        <MainLayout
            head={<meta name="description" content="content template"/>}
        >
            <h1>Main</h1>
            <Render node={currentNode} view="fullPage"/>
        </MainLayout>

    );
};

MainRessourceDefault.jahiaComponent = {
    nodeType: 'jmix:mainResource',
    name: 'default',
    displayName: 'Default Main Resource',
    componentType: 'template'
};
