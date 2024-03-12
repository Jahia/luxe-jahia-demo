import React from 'react';
import PropTypes from 'prop-types';
import {JAddResources} from '@jahia/js-server-engine';
export const HtmlHead = ({children}) => {
    return (
        <head>
            <meta charSet="utf-8"/>
            <link rel="icon" type="image/svg+xml" href="/vite.svg"/>
            <script defer type="text/javascript" src="https://unpkg.com/alpinejs"/>
            <JAddResources type="css" resources="main.css"/>
            <JAddResources type="javascript" resources="script.js"/>

            {children}
        </head>
    );
};

HtmlHead.propTypes = {
    children: PropTypes.node
};
