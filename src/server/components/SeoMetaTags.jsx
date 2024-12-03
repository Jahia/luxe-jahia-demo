import React from 'react';
import {buildUrl, getNodeProps, useServerContext} from '@jahia/javascript-modules-library';

export const SeoMetaTags = () => {
    const {currentNode, currentResource, renderContext} = useServerContext();

    const isDisplayableNodeType = currentNode.isNodeType('jnt:page') ||
        currentNode.isNodeType('jmix:mainResource');
    if (!isDisplayableNodeType) {
        return;
    }

    const {
        'jcr:title': seoTitle,
        'jcr:description': seoDescription,
        openGraphImage,
        seoKeywords
    } = getNodeProps(currentNode, [
        'jcr:title',
        'jcr:description',
        'openGraphImage',
        'seoKeywords'
    ]) || {};
    const locale = currentResource.getLocale().getLanguage();
    const absOgImageUrl = openGraphImage?.getAbsoluteUrl(renderContext.getRequest());

    const getAbsoluteUrl = node => {
        const server = renderContext.getURLGenerator().getServer();
        const relUrl = buildUrl({path: node.getPath()}, renderContext, currentResource);
        return `${server}${relUrl}`;
    };

    return (
        <>
            {absOgImageUrl && <meta property="og:image" content={absOgImageUrl}/>}
            {seoTitle && <meta property="og:title" content={seoTitle}/>}
            <meta property="og:url" content={getAbsoluteUrl(currentNode)}/>
            {seoDescription &&
                <>
                    <meta property="og:description" content={seoDescription.toLocaleString(locale) || seoDescription}/>
                    <meta name="description" content={seoDescription.toLocaleString(locale) || seoDescription}/>
                </>}
            {seoKeywords?.length && <meta name="keywords" content={seoKeywords.map(kw => kw.toLocaleString(locale)).join(',')}/>}
        </>
    );
};
