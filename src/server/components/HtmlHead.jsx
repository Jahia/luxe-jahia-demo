import React from 'react';
import PropTypes from 'prop-types';
import {AddResources} from '@jahia/js-server-core';
export const HtmlHead = ({children}) => {
    return (
        <head>
            <meta charSet="utf-8"/>
            <link rel="icon" type="image/png" href="/modules/luxe-jahia-demo/img/favicon.png"/>
            <AddResources type="css" resources="main.css"/>
            {children}
        </head>
    );
};

HtmlHead.propTypes = {
    children: PropTypes.node
};
