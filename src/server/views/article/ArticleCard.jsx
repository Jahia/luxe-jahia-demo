import React from 'react';
import {
    useServerContext,
    defineJahiaComponent, getNodeProps, server, useUrlBuilder
} from '@jahia/javascript-modules-library';
import {useTranslation} from 'react-i18next';

export const ArticleCard = () => {
    const {t} = useTranslation();
    const {buildStaticUrl} = useUrlBuilder();
    const {currentNode, renderContext} = useServerContext();
    let ArticleHeader = {
        title: t('blog.default.title'),
        teaser: t('blog.default.teaser')
    };

    try {
        const blogHeaderNode = currentNode.getNode('header');
        ArticleHeader = getNodeProps(blogHeaderNode, ['title', 'teaser', 'image']);
    } catch (e) {
        console.info(`no header defined for the article : ${currentNode.getDisplayableName()} (${currentNode.getIdentifier()}) : ${e}`);
    }

    const image = {
        src: buildStaticUrl({assetPath: 'img/img-placeholder.jpg'}),
        alt: 'Placeholder'
    };

    if (ArticleHeader.image) {
        image.src = ArticleHeader.image.getUrl();
        image.alt = t('alt.blog', {blog: ArticleHeader.title});

        server.render.addCacheDependency({node: ArticleHeader.image}, renderContext);
    }

    return (
        <a href={currentNode.getUrl()} className="lux-estateCard">
            <img src={image.src}
                 alt={image.alt}
                 height="265"/>
            <h4 className="my-2">{ArticleHeader.title}</h4>
            <p className="lux-estateCard_informations">
                {ArticleHeader.teaser}
            </p>
        </a>
    );
};

ArticleCard.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:article',
    name: 'card',
    displayName: 'Card',
    componentType: 'view'
});
