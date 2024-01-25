import React from 'react';
import PropTypes from 'prop-types';
import {Footer, Head} from '../components';
// Import {JAddResources} from '@jahia/js-server-engine';

export const MainLayout = ({head, navigation, main, footer, children}) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                {head}
            </Head>
            <body>
                {navigation}
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
    navigation: PropTypes.element.isRequired,
    main: PropTypes.element.isRequired,
    footer: PropTypes.element,
    children: PropTypes.element
};
