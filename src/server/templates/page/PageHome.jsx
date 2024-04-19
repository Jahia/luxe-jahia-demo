import React from 'react';
import {Area} from '@jahia/js-server-core';
import {MainLayout} from '../../layouts';

export const PageHome = () => {
    return (
        <MainLayout
            head={
                <>
                    <title>LuXE Demo</title>
                    <meta name="description" content="luXE: demonstration website created by Jahia. Jahia the best user experience"/>
                </>
            }
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
