import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const HeadingSection = ({title, className}) => {
    return (
        <header className={clsx('row', 'pb-2', className)}>
            <h2 className="lux-heading_title mb-0">{title}</h2>
        </header>
    );
};

HeadingSection.propTypes = {
    title: PropTypes.node.isRequired,
    className: PropTypes.string
};
