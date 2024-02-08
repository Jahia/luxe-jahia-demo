import React from 'react';
import {useServerContext, getNodeProps, jAddCacheDependency} from '@jahia/js-server-engine';
import {Figure} from '../../components';

export const MainHeaderTextDown = () => {
    const {currentNode} = useServerContext();
    const header = getNodeProps(currentNode, ['title', 'teaser', 'image']);

    if (header.image) {
        jAddCacheDependency({node: header.image});
    }

    return (
        <>
            {header.image &&
            <section className="container">
                <div className="row">
                    <Figure src={header.image.getUrl()}
                            alt={header.image.getDisplayableName()}
                            layout="imgFull"/>
                </div>
            </section>}

            <section className="container">
                <hgroup className="row text-center">
                    <h1 className="display-1">{header.title}</h1>
                    <p className="h2 mt-0">
                        {header.teaser}
                    </p>
                </hgroup>
            </section>
        </>
    );
};

MainHeaderTextDown.jahiaComponent = {
    id: 'mainHeaderTextDownCmp',
    nodeType: 'luxe:header',
    name: 'mainHeader-textDown',
    componentType: 'view'
};
