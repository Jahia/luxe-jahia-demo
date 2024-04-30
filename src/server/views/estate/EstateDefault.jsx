import React from 'react';
import {useServerContext, getNodeProps, server, buildUrl} from '@jahia/js-server-core';
import {useTranslation} from 'react-i18next';

export const EstateDefault = () => {
    const {t} = useTranslation();
    const {currentNode, currentResource, renderContext} = useServerContext();
    const modulePath = renderContext.getURLGenerator().getCurrentModule();
    const locale = currentResource.getLocale().getLanguage();
    const estate = getNodeProps(currentNode, [
        'title',
        'price',
        'images',
        'surface',
        'bedrooms'
    ]);

    const image = {
        src: `${modulePath}/assets/img/img-placeholder.jpg`,
        alt: 'Placeholder'
    };

    if (estate.images[0]) {
        const _image = estate.images[0];
        image.src = buildUrl({value: _image.getUrl()}, renderContext, currentResource);
        image.alt = t('alt.estate', {estate: estate.title});

        server.render.addCacheDependency({node: _image}, renderContext);
    }

    return (
        <a href={buildUrl({path: currentNode.getPath()}, renderContext, currentResource)} className="lux-estateCard">
            <img src={image.src}
                 alt={image.alt}
                 height="265"/>
            <h4 className="my-2">{estate.title}</h4>
            <p className="lux-estateCard_informations">
                {estate.bedrooms} {t('estate.bedrooms.label')} <span className="lux-diamond">✦</span>{' '}
                {estate.surface.toLocaleString(locale)} m<sup>2</sup>
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
