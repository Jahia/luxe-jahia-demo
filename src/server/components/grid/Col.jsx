import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Col = ({className, children}) => {
    return (
        <div className={clsx('col', className)}>
            {children}
        </div>
    );
};

Col.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};
