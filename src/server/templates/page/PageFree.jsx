import React from 'react';
import {Area, defineJahiaComponent} from '@jahia/javascript-modules-library';
import {MainLayout} from '../../layouts';

export const PageFree = () => {
    return (
        <MainLayout>
            <Area name="main"/>
        </MainLayout>

    );
};

PageFree.jahiaComponent = defineJahiaComponent({
    nodeType: 'jnt:page',
    name: 'free',
    displayName: 'Free Design',
    componentType: 'template'
});
