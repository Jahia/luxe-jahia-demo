import React from 'react';
import {
    useServerContext,
    getNodeProps,
    jAddCacheDependency,
    getChildNodes,
    JAddResources, getNodesByJCRQuery
} from '@jahia/js-server-engine';
import {AgencyMainView} from '../../components/agency';

const MAX_ESTATE = 3;

export const AgencyCm = () => {
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
    jAddCacheDependency({flushOnPathMatchingRegexp: `${currentNodePath}/.*`});

    const estates = getNodesByJCRQuery(currentNode.getSession(), query, MAX_ESTATE);
    const data = [
        {
            title: 'Nombre d\'experts',
            value: `${realtors.length}`
        },
        {
            title: 'Date de création',
            value: new Date(agency.creationDate).getFullYear() || '-'
        },
        {
            title: 'Langues parlées',
            value: agency.languages.join(', ')
        }
    ];

    const image = {
        src: `${modulePath}/assets/img/agency-placeholder.jpg`,
        alt: 'Placeholder'
    };

    if (agency.image) {
        jAddCacheDependency({node: agency.image});
        image.src = agency.image.getUrl();
        image.alt = `View of the agency ${agency.name}`;
    }

    return (
        <>
            <JAddResources type="css" resources="main.css"/>
            <main>
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
            </main>
        </>
    );
};

AgencyCm.jahiaComponent = {
    nodeType: 'luxe:agency',
    name: 'cm',
    componentType: 'view'
};
