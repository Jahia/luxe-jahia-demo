import React from 'react';
import {JRender, useServerContext} from '@jahia/js-server-engine';
import {MainLayout} from '../../layouts';

export const EstateDefault = () => {
    const {currentNode} = useServerContext();
    return (
        <MainLayout
            head={<meta name="description" content="content template"/>}
        >
            <JRender node={currentNode} view="fullPage" parameters={{isBackBtnEnabled: 'true'}}/>
        </MainLayout>

    );
};

EstateDefault.jahiaComponent = {
    id: 'luxeJahiaDemo_templates_estate_default',
    nodeType: 'luxe:estate',
    name: 'default',
    displayName: 'Main',
    componentType: 'template'
};