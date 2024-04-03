import React from 'react';
import {
    useServerContext,
    AddResources, Render
} from '@jahia/js-server-engine';

export const RealtorCm = () => {
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

RealtorCm.jahiaComponent = {
    nodeType: 'luxe:realtor',
    name: 'cm',
    componentType: 'view'
};
