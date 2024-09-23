import React from 'react';
import {HydrateInBrowser, useServerContext, getNodeProps} from '@jahia/js-server-core';
import LoginComponent from '../../../../client/LoginComponent';

export const LoginFormDefault = () => {
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
    const mainPath = renderContext.getMainResource().getNode().getPath();

    return (
        <HydrateInBrowser
            child={LoginComponent}
            props={{
                isLoggedIn,
                userHydrated,
                urls,
                mode,
                nodePath: mainPath,
                isShowRememberMe: Boolean(props['j:displayRememberMeButton'])
            }}
        />
    );
};

LoginFormDefault.jahiaComponent = {
    nodeType: 'luxemix:loginForm',
    name: 'default',
    displayName: 'default (hydrate)',
    componentType: 'view',
    properties: {
        'cache.perUser': 'true'
    }
};
