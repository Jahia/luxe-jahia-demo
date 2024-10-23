import React from 'react';
import PropTypes from 'prop-types';
import {AddResources, useUrlBuilder} from '@jahia/js-server-core';

export const CMPreview = ({className, children}) => {
    const {buildStaticUrl} = useUrlBuilder();

    return (
        <>
            <AddResources type="css" resources={buildStaticUrl({assetPath: 'dist/styles.css'})}/>
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
