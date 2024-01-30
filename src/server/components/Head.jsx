import React from 'react';
import PropTypes from 'prop-types';
import {JAddResources} from '@jahia/js-server-engine';
export const Head = ({children}) => {
    return (
        <head>
            <link rel="icon" type="image/svg+xml" href="/vite.svg"/>
            <JAddResources type="css" resources="main.css"/>
            {children}
        </head>
    );
};

Head.propTypes = {
    children: PropTypes.node
};
