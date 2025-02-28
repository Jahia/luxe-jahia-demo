import React from 'react';
import {jahiaComponent} from '@jahia/javascript-modules-library';

jahiaComponent(
    {
        nodeType: 'jnt:category',
        name: 'badge',
        displayName: 'Badge',
        componentType: 'view'
    },
    ({'jcr:title': title}) => <span>{title}</span>
);
