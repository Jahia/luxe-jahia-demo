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

    const headerNode = currentNode.getNode('header/content');
    const header = getNodeProps(headerNode, ['title', 'teaser', 'image']);

    const image = {
        src: buildStaticUrl({assetPath: 'img/img-placeholder.jpg'}),
        alt: 'Placeholder'
    };

    if (header.image) {
        image.src = header.image.getUrl();
        image.alt = t('alt.blog', {blog: header.title});

        server.render.addCacheDependency({node: header.image}, renderContext);
    }

    return (
        <a href={currentNode.getUrl()} className="lux-estateCard">
            <img src={image.src}
                 alt={image.alt}
                 height="265"/>
            <h4 className="my-2">{header.title}</h4>
            <p className="lux-estateCard_informations">
                {header.teaser}
            </p>
        </a>
    );
};

BlogCard.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:blog_2',
    name: 'card',
    displayName: 'Card',
    componentType: 'view'
});
