import React from 'react';
import {MainLayout} from '../../layouts';
import {
    useServerContext,
    Render,
    defineJahiaComponent
} from '@jahia/javascript-modules-library';

export const RealtorDefault = () => {
    const {currentNode} = useServerContext();

    return (
        <MainLayout>
            <Render node={currentNode} view="fullPage"/>
        </MainLayout>
    );
};

RealtorDefault.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:realtor',
    name: 'default',
    componentType: 'template'
});
