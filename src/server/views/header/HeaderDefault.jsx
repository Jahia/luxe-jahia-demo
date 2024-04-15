import React from 'react';
import {useServerContext, getNodeProps, server} from '@jahia/js-server-core';

export const HeaderDefault = () => {
    const {currentNode, renderContext} = useServerContext();
    const header = getNodeProps(currentNode, ['title', 'image']);

    if (header.image) {
        server.render.addCacheDependency({node: header.image}, renderContext);
    }

    return (
        <section className="lux-cover">
            {header.image && (
                <img
                    src={header.image.getUrl()}
                    alt={header.image.getDisplayableName()}
                    className="lux-cover_img"
                    height="695px"
                />
            )}

            <h1 className="lux-cover_caption">
                {header.title}
            </h1>
        </section>
    );
};

HeaderDefault.jahiaComponent = {
    nodeType: 'luxe:header',
    name: 'default',
    componentType: 'view'
};
