import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const PageHeader = ({title, description, className}) => {
    return (
        <hgroup className={clsx('row', 'mb-0', className)}>
            <h1 className="mb-0">{title}</h1>
            {description && (
                <p className="text-body-secondary">{description}</p>
            )}
        </hgroup>
    );
};

PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    className: PropTypes.string
};
