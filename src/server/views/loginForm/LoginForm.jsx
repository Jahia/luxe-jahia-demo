import React from 'react';
import {
    HydrateInBrowser,
    useServerContext,
    getNodeProps,
    defineJahiaComponent,
    buildUrl
} from '@jahia/javascript-modules-library';
import LoginComponent from '../../../client/LoginComponent';

export const LoginForm = () => {
    const {renderContext, currentNode, currentResource} = useServerContext();
    const props = getNodeProps(currentNode, ['j:displayRememberMeButton']);

    const isLoggedIn = renderContext.isLoggedIn();
    const userHydrated = renderContext.getUser().getName();
    // URL management, usage of buildUrl ensure urls are correct (vanity, url rewriting, webapp context, etc.)
    const liveUrl = buildUrl({value: renderContext.getURLGenerator().getLive()}, renderContext, currentResource);
    const previewUrl =  buildUrl({value: renderContext.getURLGenerator().getPreview()}, renderContext, currentResource);
    const editUrl = buildUrl({value: renderContext.getURLGenerator().getEdit()}, renderContext, currentResource);
    const gqlUrl = buildUrl({value: '/modules/graphql'}, renderContext, currentResource);
    const loginUrl = buildUrl({value: renderContext.getURLGenerator().getLogin()}, renderContext, currentResource);
    const logoutUrl = buildUrl({value: renderContext.getURLGenerator().getLogout()}, renderContext, currentResource);
    const urls = {liveUrl, previewUrl, editUrl, gqlUrl, loginUrl, logoutUrl};

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
                isShowRememberMe: Boolean(props['j:displayRememberMeButton']),
                siteKey: renderContext.getSite().getSiteKey()
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
