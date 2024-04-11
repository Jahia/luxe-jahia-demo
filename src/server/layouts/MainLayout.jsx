import React from 'react';
import PropTypes from 'prop-types';
import {HtmlFooter, HtmlHead} from '../components';
import {AbsoluteArea, AddResources} from '@jahia/js-server-core';

// Const navArea = {
//     name: 'navArea',
//     nodeType: 'jnt:absoluteArea',
//     properties: {
//         'j:allowedTypes': ['luxe:navMenu'],
//         'j:numberOfItems': '1',
//         'j:level': '0'
//     }
// };

// const navMenu = {
//     name: 'navMenu',
//     nodeType: 'luxe:navMenu',
//     mixins: ['jmix:renderable'],
//     properties: {
//         base: 'home',
//         maxDepth: '2',
//         startLevel: '0',
//         menuItemView: 'menuElement'
//     }
// };

// Const navMainArea = {
//     name: 'navMainArea',
//     nodeType: 'jnt:Area',
//     properties: {
//         allowedTypes: ['luxe:navMenu'],
//         numberOfItems: '1'
//     }
// };

export const MainLayout = ({head, footer, className, children}) => {
    // Const {renderContext} = useServerContext();
    // navMainArea.path = `/sites/${renderContext.getSite().getName()}`;
    return (
        <>
            <HtmlHead>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                {head}
            </HtmlHead>
            <body>
                <AbsoluteArea name="navArea" allowedTypes={['luxe:navMenu']} level="0" numberOfItems="1"/>
                <main className={className}>
                    {children}
                </main>
                <HtmlFooter/>
                <AddResources type="javascript" resources="bootstrap.bundle.min.js"/>
            </body>

        </>
    );
};

MainLayout.propTypes = {
    head: PropTypes.element,
    footer: PropTypes.element,
    children: PropTypes.node,
    className: PropTypes.string
};
