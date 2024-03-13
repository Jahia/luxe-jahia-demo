import React from 'react';
import PropTypes from 'prop-types';

export const Section = ({className, children}) => {
    return (
        <section className={className}>
            <div className="container">
                {children}
            </div>
        </section>
    );
};

Section.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};
