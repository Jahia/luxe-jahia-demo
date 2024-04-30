import React from 'react';
import {
    Render, useServerContext
} from '@jahia/js-server-core';
import {CMPreview} from '../../components';

export const AgencyCm = () => {
    const {currentNode} = useServerContext();
    return (
        <CMPreview>
            <Render node={currentNode} view="fullPage"/>
        </CMPreview>
    );
};

AgencyCm.jahiaComponent = {
    nodeType: 'luxe:agency',
    name: 'cm',
    componentType: 'view'
};
