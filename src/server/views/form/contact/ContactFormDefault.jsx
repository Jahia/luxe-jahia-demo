import React from 'react';
import {HydrateInBrowser, useServerContext, getNodeProps} from '@jahia/js-server-core';
import ContactComponent from '../../../../client/ContactComponent';

export const ContactFormDefault = () => {
    const {renderContext, currentNode} = useServerContext();
    const form = getNodeProps(currentNode, ['target', 'feedbackMsg']);
    const mode = renderContext.getMode();

    return (
        <>
            <h2>Hello 26 !</h2>
            {/* <HydrateInBrowser */}
            {/*    child={ContactComponent} */}
            {/*    props={{...form, mode}} */}
            {/* /> */}
        </>

    );
};

ContactFormDefault.jahiaComponent = {
    nodeType: 'luxemix:contactForm',
    // NodeType: 'luxe:form',
    name: 'default',
    displayName: 'default (hydrate)',
    componentType: 'view'
    // Properties: {
    //     'cache.perUser': 'true'
    // }
};
