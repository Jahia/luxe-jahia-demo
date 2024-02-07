import React from 'react';
import {useServerContext, getNodeProps, jAddCacheDependency, jUrl} from '@jahia/js-server-engine';

export const Card = () => {
    const {currentNode, currentResource} = useServerContext();
    const locale = currentResource.getLocale().getLanguage();
    const estate = getNodeProps(currentNode, [
        'title',
        'price',
        'gallery',
        'surface',
        'bedrooms'
    ]);

    const image = estate.gallery[0];
    jAddCacheDependency({node: image});

    return (
        <a href={jUrl({path: currentNode.getPath()})} className="lux-propertyItem">
            <img src={image.getUrl()} alt={estate.title} height="265"/>
            <h4 className="my-2">{estate.title}</h4>
            <p className="lux-propertyItem_informations">
                {estate.bedrooms} chambres <span className="lux-diamond">✦</span>{' '}
                {estate.surface.toLocaleString(locale)}m<sup>2</sup>
            </p>
            <strong className="lux-propertyItem_price">{estate.price.toLocaleString(locale)}€</strong>
        </a>
    );
};

Card.jahiaComponent = {
    id: 'cardCmp',
    nodeType: 'luxe:estate',
    name: 'default',
    componentType: 'view'
};
