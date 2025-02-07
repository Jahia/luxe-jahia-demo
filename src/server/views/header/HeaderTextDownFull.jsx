import React from 'react';
import {useServerContext, getNodeProps, server, defineJahiaComponent} from '@jahia/javascript-modules-library';
import {Figure, Row} from '../../components';

export const HeaderTextDownFull = () => {
    const {currentNode, renderContext} = useServerContext();
    const header = getNodeProps(currentNode, ['title', 'teaser', 'image', 'date']);

    if (header.image) {
        server.render.addCacheDependency({node: header.image}, renderContext);
    }

    return (
        <header className="container py-4 py-md-5 mb-5">
            {header.image &&
                <Row>
                    <Figure src={header.image.getUrl()}
                            alt={header.image.getDisplayableName()}
                            layout="imgFull"/>
                </Row>}
            {header.date &&
                <div>{new Date(header.date)
                    .toLocaleDateString(
                        currentNode.getLanguage(),
                        {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }
                    ) }
                </div>}
            <hgroup className="row text-center">
                <h1 className="display-1 mb-0">{header.title}</h1>
                <p className="h2 mt-0">
                    {header.teaser}
                </p>
            </hgroup>
        </header>
    );
};

HeaderTextDownFull.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:header',
    name: 'textDownFull',
    componentType: 'view'
});
