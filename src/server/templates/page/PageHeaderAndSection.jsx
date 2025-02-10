import React from 'react';
import {Area, defineJahiaComponent} from '@jahia/javascript-modules-library';
import {MainLayout} from '../../layouts';

export const PageHeaderAndSection = () => {
    return (
        <MainLayout>
            <Area name="header" allowedTypes={['luxe:header']} numberOfItems={1}/>
            <Area name="main" allowedTypes={['luxe:section']}/>
        </MainLayout>

    );
};

PageHeaderAndSection.jahiaComponent = defineJahiaComponent({
    nodeType: 'jnt:page',
    name: 'home',
    displayName: 'Header & Sections (Home)',
    componentType: 'template'
});
