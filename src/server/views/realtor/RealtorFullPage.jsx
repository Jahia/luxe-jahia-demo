import React from 'react';
import {
    useServerContext,
    getNodeProps,
    server,
    getNodesByJCRQuery
} from '@jahia/js-server-engine';
import todoI18n from '../../temp/locales/fr';
import {RealtorMainView} from '../../components/realtor';

const MAX_ESTATE = 6;

export const RealtorFullPage = () => {
    const {currentNode, currentResource, renderContext} = useServerContext();
    const locale = currentResource.getLocale().getLanguage();
    const modulePath = renderContext.getURLGenerator().getCurrentModule();

    const agencyNode = currentNode.getParent();
    const agencyNodePath = agencyNode.getPath();

    const agency = getNodeProps(agencyNode, [
        'name',
        'address'
    ]);

    const realtor = getNodeProps(currentNode, [
        'firstName',
        'lastName',
        'description',
        'image',
        'languages',
        'yOfExperience',
        'email',
        'phone'
    ]);

    const query = `SELECT *
                   from [luxe:estate] as estate
                   where isdescendantnode('${agencyNodePath}')
                   order by estate.[jcr:created] DESC`;
    server.render.addCacheDependency({flushOnPathMatchingRegexp: `${agencyNodePath}/.*`}, renderContext);

    const estates = getNodesByJCRQuery(currentNode.getSession(), query, MAX_ESTATE);

    const data = [
        {
            title: todoI18n.table.data.agency,
            value: agency.name
        },
        {
            title: todoI18n.table.data.spokenLanguage,
            value: realtor.languages.join(', ')
        },
        {
            title: todoI18n.table.data.yOfExperience,
            value: `${realtor.yOfExperience}`
        }
    ];

    const image = {
        src: `${modulePath}/assets/img/agent-placeholder.jpg`,
        alt: 'Placeholder'
    };

    if (realtor.image) {
        server.render.addCacheDependency({node: realtor.image}, renderContext);
        image.src = realtor.image.getUrl();
        image.alt = `Portrait of the agent ${realtor.firstName} ${realtor.lastName}`;
    }

    return (
        <RealtorMainView {...{
            name: `${realtor.firstName} ${realtor.lastName}`,
            description: realtor.description,
            image,
            data,
            address: agency.address,
            phone: realtor.phone,
            email: realtor.email,
            estates,
            locale}}
        />
    );
};

RealtorFullPage.jahiaComponent = {
    nodeType: 'luxe:realtor',
    name: 'fullPage',
    componentType: 'view'
};
