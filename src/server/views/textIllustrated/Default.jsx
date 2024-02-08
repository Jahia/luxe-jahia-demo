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
    const textIllustrated = getNodeProps(currentNode, ['title', 'text', 'image', 'arrangement']);

    const imageNode = textIllustrated.image;
    jAddCacheDependency({node: imageNode});

    const image = {
        src: imageNode?.getUrl() || `${modulePath}/assets/img/img-placeholder.jpg`,
        alt: imageNode?.getDisplayableName() || 'placeholder'
    };
    return (
        <TextIllustrated {...{
            title: textIllustrated.title,
            text: textIllustrated.text,
            arrangement: textIllustrated.arrangement,
            image
        }}/>
    );
};

Default.jahiaComponent = {
    id: 'defaultTextIllustratedCmp',
    nodeType: 'luxe:textIllustrated',
    name: 'default',
    componentType: 'view'
};
