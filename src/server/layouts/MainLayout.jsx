import React from 'react';
import PropTypes from 'prop-types';
import {Footer, Head} from '../components';
import {JAddContentButtons, JRender, useServerContext} from '@jahia/js-server-engine';
import {NavMenu} from '../views';

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

export const MainLayout = ({head, footer, children}) => {
    // Const {renderContext} = useServerContext();
    // navMainArea.path = `/sites/${renderContext.getSite().getName()}`;
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                {head}
            </Head>
            <body>
                <NavMenu/>
                {/* <JRender content={navMenu}/> */}
                {/* <JAddContentButtons/> */}
                {/* <JAddContentButtons nodeTypes="luxe:navMenu"/> */}
                <main>
                    {children}
                </main>
                <Footer/>
            </body>

        </>
    );
};

MainLayout.propTypes = {
    head: PropTypes.element,
    footer: PropTypes.element,
    children: PropTypes.node
};
