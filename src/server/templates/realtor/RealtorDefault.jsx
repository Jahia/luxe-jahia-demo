import React from 'react';
import {MainLayout} from '../../layouts';
import {
    useServerContext,
    Render
} from '@jahia/js-server-engine';

export const RealtorDefault = () => {
    const {currentNode} = useServerContext();

    return (
        <MainLayout>
            <Render node={currentNode} view="fullPage"/>
        </MainLayout>
    );
};

RealtorDefault.jahiaComponent = {
    nodeType: 'luxe:realtor',
    name: 'default',
    componentType: 'template'
};
