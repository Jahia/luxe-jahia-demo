import React from 'react';
import {JArea} from '@jahia/js-server-engine';

export const PageHome = () => {
    return (<>
        <head>
            <title>Home</title>
        </head>
        <body>
            <h1>Home Template</h1>
            <main>
                <JArea name="pagecontent" />
            </main>
        </body>
    </>);
}

PageHome.jahiaComponent = {
    id: 'page_home',
    nodeType: 'jnt:page',
    name: 'home',
    displayName: 'Home React template',
    componentType: 'template'
}