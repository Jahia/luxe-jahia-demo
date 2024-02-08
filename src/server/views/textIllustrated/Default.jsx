import React from 'react';
import {
    useServerContext,
    getNodeProps,
    jAddCacheDependency
} from '@jahia/js-server-engine';

import {TextIllustrated} from '../../components';

export const Default = () => {
    const {currentNode, renderContext} = useServerContext();
    const modulePath = renderContext.getURLGenerator().getCurrentModule();
    const textI9d = getNodeProps(currentNode, ['title', 'text', 'image', 'arrangement']);

    if (textI9d.image) {
        jAddCacheDependency({node: textI9d.image});
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

Default.jahiaComponent = {
    id: 'defaultTextIllustratedCmp',
    nodeType: 'luxe:textIllustrated',
    name: 'default',
    componentType: 'view'
};
