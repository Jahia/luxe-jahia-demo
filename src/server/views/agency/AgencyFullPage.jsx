import React from 'react';
import {
    useServerContext,
    getNodeProps,
    server,
    getChildNodes,
    getNodesByJCRQuery
} from '@jahia/js-server-engine';

import {AgencyMainView} from '../../components/agency';
import todoI18n from '../../temp/locales/fr';

const MAX_ESTATE = 6;
export const AgencyFullPage = () => {
    const {currentNode, currentResource, renderContext} = useServerContext();
    const locale = currentResource.getLocale().getLanguage();
    const modulePath = renderContext.getURLGenerator().getCurrentModule();
    const currentNodePath = currentNode.getPath();

    const agency = getNodeProps(currentNode, [
        'name',
        'description',
        'image',
        'creationDate',
        'languages',
        'address',
        'email',
        'phone',
        'realtors'
    ]);

    const query = `SELECT *
                   from [luxe:estate] as estate
                   where isdescendantnode('${currentNodePath}')
                   order by estate.[jcr:created] DESC`;
    server.render.addCacheDependency({flushOnPathMatchingRegexp: `${currentNodePath}/.*`}, renderContext);

    const estates = getNodesByJCRQuery(currentNode.getSession(), query, MAX_ESTATE);

    const data = [
        {
            title: todoI18n.table.data.nbRealtor,
            value: `${realtors.length}`
        },
        {
            title: todoI18n.table.data.creationDate,
            value: new Date(agency.creationDate).getFullYear().toString(10) || '-'
        },
        {
            title: todoI18n.table.data.spokenLanguage,
            value: agency.languages.join(', ')
        }
    ];

    const image = {
        src: `${modulePath}/assets/img/agency-placeholder.jpg`,
        alt: 'Placeholder'
    };

    if (agency.image) {
        server.render.addCacheDependency({node: agency.image}, renderContext);
        image.src = agency.image.getUrl();
        image.alt = `View of the agency ${agency.name}`;
    }

    return (
        <AgencyMainView {...{
            name: agency.name,
            description: agency.description,
            image,
            data,
            address: agency.address,
            phone: agency.phone,
            email: agency.email,
            realtors: agency.realtors,
            estates,
            locale}}
        />
    );
};

AgencyFullPage.jahiaComponent = {
    nodeType: 'luxe:agency',
    name: 'fullPage',
    componentType: 'view'
};
