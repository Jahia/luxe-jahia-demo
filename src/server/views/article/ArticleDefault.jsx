import React from 'react';
import {
    useServerContext,
    getNodeProps,
    useUrlBuilder,
    server, defineJahiaComponent
} from '@jahia/javascript-modules-library';
import {useTranslation} from 'react-i18next';

export const ArticleDefault = () => {
    const {t} = useTranslation();
    const {buildStaticUrl} = useUrlBuilder();
    const {currentNode, renderContext} = useServerContext();
    const {'jcr:title': defaultTitle} = getNodeProps(currentNode, ['jcr:title']);
    let ArticleHeader = {
        title: defaultTitle,
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
        <a className="lux-agencyCard d-flex" href={currentNode.getUrl()}>
            <img className="lux-agencyCard_image me-4"
                 src={image.src}
                 alt={image.alt}
                 width="200"
                 height="200"/>

            <div className="d-flex flex-column justify-content-center flex-fill">
                <h2 className="my-0 lux-capitalize">{ArticleHeader.title}</h2>
                {/* eslint-disable-next-line react/no-danger */}
                <p dangerouslySetInnerHTML={{
                    __html: ArticleHeader.teaser
                }}
                   className="m-0"
                 />
            </div>
        </a>
    );
};

ArticleDefault.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:article',
    name: 'default',
    componentType: 'view'
});
