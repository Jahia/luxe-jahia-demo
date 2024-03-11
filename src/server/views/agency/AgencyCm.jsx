import React from 'react';
import {
    useServerContext,
    getNodeProps,
    jAddCacheDependency,
    getChildNodes,
    JAddResources
} from '@jahia/js-server-engine';
import {AgencyMainView} from '../../components/agency';

export const AgencyCm = () => {
    const {currentNode, currentResource, renderContext} = useServerContext();
    const locale = currentResource.getLocale().getLanguage();
    const modulePath = renderContext.getURLGenerator().getCurrentModule();

    const agency = getNodeProps(currentNode, [
        'name',
        'description',
        'image',
        'creationDate',
        'languages',
        'address',
        'email',
        'phone'
    ]);

    const realtors = getChildNodes(currentNode, -1, 0, child => {
        return child.isNodeType('luxe:realtor');
    });
    const estates = getChildNodes(currentNode, 50, 0, child => {
        return child.isNodeType('luxe:estate');
    });

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
                    realtors,
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
