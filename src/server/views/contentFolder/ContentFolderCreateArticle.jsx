import React from 'react';
import {
    defineJahiaComponent, AddContentButtons
} from '@jahia/javascript-modules-library';

export const ContentFolderCreateArticle = () => {
    return (
        <AddContentButtons nodeTypes="luxe:article"/>
    );
};

ContentFolderCreateArticle.jahiaComponent = defineJahiaComponent({
    nodeType: 'jnt:contentFolder',
    name: 'createArticle',
    componentType: 'view'
});
