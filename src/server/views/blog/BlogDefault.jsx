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
    const {currentNode, renderContext} = useServerContext();
    const {buildStaticUrl} = useUrlBuilder();
    const blog = getNodeProps(currentNode, [
        'title',
        'teaser',
        'image'
    ]);

    const image = {
        src: buildStaticUrl({assetPath: 'img/img-placeholder.jpg'}),
        alt: 'Placeholder'
    };

    if (blog.image) {
        image.src = blog.image.getUrl();
        image.alt = t('alt.blog', {blog: blog.title});

        server.render.addCacheDependency({node: blog.image}, renderContext);
    }

    return (
        <a className="lux-agencyCard d-flex" href={currentNode.getUrl()}>
            <img className="lux-agencyCard_image me-4"
                 src={image.src}
                 alt={image.alt}
                 width="200"
                 height="200"/>

            <div className="d-flex flex-column justify-content-center flex-fill">
                <h2 className="my-0 lux-capitalize">{blog.title}</h2>
                {/* eslint-disable-next-line react/no-danger */}
                <p dangerouslySetInnerHTML={{
                    __html: blog.teaser
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
