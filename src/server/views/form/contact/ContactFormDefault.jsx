import React from 'react';
import {HydrateInBrowser, useServerContext, getNodeProps} from '@jahia/js-server-core';
import ContactComponent from '../../../../client/form/contact/ContactComponent';

export const ContactFormDefault = () => {
    const {currentNode} = useServerContext();
    const form = getNodeProps(currentNode, ['target', 'feedbackMsg']);

    return (
        <HydrateInBrowser
            child={ContactComponent}
            props={{...form}}
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
