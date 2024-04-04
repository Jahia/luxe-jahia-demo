import React from 'react';
import PropTypes from 'prop-types';
import {AddResources} from '@jahia/js-server-engine';
export const HtmlHead = ({children}) => {
    return (
        <head>
            <meta charSet="utf-8"/>
            {/* TODO: Add favicon */}
            {/* <AddResources type="image/png" resources="/img/favicon-32x32.png"/>
            <AddResources type="image/png" resources="/img/favicon-16x16.png"/> */}
            <AddResources type="css" resources="main.css"/>
            <AddResources type="javascript" resources="script.js"/>

            {children}
        </head>
    );
};

HtmlHead.propTypes = {
    children: PropTypes.node
};
