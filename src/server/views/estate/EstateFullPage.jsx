import React from 'react';
import {useServerContext, getNodeProps, server} from '@jahia/js-server-engine';
import {EstateMainView} from '../../components';

export const EstateFullPage = () => {
    const {currentNode, currentResource, renderContext} = useServerContext();
    const locale = currentResource.getLocale().getLanguage();
    const isBackBtnEnabled = currentResource.getModuleParams().get('isBackBtnEnabled') === 'true';

    const parent = currentNode.getParent();
    const estate = getNodeProps(currentNode, [
        'title',
        'description',
        'price',
        'gallery',
        'type',
        'surface',
        'rooms',
        'bedrooms',
        'bathrooms',
        'options'
    ]);

    const image = estate.gallery[0];
    server.render.addCacheDependency({node: image}, renderContext);

    return (
        <EstateMainView {...{
            title: estate.title,
            description: estate.description,
            price: estate.price,
            image,
            type: estate.type,
            surface: estate.surface,
            rooms: estate.rooms,
            bedrooms: estate.bedrooms,
            bathrooms: estate.bathrooms,
            options: estate.options,
            locale,
            parent,
            isBackBtnEnabled}}
        />
    );
};

EstateFullPage.jahiaComponent = {
    nodeType: 'luxe:estate',
    name: 'fullPage',
    componentType: 'view'
};
