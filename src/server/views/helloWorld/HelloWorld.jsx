import React from 'react';
import {useServerContext, getNodeProps} from '@jahia/js-server-engine';

export const HelloComponent = () => {
    const {currentNode} = useServerContext();
    const props = getNodeProps(currentNode, ['textHello']);
    return (
        <div>
            <h1>{props.textHello}</h1>
        </div>
    );
};

HelloComponent.jahiaComponent = {
    id: 'helloComponent',
    nodeType: 'luxe:hello',
    displayName: 'Hello Component',
    componentType: 'view'
};
