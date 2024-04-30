import React from 'react';
import PropTypes from 'prop-types';
import {AddResources, useServerContext} from '@jahia/js-server-core';
import {getCssPath} from '../config';

export const CMPreview = ({className, children}) => {
    const {renderContext} = useServerContext();
    const cssPath = getCssPath(renderContext.getURLGenerator().getCurrentModule());

    return (
        <>
            <AddResources type="css" resources={`${cssPath}/styles.css`}/>
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
