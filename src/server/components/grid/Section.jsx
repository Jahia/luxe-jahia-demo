import React from 'react';
import PropTypes from 'prop-types';

export const Section = ({className, component, children}) => {
    const Component = component || 'section';

    return (
        <Component className={className}>
            <div className="container">
                {children}
            </div>
        </Component>
    );
};

Section.propTypes = {
    className: PropTypes.string,
    component: PropTypes.elementType,
    children: PropTypes.node
};
