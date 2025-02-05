import React from 'react';
import {
    useServerContext,
    getNodeProps,
    useUrlBuilder,
    server, defineJahiaComponent
} from '@jahia/javascript-modules-library';
import {useTranslation} from 'react-i18next';

export const BlogDefault = () => {
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
        <a className="lux-agencyCard d-flex" href={currentNode.getUrl()}>
            <img className="lux-agencyCard_image me-4"
                 src={image.src}
                 alt={image.alt}
                 width="200"
                 height="200"/>

            <div className="d-flex flex-column justify-content-center flex-fill">
                <h2 className="my-0 lux-capitalize">{blogHeader.title}</h2>
                {/* eslint-disable-next-line react/no-danger */}
                <p dangerouslySetInnerHTML={{
                    __html: blogHeader.teaser
                }}
                   className="m-0"
                 />
            </div>
        </a>
    );
};

BlogDefault.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:blog',
    name: 'default',
    componentType: 'view'
});
