import React from 'react';
import {Area} from '@jahia/js-server-engine';
import {MainLayout} from '../../layouts';

export const PageHome = () => {
    return (
        <MainLayout
            head={<meta name="description" content="hello"/>}
        >
            <Area name="heading" allowedTypes={['luxe:header']} numberOfItems={1}/>
            <Area name="main" allowedTypes={['luxe:section']}/>
        </MainLayout>

    );
};

PageHome.jahiaComponent = {
    nodeType: 'jnt:page',
    name: 'home',
    displayName: 'Home',
    componentType: 'template'
};
