import React from 'react';
import PropTypes from 'prop-types';
import {Footer, Head} from '../components';
import {JAddContentButtons, JRender} from '@jahia/js-server-engine';

const navArea = {
    name: 'navArea',
    nodeType: 'jnt:absoluteArea',
    properties: {
        'j:allowedTypes': ['luxe:navMenu'],
        'j:numberOfItems': '1',
        'j:level': '0'
    }
};

export const MainLayout = ({head, footer, children}) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                {head}
            </Head>
            <body>
                <JRender content={navArea}/>
                <JAddContentButtons/>
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
