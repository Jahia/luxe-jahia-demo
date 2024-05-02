import React from 'react';
import {
    useServerContext,
    getNodeProps,
    server, buildUrl
} from '@jahia/js-server-core';

import {TextIllustrated} from '../../components';

export const TextIllustratedDefault = () => {
    const {currentNode, renderContext, currentResource} = useServerContext();
    const modulePath = renderContext.getURLGenerator().getCurrentModule();
    const textI9d = getNodeProps(currentNode, ['title', 'text', 'image', 'arrangement']);

    const image = {
        src: `${modulePath}/assets/img/img-placeholder.jpg`,
        alt: 'placeholder'
    };

    if (textI9d.image) {
        image.src = buildUrl({value: textI9d.image.getUrl()}, renderContext, currentResource);
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

TextIllustratedDefault.jahiaComponent = {
    nodeType: 'luxe:textIllustrated',
    name: 'default',
    componentType: 'view'
};
