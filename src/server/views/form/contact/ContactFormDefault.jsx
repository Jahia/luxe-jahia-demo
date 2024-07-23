import React from 'react';
import {HydrateInBrowser, useServerContext, getNodeProps} from '@jahia/js-server-core';
import ContactComponent from '../../../../client/ContactComponent';

export const ContactFormDefault = () => {
    const {renderContext, currentNode} = useServerContext();
    const form = getNodeProps(currentNode, ['target', 'feedbackMsg']);
    const mode = renderContext.getMode();

    return (
        <HydrateInBrowser
            child={ContactComponent}
            props={{...form, mode}}
        />
    );
};

ContactFormDefault.jahiaComponent = {
    nodeType: 'luxe:form',
    name: 'default',
    displayName: 'default (hydrate)',
    componentType: 'view',
    properties: {
        'cache.perUser': 'true'
    }
};
