import React from 'react';
import PropTypes from 'prop-types';
import {JAddResources} from '@jahia/js-server-engine';
export const Head = ({children}) => {
    return (
        <head>
            <link rel="icon" type="image/svg+xml" href="/vite.svg"/>
            <script type="text/javascript" src="https://unpkg.com/alpinejs" defer="true"/>
            <JAddResources type="css" resources="main.css"/>
            <JAddResources type="javascript" resources="script.js"/>

            {children}
        </head>
    );
};

Head.propTypes = {
    children: PropTypes.node
};
