import React from 'react';
import {
    useServerContext,
    getNodeProps,
    jAddCacheDependency,
    getNodesByJCRQuery,
    JAddResources
} from '@jahia/js-server-engine';
import todoI18n from '../../temp/locales/fr';
import {RealtorMainView} from '../../components/realtor';

const MAX_ESTATE = 3;

export const RealtorCm = () => {
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
        'experience',
        'email',
        'phone'
    ]);

    const query = `SELECT *
                   from [luxe:estate] as estate
                   where isdescendantnode('${agencyNodePath}')
                   order by estate.[jcr:created] DESC`;
    jAddCacheDependency({flushOnPathMatchingRegexp: `${agencyNodePath}/.*`});

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
            value: `${realtor.experience}`
        }
    ];

    const image = {
        src: `${modulePath}/assets/img/agent-placeholder.jpg`,
        alt: 'Placeholder'
    };

    if (realtor.image) {
        jAddCacheDependency({node: realtor.image});
        image.src = realtor.image.getUrl();
        image.alt = `Portrait of the agent ${realtor.firstName} ${realtor.lastName}`;
    }

    return (
        <>
            <JAddResources type="css" resources="main.css"/>
            <main>
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
            </main>
        </>
    );
};

RealtorCm.jahiaComponent = {
    nodeType: 'luxe:realtor',
    name: 'cm',
    componentType: 'view'
};
