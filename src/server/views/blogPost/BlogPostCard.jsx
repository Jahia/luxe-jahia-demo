import React from 'react';
import {
    useServerContext,
    defineJahiaComponent, getNodeProps, server, useUrlBuilder
} from '@jahia/javascript-modules-library';
import {useTranslation} from 'react-i18next';

export const BlogPostCard = () => {
    const {t} = useTranslation();
    const {buildStaticUrl} = useUrlBuilder();
    const {currentNode, renderContext} = useServerContext();
    const {title, subtitle, image: imageNode} = getNodeProps(currentNode, ['title', 'subtitle', 'image']);

    const image = {
        src: buildStaticUrl({assetPath: 'img/img-placeholder.jpg'}),
        alt: 'Placeholder'
    };

    if (imageNode) {
        image.src = imageNode.getUrl();
        image.alt = t('alt.blog', {blog: title});

        server.render.addCacheDependency({node: imageNode}, renderContext);
    }

    return (
        <a href={currentNode.getUrl()} className="lux-estateCard">
            <img src={image.src}
                 alt={image.alt}
                 height="265"/>
            <h4 className="my-2">{title}</h4>
            {subtitle &&
                <p className="lux-estateCard_informations">{subtitle}</p>}
        </a>
    );
};

BlogPostCard.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:blogPost',
    name: 'card',
    displayName: 'Card',
    componentType: 'view'
});
