import React from 'react';
import {useServerContext, getNodeProps, jAddCacheDependency} from '@jahia/js-server-engine';
import {Figure, PageTitle} from '../../components';

export const HeaderTextUp = () => {
    const {currentNode} = useServerContext();
    const header = getNodeProps(currentNode, ['title', 'teaser', 'image']);

    if (header.image) {
        jAddCacheDependency({node: header.image});
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
