import React from 'react';
import {
    useServerContext,
    defineJahiaComponent, getNodeProps, server, useUrlBuilder
} from '@jahia/javascript-modules-library';
import {useTranslation} from 'react-i18next';

export const BlogPostTile = () => {
    const {t} = useTranslation();
    const {currentNode, renderContext} = useServerContext();
    const {buildStaticUrl} = useUrlBuilder();
    const {title, image: imageNode} = getNodeProps(currentNode, ['title', 'image']);

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
        <a href={currentNode.getUrl()}>
            <figure className="lux-card">
                <img className="lux-card_img"
                     src={image.src}
                     alt={image.alt}/>
                <figcaption className="lux-card_figcaption d-flex justify-content-center align-items-center">
                    {title}
                </figcaption>
            </figure>
        </a>
    );
};

BlogPostTile.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:blogPost',
    name: 'tile',
    displayName: 'Tile',
    componentType: 'view'
});
