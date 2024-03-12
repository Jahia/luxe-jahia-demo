import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Row = ({className, children}) => {
    return (
        <div className={clsx('row', className)}>
            {children}
        </div>
    );
};

Row.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};
