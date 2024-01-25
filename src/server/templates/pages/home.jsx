import React from 'react';
import {JArea} from '@jahia/js-server-engine';
import {MainLayout} from '../../layouts';

export const PageHome = () => {
    return (
        <MainLayout
            head={<meta name="description" content="hello"/>}
        >
            <h1>Home Template</h1>
            <JArea name="pagecontent"/>
        </MainLayout>

    );
};

PageHome.jahiaComponent = {
    id: 'page_home',
    nodeType: 'jnt:page',
    name: 'home',
    displayName: 'Home React template',
    componentType: 'template'
};
