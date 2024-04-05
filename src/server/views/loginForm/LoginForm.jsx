import React from 'react';
import {HydrateInBrowser, useServerContext, getNodeProps} from '@jahia/js-server-core';
import LoginComponent from '../../../client/LoginComponent';

export const LoginForm = () => {
    const {renderContext, currentNode} = useServerContext();
    const props = getNodeProps(currentNode, ['j:displayRememberMeButton']);
    const isLoggedIn = renderContext.isLoggedIn();
    const userHydrated = renderContext.getUser().getName();
    const liveUrl = renderContext.getURLGenerator().getLive();
    const previewUrl = renderContext.getURLGenerator().getPreview();
    const editUrl = renderContext.getURLGenerator().getEdit();
    const contributeUrl = renderContext.getURLGenerator().getContribute();
    const urls = {liveUrl, previewUrl, editUrl, contributeUrl};
    let mode = renderContext.getMode();
    const nodePath = currentNode.getPath();
    return (
            <HydrateInBrowser child={LoginComponent} props={{isLoggedIn, userHydrated, urls, mode, nodePath, showRememberMe: props['j:displayRememberMeButton']}}/>
    );
}

LoginForm.jahiaComponent = {
    nodeType: 'luxe:loginForm',
    componentType: 'view',
    properties: {
        'cache.perUser': 'true'
    }
}