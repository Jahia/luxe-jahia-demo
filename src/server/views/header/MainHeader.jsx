import React from 'react';
import {useServerContext, getNodeProps} from '@jahia/js-server-engine';
import {Figure, PageHeader} from '../../components';

export const MainHeader = () => {
    const {currentNode} = useServerContext();
    const header = getNodeProps(currentNode, ['title', 'teaser', 'image']);
    return (
        <>
            <section className="container">
                <PageHeader
                    title={header.title}
                    description={header.teaser}
                />
            </section>
            <section className="container">
                <div className="row">
                    <Figure imgURL={header.image?.getUrl()} layout="imgFull"/>
                </div>
            </section>

        </>
    );
};

MainHeader.jahiaComponent = {
    id: 'mainHeaderCmp',
    nodeType: 'luxe:header',
    name: 'mainHeader',
    componentType: 'view'
};
