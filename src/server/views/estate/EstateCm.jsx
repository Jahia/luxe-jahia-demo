import React, {Fragment} from 'react';
import {useServerContext, getNodeProps, jAddCacheDependency, JAddResources} from '@jahia/js-server-engine';
import {EstateMainView} from '../../components';

export const EstateCm = () => {
    const {currentNode, currentResource} = useServerContext();
    const locale = currentResource.getLocale().getLanguage();
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
        <>
            <JAddResources type="css" resources="main.css"/>
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
                locale}}
            />
        </>

    );
};

EstateCm.jahiaComponent = {
    nodeType: 'luxe:estate',
    name: 'cm',
    componentType: 'view'
};
