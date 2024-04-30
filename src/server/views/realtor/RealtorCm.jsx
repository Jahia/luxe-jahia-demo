import React from 'react';
import {
    useServerContext,
    Render
} from '@jahia/js-server-core';
import {CMPreview} from '../../components';

export const RealtorCm = () => {
    const {currentNode} = useServerContext();

    return (
        <CMPreview>
            <Render node={currentNode} view="fullPage"/>
        </CMPreview>
    );
};

RealtorCm.jahiaComponent = {
    nodeType: 'luxe:realtor',
    name: 'cm',
    componentType: 'view'
};
