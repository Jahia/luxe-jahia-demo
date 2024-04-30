import React from 'react';
import PropTypes from 'prop-types';
import {AddResources} from '@jahia/js-server-core';
import {cssPath} from '../config';

export const CMPreview = ({className, children}) => {
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
