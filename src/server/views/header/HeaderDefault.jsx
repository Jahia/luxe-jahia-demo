import React from 'react';
import {useServerContext, getNodeProps, server, buildUrl} from '@jahia/js-server-core';

export const HeaderDefault = () => {
    const {currentNode, renderContext, currentResource} = useServerContext();
    const header = getNodeProps(currentNode, ['title', 'image']);

    if (header.image) {
        server.render.addCacheDependency({node: header.image}, renderContext);
    }

    return (
        <section className="lux-cover">
            {/* If you use one of our external DAM plugins, you can specify the image width or height
            to enable live image resizing performed by the DAM provider. */}
            {header.image &&
                <img
                    src={buildUrl({value: header.image.getUrl(['width:1920'])}, renderContext, currentResource)}
                    alt={header.image.getDisplayableName()}
                    className="lux-cover_img"
                    height="695px"
                />}

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
