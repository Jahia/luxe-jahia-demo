import React from 'react';
import {
    defineJahiaComponent, Render, AddContentButtons
} from '@jahia/javascript-modules-library';

export const AreaHeading = () => (
    <>
        <Render path="content"
                view="textDown"/>
        <AddContentButtons nodeTypes="luxe:header" childName="content"/>
    </>
);

AreaHeading.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:areaHeading',
    name: 'default',
    componentType: 'view'
});
