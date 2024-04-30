import React from 'react';
import PropTypes from 'prop-types';
import {AddResources, useServerContext} from '@jahia/js-server-core';
import {cssPath, modulePath} from '../config';

export const HtmlHead = ({children}) => {
    const {renderContext} = useServerContext();

    return (
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link rel="icon" type="image/png" href={`${modulePath}/assets/favicon-32x32.png`}/>
            <AddResources type="css" resources={`${cssPath}/styles.css`}/>
            {/* Styles specific for Edit Mode (Page Composer) */}
            {renderContext.isEditMode() &&
                <AddResources type="css" resources={`${cssPath}/editMode.css`}/>}
            {children}
        </head>
    );
};

HtmlHead.propTypes = {
    children: PropTypes.node
};
