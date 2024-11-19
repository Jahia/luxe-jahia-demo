import React from 'react';
import {useServerContext, Render, defineJahiaComponent} from '@jahia/javascript-modules-library';
import {CMPreview} from '../../components';

export const EstateCm = () => {
    const {currentNode} = useServerContext();
    return (
        <CMPreview>
            <Render node={currentNode} view="fullPage"/>
        </CMPreview>
    );
};

EstateCm.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:estate',
    name: 'cm',
    componentType: 'view'
});
