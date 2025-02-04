import React from 'react';
import {
    defineJahiaComponent, Render, AddContentButtons
} from '@jahia/javascript-modules-library';

export const AreaMain = () => (
    <>
        <Render path="content"/>
        <AddContentButtons nodeTypes="jnt:bigText" childName="content"/>
    </>
);

AreaMain.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:areaMain',
    name: 'default',
    componentType: 'view'
});
