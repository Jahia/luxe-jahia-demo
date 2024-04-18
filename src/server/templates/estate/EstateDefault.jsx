import React from 'react';
import {Render, useServerContext} from '@jahia/js-server-core';
import {MainLayout} from '../../layouts';

export const EstateDefault = () => {
    const {currentNode} = useServerContext();
    return (
        <MainLayout
            head={<meta name="description" content="content template"/>}
        >
            <Render node={currentNode} view="fullPage"/>
        </MainLayout>

    );
};

EstateDefault.jahiaComponent = {
    nodeType: 'luxe:estate',
    name: 'default',
    componentType: 'template'
};
