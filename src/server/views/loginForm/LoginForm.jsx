import React from 'react';
import {HydrateInBrowser, useServerContext, getNodeProps} from '@jahia/js-server-core';
import LoginComponent from '../../../client/LoginComponent';

export const LoginForm = () => {
    const {renderContext, currentNode} = useServerContext();
    const props = getNodeProps(currentNode, ['j:displayRememberMeButton']);
    const isLoggedIn = renderContext.isLoggedIn();
    const userHydrated = renderContext.getUser().getName();
    // URL management
    const liveUrl = renderContext.getURLGenerator().getLive();
    const previewUrl = renderContext.getURLGenerator().getPreview();
    const editUrl = renderContext.getURLGenerator().getEdit();
    const urls = {liveUrl, previewUrl, editUrl};

    const mode = renderContext.getMode();
    const nodePath = currentNode.getPath();
    return (
        <HydrateInBrowser
            child={LoginComponent}
            props={{
                isLoggedIn,
                userHydrated,
                urls,
                mode,
                nodePath,
                isShowRememberMe: props['j:displayRememberMeButton']
            }}
        />
    );
};

LoginForm.jahiaComponent = {
    nodeType: 'luxe:loginForm',
    componentType: 'view',
    properties: {
        'cache.perUser': 'true'
    }
};
