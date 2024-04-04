import React from 'react';
import {
    useServerContext,
    getNodeProps,
    server
} from '@jahia/js-server-core';

import {TextIllustrated} from '../../components';

export const TextIllustratedDefault = () => {
    const {currentNode, renderContext} = useServerContext();
    const modulePath = renderContext.getURLGenerator().getCurrentModule();
    const textI9d = getNodeProps(currentNode, ['title', 'text', 'image', 'arrangement']);

    if (textI9d.image) {
        server.render.addCacheDependency({node: textI9d.image}, renderContext);
    }

    return (
        <TextIllustrated {...{
            title: textI9d.title,
            text: textI9d.text,
            arrangement: textI9d.arrangement,
            image: {
                src: textI9d.image?.getUrl() || `${modulePath}/assets/img/img-placeholder.jpg`,
                alt: textI9d.image?.getDisplayableName() || 'placeholder'
            }
        }}/>
    );
};

TextIllustratedDefault.jahiaComponent = {
    nodeType: 'luxe:textIllustrated',
    name: 'default',
    componentType: 'view'
};
