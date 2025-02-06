import React from 'react';
import {
    defineJahiaComponent, Render, AddContentButtons
} from '@jahia/javascript-modules-library';
// TODO manage subnodeview
export const AreaHeader = () => (
    <>
        <Render path="content"
                view="textDown"/>
        <AddContentButtons nodeTypes="luxe:header" childName="content"/>
    </>
);

AreaHeader.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:areaHeader',
    name: 'default',
    componentType: 'view'
});
