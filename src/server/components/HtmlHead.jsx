import React from 'react';
import PropTypes from 'prop-types';
import {AddResources} from '@jahia/js-server-core';
export const HtmlHead = ({children}) => {
    return (
        <head>
            <meta charSet="utf-8"/>
            <link rel="icon" type="image/svg+xml" href="/vite.svg"/>
            <script defer type="text/javascript" src="https://unpkg.com/alpinejs"/>
            <AddResources type="css" resources="main.css"/>
            <AddResources type="javascript" resources="script.js"/>

            {children}
        </head>
    );
};

HtmlHead.propTypes = {
    children: PropTypes.node
};
