import React from 'react';
import {useServerContext, getNodeProps, buildUrl, server} from '@jahia/js-server-core';

export const PageDefault = () => {
    const {currentNode, renderContext, currentResource} = useServerContext();
    const modulePath = renderContext.getURLGenerator().getCurrentModule();
    const page = getNodeProps(currentNode, [
        'jcr:title',
        'image'
    ]);

    const image = {
        src: `${modulePath}/assets/img/img-placeholder.jpg`,
        alt: 'Placeholder'
    };

    if (page.image) {
        image.src = buildUrl({value: page.image.getUrl()}, renderContext, currentResource);
        image.alt = page.image.getDisplayableName();

        server.render.addCacheDependency({node: page.image}, renderContext);
    }

    return (
        <a href={buildUrl({path: currentNode.getPath()}, renderContext, currentResource)}>
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

PageDefault.jahiaComponent = {
    nodeType: 'jnt:page',
    name: 'default',
    componentType: 'view'
};
