import React from 'react';
import PropTypes from 'prop-types';
import {AddResources, buildUrl, useServerContext} from '@jahia/js-server-core';
import {getCssPath} from '../config';

export const CMPreview = ({className, children}) => {
    const {renderContext, currentResource} = useServerContext();
    const cssPath = getCssPath(renderContext.getURLGenerator().getCurrentModule());

    return (
        <>
            <AddResources type="css" resources={buildUrl({value: `${cssPath}/styles.css`}, renderContext, currentResource)}/>
            <main className={className}>
                {children}
            </main>
        </>
    );
};

CMPreview.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};
