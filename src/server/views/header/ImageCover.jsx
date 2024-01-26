import React from 'react';
import {useServerContext, getNodeProps} from '@jahia/js-server-engine';

export const ImageCover = () => {
    const {currentNode} = useServerContext();
    const content = getNodeProps(currentNode, ['title', 'image']);
    return (
        <header className="lux-cover">
            <img
                src={content.image.getUrl()}
                alt=""
                className="lux-cover_img"
                height="695px"
            />
            <h2 className="lux-cover_caption">
                {content.title}
            </h2>
        </header>
    );
};

ImageCover.jahiaComponent = {
    id: 'imageCoverCmp',
    nodeType: 'luxe:header',
    displayName: 'Image Cover',
    componentType: 'view'
};
