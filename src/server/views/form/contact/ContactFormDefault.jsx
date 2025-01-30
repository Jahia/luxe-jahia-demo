import React from 'react';
import {HydrateInBrowser, useServerContext, getNodeProps} from '@jahia/js-server-core';
import ContactComponent from '../../../../client/ContactComponent';
import {defineJahiaComponent} from '@jahia/javascript-modules-library';

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

ContactFormDefault.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxemix:contactForm',
    name: 'default',
    displayName: 'default (hydrate)',
    componentType: 'view'
    // Properties: {
    //     'cache.perUser': 'true'
    // }
});
