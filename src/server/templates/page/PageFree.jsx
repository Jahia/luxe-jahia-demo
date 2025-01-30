import React from 'react';
import {Area, defineJahiaComponent, getNodeProps, useServerContext} from '@jahia/javascript-modules-library';
import {MainLayout} from '../../layouts';

export const PageFree = () => {
    const {currentNode} = useServerContext();
    const {'jcr:title': pageTitle} = getNodeProps(currentNode, [
        'jcr:title'
    ]);
    return (
        <MainLayout
            head={<title>{pageTitle}</title>}
        >
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
