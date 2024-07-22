import React from 'react';
import {Area} from '@jahia/js-server-core';
import {MainLayout} from '../../layouts';

export const PageCentered = () => {
    return (
        <MainLayout className="lux-centeredLayout">
            <Area name="heading" allowedTypes={['luxe:header']} numberOfItems={1}/>
            <Area name="main" allowedTypes={['luxe:section']}/>
        </MainLayout>

    );
};

PageCentered.jahiaComponent = {
    nodeType: 'jnt:page',
    name: 'centered',
    displayName: 'Centered',
    componentType: 'template'
};
