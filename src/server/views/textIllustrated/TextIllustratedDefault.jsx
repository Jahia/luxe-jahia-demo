import React from 'react';
import {defineJahiaComponent, getNodeProps, server, useServerContext, useUrlBuilder} from '@jahia/js-server-core';

import {TextIllustrated} from '../../components';

export const TextIllustratedDefault = () => {
    const {currentNode, renderContext} = useServerContext();
    const {buildStaticUrl} = useUrlBuilder();
    const textI9d = getNodeProps(currentNode, ['title', 'text', 'image', 'arrangement']);

    const image = {
        src: buildStaticUrl({assetPath: 'img/img-placeholder.jpg'}),
        alt: 'placeholder'
    };

    if (textI9d.image) {
        image.src = textI9d.image.getUrl();
        image.alt = textI9d.image.getDisplayableName();

        server.render.addCacheDependency({node: textI9d.image}, renderContext);
    }

    return (
        <TextIllustrated {...{
            title: textI9d.title,
            text: textI9d.text,
            arrangement: textI9d.arrangement,
            image
        }}/>
    );
};

TextIllustratedDefault.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:textIllustrated',
    name: 'default',
    componentType: 'view'
});
