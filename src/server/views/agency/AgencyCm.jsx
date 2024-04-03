import React from 'react';
import {
    AddResources, Render, useServerContext
} from '@jahia/js-server-engine';

export const AgencyCm = () => {
    const {currentNode} = useServerContext();
    return (
        <>
            <AddResources type="css" resources="main.css"/>
            <main>
                <Render node={currentNode} view="fullPage"/>
            </main>
        </>
    );
};

AgencyCm.jahiaComponent = {
    nodeType: 'luxe:agency',
    name: 'cm',
    componentType: 'view'
};
