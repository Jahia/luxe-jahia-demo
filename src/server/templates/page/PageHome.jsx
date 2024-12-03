import React from 'react';
import {Area, defineJahiaComponent} from '@jahia/javascript-modules-library';
import {MainLayout} from '../../layouts';

export const PageHome = () => {
    return (
        <MainLayout
            head={<title>LuXE Demo</title>}
        >
            <Area name="heading" allowedTypes={['luxe:header']} numberOfItems={1}/>
            <Area name="main" allowedTypes={['luxe:section']}/>
        </MainLayout>

    );
};

PageHome.jahiaComponent = defineJahiaComponent({
    nodeType: 'jnt:page',
    name: 'home',
    displayName: 'Home',
    componentType: 'template'
});
