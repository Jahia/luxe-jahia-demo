import React from 'react';
import {defineJahiaComponent, getNodeProps, server, useServerContext, useUrlBuilder} from '@jahia/javascript-modules-library';

export const PageDefault = () => {
    const {currentNode, renderContext} = useServerContext();
    const {buildStaticUrl} = useUrlBuilder();
    const page = getNodeProps(currentNode, [
        'jcr:title',
        'image'
    ]);

    const image = {
        src: buildStaticUrl({assetPath: 'img/img-placeholder.jpg'}),
        alt: 'Placeholder'
    };

    if (page.image) {
        image.src = page.image.getUrl();
        image.alt = page.image.getDisplayableName();

        server.render.addCacheDependency({node: page.image}, renderContext);
    }

    return (
        <a href={currentNode.getUrl()}>
            <figure className="lux-card">
                <img className="lux-card_img"
                     src={image.src}
                     alt={image.alt}/>
                <figcaption className="lux-card_figcaption d-flex justify-content-center align-items-center">
                    {page['jcr:title']}
                </figcaption>
            </figure>
        </a>
    );
};

PageDefault.jahiaComponent = defineJahiaComponent({
    nodeType: 'jnt:page',
    name: 'default',
    componentType: 'view'
});
