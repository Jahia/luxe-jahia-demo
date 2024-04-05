import React from 'react';
import {useServerContext, AddResources, Render} from '@jahia/js-server-core';

export const EstateCm = () => {
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

EstateCm.jahiaComponent = {
    nodeType: 'luxe:estate',
    name: 'cm',
    componentType: 'view'
};
