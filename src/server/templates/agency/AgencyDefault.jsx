import React from 'react';
import {MainLayout} from '../../layouts';
import {
    useServerContext,
    Render
} from '@jahia/js-server-core';

export const AgencyDefault = () => {
    const {currentNode} = useServerContext();

    return (
        <MainLayout>
            <Render node={currentNode} view="fullPage"/>
        </MainLayout>
    );
};

AgencyDefault.jahiaComponent = {
    nodeType: 'luxe:agency',
    name: 'default',
    componentType: 'template'
};
