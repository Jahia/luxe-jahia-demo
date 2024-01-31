import React from 'react';
import {useServerContext, getNodeProps} from '@jahia/js-server-engine';

export const HGroup = () => {
    const {currentNode} = useServerContext();
    const header = getNodeProps(currentNode, ['title', 'description']);
    return (
        <hgroup className="row, mb-0">
            <h1 className="mb-0">{header.title}</h1>
            {header.description && (
                <p className="text-body-secondary">{header.description}</p>
            )}
        </hgroup>
    );
};

HGroup.jahiaComponent = {
    id: 'hGroupCmp',
    nodeType: 'luxe:header',
    name: 'HGroup',
    componentType: 'view'
};
