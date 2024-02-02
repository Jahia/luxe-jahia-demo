import React from 'react';
import {useServerContext, getNodeProps, jAddCacheDependency} from '@jahia/js-server-engine';
import {EstateMainView} from '../../components';

export const FullPage = () => {
    const {currentNode, currentResource} = useServerContext();
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
    jAddCacheDependency({node: image});

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

FullPage.jahiaComponent = {
    id: 'fullPageCmp',
    nodeType: 'luxe:estate',
    name: 'default',
    componentType: 'view'
};
