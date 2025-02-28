import React from 'react';
import {jahiaComponent, server, useUrlBuilder} from '@jahia/javascript-modules-library';

import {TextIllustrated} from '../../components';

jahiaComponent(
    {
        nodeType: 'luxe:textIllustrated',
        name: 'default',
        componentType: 'view'
    },
    ({title, text, image: imageNode, arrangement}, {renderContext}) => {
        const {buildStaticUrl} = useUrlBuilder();
        const image = {
            src: buildStaticUrl({assetPath: 'img/img-placeholder.jpg'}),
            alt: 'placeholder'
        };

        if (imageNode) {
            image.src = imageNode.getUrl();
            image.alt = imageNode.getDisplayableName();

            server.render.addCacheDependency({node: imageNode}, renderContext);
        }

        return (
            <TextIllustrated {...{
                title: title,
                text: text,
                arrangement: arrangement,
                image
            }}/>
        );
    }
);
