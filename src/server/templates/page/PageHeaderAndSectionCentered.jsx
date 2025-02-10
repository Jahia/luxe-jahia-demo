import React from 'react';
import {Area, defineJahiaComponent} from '@jahia/javascript-modules-library';
import {MainLayout} from '../../layouts';

export const PageHeaderAndSectionCentered = () => {
    return (
        <MainLayout className="lux-centeredLayout">
            <Area name="header" allowedTypes={['luxe:header']} numberOfItems={1}/>
            <Area name="main" allowedTypes={['luxe:section']}/>
        </MainLayout>

    );
};

PageHeaderAndSectionCentered.jahiaComponent = defineJahiaComponent({
    nodeType: 'jnt:page',
    name: 'centered',
    displayName: 'Header & Sections centered',
    componentType: 'template'
});
