import React from 'react';
import {useServerContext, getNodeProps} from '@jahia/js-server-engine';

export const ImageCover = () => {
    const {currentNode} = useServerContext();
    const header = getNodeProps(currentNode, ['title', 'image']);
    return (
        <header className="lux-cover">
            {header.image && (
                <img
                    src={header.image.getUrl()}
                    alt=""
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

ImageCover.jahiaComponent = {
    id: 'imageCoverCmp',
    nodeType: 'luxe:header',
    name: 'default',
    componentType: 'view'
};
