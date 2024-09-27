import React from 'react';
import PropTypes from 'prop-types';
import {AddResources, buildUrl, useServerContext} from '@jahia/js-server-core';
import {getCssPath} from '../config';
import {SeoMetaTags} from './SeoMetaTags';

export const HtmlHead = ({children}) => {
    const {renderContext, currentResource} = useServerContext();
    const modulePath = renderContext.getURLGenerator().getCurrentModule();
    const cssPath = getCssPath(modulePath);

    return (
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <SeoMetaTags/>

            <link rel="icon" type="image/png" href={buildUrl({value: `${modulePath}/assets/favicon-32x32.png`}, renderContext, currentResource)}/>
            <AddResources type="css" resources={buildUrl({value: `${cssPath}/styles.css`}, renderContext, currentResource)}/>
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
