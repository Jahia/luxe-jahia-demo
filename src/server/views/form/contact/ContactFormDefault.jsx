import React from 'react';
import {HydrateInBrowser, useServerContext, getNodeProps, RenderInBrowser} from '@jahia/js-server-core';
import ContactComponent from '../../../../client/ContactComponent';

export const ContactFormDefault = () => {
    const {renderContext, currentNode} = useServerContext();
    const form = getNodeProps(currentNode, ['target', 'feedbackMsg']);
    const mode = renderContext.getMode();

    return (
        <>
            {/* <h2>Hello 27 !</h2> */}
            <HydrateInBrowser
                child={ContactComponent}
                props={{...form, mode}}
             />
            {/* <RenderInBrowser */}
            {/*    child={ContactComponent} */}
            {/*    props={{...form, mode}} */}
            {/* /> */}
        </>

    );
};

ContactFormDefault.jahiaComponent = {
    nodeType: 'luxemix:contactForm',
    name: 'default',
    displayName: 'default (hydrate)',
    componentType: 'view'
    // Properties: {
    //     'cache.perUser': 'true'
    // }
};
