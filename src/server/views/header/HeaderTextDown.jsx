import React from 'react';
import {useServerContext, getNodeProps, server, buildUrl} from '@jahia/js-server-core';
import {Figure, Row} from '../../components';

export const HeaderTextDown = () => {
    const {currentNode, renderContext, currentResource} = useServerContext();
    const header = getNodeProps(currentNode, ['title', 'teaser', 'image']);

    if (header.image) {
        server.render.addCacheDependency({node: header.image}, renderContext);
    }

    return (
        <header className="container py-4 py-md-5 mb-5">
            {header.image &&
                <Row>
                    <Figure src={buildUrl({value: header.image.getUrl()}, renderContext, currentResource)}
                            alt={header.image.getDisplayableName()}
                            layout="imgFull"/>
                </Row>}

            <hgroup className="row text-center">
                <h1 className="display-1 mb-0">{header.title}</h1>
                <p className="h2 mt-0">
                    {header.teaser}
                </p>
            </hgroup>
        </header>
    );
};

HeaderTextDown.jahiaComponent = {
    nodeType: 'luxe:header',
    name: 'textDown',
    componentType: 'view'
};
