import React from 'react';
import PropTypes from 'prop-types';
import {useServerContext, getNodeProps} from '@jahia/js-server-engine';
import clsx from 'clsx';
export const HighlightNumber = ({className, ...props}) => {
    const {currentNode} = useServerContext();
    const content = getNodeProps(currentNode, ['text', 'number']);
    return (
        <div className={clsx('lux-highlightNumber', className)} {...props}>
            <h4 className="lux-highlightNumber_number text-center">{content.number}</h4>
            <p className="lux-highlightNumber_text text-center mb-0">{content.text}</p>
        </div>
    );
};

HighlightNumber.propTypes = {
    className: PropTypes.string
};

HighlightNumber.jahiaComponent = {
    id: 'default',
    nodeType: 'luxe:highlightNumber',
    displayName: 'Default',
    componentType: 'view'
};
