import React from 'react';
import {HydrateInBrowser, useServerContext, getNodeProps, defineJahiaComponent} from '@jahia/javascript-modules-library';
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

LoginForm.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:loginForm',
    componentType: 'view',
    name: 'default',
    properties: {
        'cache.perUser': 'true'
    }
});
