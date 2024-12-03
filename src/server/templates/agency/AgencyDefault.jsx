import React from 'react';
import {MainLayout} from '../../layouts';
import {
    useServerContext,
    Render, defineJahiaComponent
} from '@jahia/javascript-modules-library';

export const AgencyDefault = () => {
    const {currentNode} = useServerContext();

    return (
        <MainLayout>
            <Render node={currentNode} view="fullPage"/>
        </MainLayout>
    );
};

AgencyDefault.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:agency',
    name: 'default',
    componentType: 'template'
});
