import React from 'react';
import {useServerContext, getNodeProps, server, defineJahiaComponent} from '@jahia/javascript-modules-library';
import {Figure, PageTitle, Row} from '../../components';

export const HeaderTextUp = () => {
    const {currentNode, renderContext} = useServerContext();
    const header = getNodeProps(currentNode, ['title', 'subtitle', 'image']);

    if (header.image) {
        server.render.addCacheDependency({node: header.image}, renderContext);
    }

    return (
        <header className="container d-flex flex-column py-2 py-md-4 gap-3">
            <Row>
                <PageTitle
                        title={header.title}
                        description={header.subtitle}
                        />
            </Row>
            {header.image &&
            <Row>
                <Figure src={header.image.getUrl()}
                        alt={header.image.getDisplayableName()}
                        layout="imgFull"/>
            </Row>}
        </header>
    );
};

HeaderTextUp.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:header',
    name: 'textUp',
    componentType: 'view'
});
