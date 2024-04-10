import React from 'react';
import {
    useServerContext,
    getNodeProps,
    server,
    getNodesByJCRQuery, Render
} from '@jahia/js-server-core';

import todoI18n from '../../temp/locales/fr';
import {Col, ContentHeader, HeadingSection, Row, Section, Table} from '../../components';

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
            value: `${agency.realtors?.length || 0}`
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
        <>
            <Section>
                <ContentHeader
                    title={agency.name}
                    image={image}
                    description={agency.description}
                />
            </Section>
            <Section>
                <Table rows={data}/>
            </Section>
            <Section>
                <HeadingSection title={todoI18n.section.heading.contact}/>
                <Row>
                    <Col>
                        <address>
                            <div className="d-flex flex-column mb-4">
                                <strong>{todoI18n.section.contact.address}</strong>
                                <span>{agency.address}</span>
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <strong>{todoI18n.section.contact.phone}</strong>
                                <a href={`tel:${agency.phone}`}>
                                    {agency.phone}
                                </a>
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <strong>{todoI18n.section.contact.email}</strong>
                                <a href={`mailto:${agency.email}`}>
                                    {agency.email}
                                </a>
                            </div>
                        </address>
                        <button type="button"
                                className="btn btn-primary btn-lg w-100"
                                data-bs-toggle="modal"
                                data-bs-target="#modalContact"
                        >
                            {todoI18n.section.contact.btn}
                        </button>
                    </Col>
                    <Col>
                        {/* <div className="d-flex justify-content-center align-items-center bg-secondary flex-fill h-100">
                            map here
                        </div> */}
                    </Col>
                </Row>
            </Section>
            <Section>
                <HeadingSection title={todoI18n.section.heading.experts}/>
                <Row className="row-cols-4 g-3">
                    {agency.realtors?.map(realtor => (
                        <Col key={realtor.getIdentifier()}>
                            <Render node={realtor}/>
                        </Col>
                    ))}
                </Row>
                {/* <AddContentButtons nodeTypes={['luxe:realtor']}/> */}
            </Section>
            <Section>
                <HeadingSection title={todoI18n.section.heading.exclusiveAgencyEstates}/>
                <Row className="row-cols-3 g-0">
                    {estates.map(estate => (
                        <Col key={estate.getIdentifier()} className="g-0">
                            <Render node={estate}/>
                        </Col>
                    ))}
                </Row>
            </Section>
        </>
    );
};

AgencyFullPage.jahiaComponent = {
    nodeType: 'luxe:agency',
    name: 'fullPage',
    componentType: 'view'
};
