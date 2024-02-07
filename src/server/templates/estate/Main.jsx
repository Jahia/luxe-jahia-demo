import React from 'react';
import {JRender, useServerContext} from '@jahia/js-server-engine';
import {MainLayout} from '../../layouts';

export const EstateMain = () => {
    const {currentNode} = useServerContext();
    return (
        <MainLayout
            head={<meta name="description" content="content template"/>}
        >
            <JRender node={currentNode} parameters={{isBackBtnEnabled: 'true'}}/>
        </MainLayout>

    );
};

EstateMain.jahiaComponent = {
    id: 'estateMainTemplateCmp',
    nodeType: 'luxe:estate',
    name: 'main',
    displayName: 'Main',
    componentType: 'template',
    properties: {
        default: 'true'
    }
};
