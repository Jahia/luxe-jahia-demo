import React from 'react';
import {MainLayout} from '../../layouts';
import {jahiaComponent, Render} from '@jahia/javascript-modules-library';

jahiaComponent(
    {
        nodeType: 'luxe:realtor',
        name: 'default',
        componentType: 'template'
    },
    (_, {currentNode}) => {
        return (
            <MainLayout>
                <Render node={currentNode} view="fullPage"/>
            </MainLayout>
        );
    }
);
