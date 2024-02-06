import React from 'react';
import {JArea} from '@jahia/js-server-engine';
import {MainLayout} from '../../layouts';

export const Home = () => {
    return (
        <MainLayout
            head={<meta name="description" content="hello"/>}
        >
            <JArea name="heading" allowedTypes={['luxe:header']} numberOfItems={1}/>
            <JArea name="main" allowedTypes={['luxe:section']}/>
        </MainLayout>

    );
};

Home.jahiaComponent = {
    id: 'homeCmp',
    nodeType: 'jnt:page',
    name: 'home',
    displayName: 'Home',
    componentType: 'template'
};
