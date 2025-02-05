import React from 'react';
import {
    useServerContext,
    defineJahiaComponent, getNodeProps, server, useUrlBuilder
} from '@jahia/javascript-modules-library';
import {useTranslation} from 'react-i18next';

export const BlogCard = () => {
    const {t} = useTranslation();
    const {buildStaticUrl} = useUrlBuilder();
    const {currentNode, renderContext} = useServerContext();
    let blogHeader = {
        title: t('blog.default.title'),
        teaser: t('blog.default.teaser')
    };

    try {
        const blogHeaderNode = currentNode.getNode('header/content');
        blogHeader = getNodeProps(blogHeaderNode, ['title', 'teaser', 'image']);
    } catch (e) {
        console.warn(`no header defined for the blog : ${currentNode.getDisplayableName()} (${currentNode.getIdentifier()}) : ${e}`);
    }

    const image = {
        src: buildStaticUrl({assetPath: 'img/img-placeholder.jpg'}),
        alt: 'Placeholder'
    };

    if (blogHeader.image) {
        image.src = blogHeader.image.getUrl();
        image.alt = t('alt.blog', {blog: blogHeader.title});

        server.render.addCacheDependency({node: blogHeader.image}, renderContext);
    }

    return (
        <a href={currentNode.getUrl()} className="lux-estateCard">
            <img src={image.src}
                 alt={image.alt}
                 height="265"/>
            <h4 className="my-2">{blogHeader.title}</h4>
            <p className="lux-estateCard_informations">
                {blogHeader.teaser}
            </p>
        </a>
    );
};

BlogCard.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:blog',
    name: 'card',
    displayName: 'Card',
    componentType: 'view'
});
