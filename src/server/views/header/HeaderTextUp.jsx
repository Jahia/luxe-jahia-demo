import React from 'react';
import {useServerContext, getNodeProps, server} from '@jahia/js-server-core';
import {Figure, PageTitle} from '../../components';

export const HeaderTextUp = () => {
    const {currentNode, renderContext} = useServerContext();
    const header = getNodeProps(currentNode, ['title', 'teaser', 'image']);

    if (header.image) {
        server.render.addCacheDependency({node: header.image}, renderContext);
    }

    return (
        <>
            <section className="container">
                <PageTitle
                    title={header.title}
                    description={header.teaser}
                />
            </section>

            {header.image &&
            <section className="container">
                <div className="row">
                    <Figure src={header.image.getUrl()}
                            alt={header.image.getDisplayableName()}
                            layout="imgFull"/>
                </div>
            </section>}
        </>
    );
};

HeaderTextUp.jahiaComponent = {
    nodeType: 'luxe:header',
    name: 'textUp',
    componentType: 'view'
};
