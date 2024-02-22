import React from 'react';
import {useServerContext, getNodeProps, jAddCacheDependency} from '@jahia/js-server-engine';

export const HeaderDefault = () => {
    const {currentNode} = useServerContext();
    const header = getNodeProps(currentNode, ['title', 'image']);

    if (header.image) {
        jAddCacheDependency({node: header.image});
    }

    return (
        <header className="lux-cover">
            {header.image && (
                <img
                    src={header.image.getUrl()}
                    alt={header.image.getDisplayableName()}
                    className="lux-cover_img"
                    height="695px"
                />
            )}

            <h2 className="lux-cover_caption">
                {header.title}
            </h2>
        </header>
    );
};

HeaderDefault.jahiaComponent = {
    id: 'luxJahiaDemo_views_header_default',
    nodeType: 'luxe:header',
    name: 'default',
    componentType: 'view'
};
