import React from 'react';
import {
    defineJahiaComponent, Render, AddContentButtons
} from '@jahia/javascript-modules-library';

export const AreaMain = () => (
    <>
        <Render path="main"/>
        <AddContentButtons nodeTypes="jnt:bigText" childName="main"/>
    </>
);

AreaMain.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:areaMain',
    name: 'default',
    componentType: 'view'
});
