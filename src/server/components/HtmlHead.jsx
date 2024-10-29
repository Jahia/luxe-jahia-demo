import React from 'react';
import PropTypes from 'prop-types';
import {AddResources, useServerContext, useUrlBuilder} from '@jahia/js-server-core';
import {SeoMetaTags} from './SeoMetaTags';

export const HtmlHead = ({children}) => {
    const {renderContext} = useServerContext();
    const {buildStaticUrl} = useUrlBuilder();

    return (
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <SeoMetaTags/>

            <link rel="icon" type="image/png" href={buildStaticUrl({assetPath: 'favicon-32x32.png'})}/>
            <AddResources type="css" resources={buildStaticUrl({assetPath: 'css/styles.css'})}/>
            {/* Styles specific for Edit Mode (Page Composer) */}
            {renderContext.isEditMode() &&
                <AddResources type="css" resources={buildStaticUrl({assetPath: 'css/editMode.css'})}/>}
            {children}
        </head>
    );
};

HtmlHead.propTypes = {
    children: PropTypes.node
};
