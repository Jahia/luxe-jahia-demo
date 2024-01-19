import React from 'react';
import PropTypes from 'prop-types';
export const Head = ({children}) => {
    return (
        <head>
            <link rel="icon" type="image/svg+xml" href="/vite.svg"/>
            {children}
        </head>
    );
};

Head.propTypes = {
    children: PropTypes.element
};
