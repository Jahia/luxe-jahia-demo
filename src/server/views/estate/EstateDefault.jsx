import React from 'react';
import {useServerContext, getNodeProps, server, buildUrl} from '@jahia/js-server-engine';

export const EstateDefault = () => {
    const {currentNode, currentResource, renderContext} = useServerContext();
    const locale = currentResource.getLocale().getLanguage();
    const estate = getNodeProps(currentNode, [
        'title',
        'price',
        'images',
        'surface',
        'bedrooms'
    ]);

    const image = estate.images[0];
    server.render.addCacheDependency({node: image}, renderContext);

    return (
        <a href={buildUrl({path: currentNode.getPath()}, renderContext, currentResource)} className="lux-estateCard">
            <img src={image.getUrl()} alt={image.getDisplayableName()} height="265"/>
            <h4 className="my-2">{estate.title}</h4>
            <p className="lux-estateCard_informations">
                {estate.bedrooms} chambres <span className="lux-diamond">✦</span>{' '}
                {estate.surface.toLocaleString(locale)}m<sup>2</sup>
            </p>
            <strong className="lux-estateCard_price">{estate.price.toLocaleString(locale)}€</strong>
        </a>
    );
};

EstateDefault.jahiaComponent = {
    nodeType: 'luxe:estate',
    name: 'default',
    componentType: 'view'
};
