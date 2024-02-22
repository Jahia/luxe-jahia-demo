import React from 'react';
import PropTypes from 'prop-types';
import {useServerContext, getNodeProps} from '@jahia/js-server-engine';
import clsx from 'clsx';

export const HighlightNumberDefault = ({className}) => {
    const {currentNode, currentResource} = useServerContext();
    const locale = currentResource.getLocale().getLanguage();
    const content = getNodeProps(currentNode, ['text', 'number']);
    return (
        <div className={clsx('lux-highlightNumber', className)}>
            <h4 className="lux-highlightNumber_number text-center">{content.number.toLocaleString(locale)}</h4>
            <p className="lux-highlightNumber_text text-center mb-0">{content.text}</p>
        </div>
    );
};

HighlightNumberDefault.propTypes = {
    className: PropTypes.string
};

HighlightNumberDefault.jahiaComponent = {
    id: 'luxeJahiaDemo_views_highlightNumber_HighlightNumberDefault',
    nodeType: 'luxe:highlightNumber',
    displayName: 'Default',
    componentType: 'view'
};
