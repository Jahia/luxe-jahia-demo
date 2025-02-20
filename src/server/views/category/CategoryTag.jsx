import React from 'react';
import {
    useServerContext,
    defineJahiaComponent, getNodeProps
} from '@jahia/javascript-modules-library';

export const CategoryTag = () => {
    const {currentNode} = useServerContext();
    const {'jcr:title': title} = getNodeProps(currentNode, ['jcr:title']);
    return (
        <span>{title}</span>
    );
};

CategoryTag.jahiaComponent = defineJahiaComponent({
    nodeType: 'jnt:category',
    name: 'badge',
    displayName: 'Badge',
    componentType: 'view'
});
