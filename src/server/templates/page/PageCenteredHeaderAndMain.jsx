import React from 'react';
import {Area, defineJahiaComponent} from '@jahia/javascript-modules-library';
import {MainLayout} from '../../layouts';

export const PageCenteredHeaderAndMain = () => {
    return (
        <MainLayout className="lux-centeredLayout">
            <Area name="header" allowedTypes={['luxe:header']} numberOfItems={1}/>
            <Area name="main"/>
        </MainLayout>

    );
};

PageCenteredHeaderAndMain.jahiaComponent = defineJahiaComponent({
    nodeType: 'jnt:page',
    name: 'centered',
    displayName: 'Centered Header & Main ',
    componentType: 'template'
});
