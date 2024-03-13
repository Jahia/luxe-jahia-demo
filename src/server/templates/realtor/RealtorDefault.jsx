import React from 'react';
import {MainLayout} from '../../layouts';
import {
    useServerContext,
    JRender
} from '@jahia/js-server-engine';

export const RealtorDefault = () => {
    const {currentNode} = useServerContext();

    return (
        <MainLayout>
            <JRender node={currentNode} view="fullPage"/>
        </MainLayout>
    );
};

RealtorDefault.jahiaComponent = {
    nodeType: 'luxe:realtor',
    name: 'default',
    componentType: 'template'
};
