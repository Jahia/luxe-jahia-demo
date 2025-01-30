import React from 'react';
import {
    defineJahiaComponent,
    getNodeProps,
    getNodesByJCRQuery,
    Render,
    server,
    useServerContext,
    useUrlBuilder
} from '@jahia/javascript-modules-library';

import {useTranslation} from 'react-i18next';
import {Col, ContentHeader, HeadingSection, Row, Section, Table} from '../../components';

const MAX_ESTATE = 6;

export const BlogFullPage = () => {
    const {t} = useTranslation();
    const {currentNode, renderContext} = useServerContext();
    const {buildStaticUrl} = useUrlBuilder();
    const currentNodePath = currentNode.getPath();

    const blog = getNodeProps(currentNode, [
        'title',
        'body',
        'country',
        'enableEstates',
        'enableAgencies'
    ]);

    const query = `SELECT *
                   from [luxe:estate] as estate
                   where isdescendantnode('${currentNodePath}')
                   order by estate.[jcr:created] DESC`;
    server.render.addCacheDependency({flushOnPathMatchingRegexp: `${currentNodePath}/.*`}, renderContext);

    const estates = getNodesByJCRQuery(currentNode.getSession(), query, MAX_ESTATE);

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
                <HeadingSection title={t('section.heading.contact')}/>
                <Row>
                    <Col>
                        <address>
                            <div className="d-flex flex-column mb-4">
                                <strong className="lux-capitalize">{t('section.contact.address')}</strong>
                                <span>{agency.address}</span>
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <strong className="lux-capitalize">{t('section.contact.phone')}</strong>
                                <a href={`tel:${agency.phone}`}>
                                    {agency.phone}
                                </a>
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <strong className="lux-capitalize">{t('section.contact.email')}</strong>
                                <a href={`mailto:${agency.email}`}>
                                    {agency.email}
                                </a>
                            </div>
                        </address>
                        <button type="button"
                                className="btn btn-primary btn-lg w-100 lux-capitalize"
                                data-bs-toggle="modal"
                                data-bs-target="#modalContact"
                        >
                            {t('section.contact.btn')}
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
                <HeadingSection title={t('section.heading.experts')}/>
                <Row className="row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-3">
                    {agency.realtors?.map(realtor => (
                        <Col key={realtor.getIdentifier()} className="g-0">
                            <Render node={realtor}/>
                        </Col>
                    ))}
                </Row>
                {/* <AddContentButtons nodeTypes={['luxe:realtor']}/> */}
            </Section>
            <Section>
                <HeadingSection title={t('section.heading.exclusiveAgencyEstates')}/>
                <Row className="row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-0">
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

BlogFullPage.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:agency',
    name: 'fullPage',
    componentType: 'view'
});
