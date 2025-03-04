import React from 'react';
import {
    AddContentButtons,
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

const getAgencyLanguage = (agency, renderContext) => {
    if (Array.isArray(agency.realtors)) {
        return new Set(agency.realtors.flatMap(realtor => {
            server.render.addCacheDependency({node: realtor}, renderContext);
            const props = getNodeProps(realtor, ['languages']);
            return props.languages || [];
        }));
    }

    return [agency.country.toLowerCase()];
};

export const AgencyFullPage = () => {
    const {t} = useTranslation();
    const {currentNode, renderContext} = useServerContext();
    const {buildStaticUrl} = useUrlBuilder();
    const currentNodePath = currentNode.getPath();

    const agency = getNodeProps(currentNode, [
        'name',
        'description',
        'image',
        'creationDate',
        'country',
        'address',
        'email',
        'phone',
        'realtors'
    ]);
    const languages = [...getAgencyLanguage(agency, renderContext)];

    const query = `SELECT *
                   from [luxe:estate] as estate
                   where isdescendantnode('${currentNodePath}')
                   order by estate.[jcr:created] DESC`;
    server.render.addCacheDependency({flushOnPathMatchingRegexp: `${currentNodePath}/.*`}, renderContext);

    const estates = getNodesByJCRQuery(currentNode.getSession(), query, MAX_ESTATE);

    const data = [
        {
            title: t('table.data.nbRealtor'),
            value: `${agency.realtors?.length || 0}`
        },
        {
            title: t('table.data.creationDate'),
            value: new Date(agency.creationDate).getFullYear().toString(10) || '-'
        },
        {
            title: t('table.data.spokenLanguage.label'),
            value: languages.map(language => t(`table.data.spokenLanguage.${language}`)).join(', ')
        }
    ];

    const image = {
        src: buildStaticUrl({assetPath: 'img/agency-placeholder.jpg'}),
        alt: 'Placeholder'
    };

    if (agency.image) {
        image.src = agency.image.getUrl();
        image.alt = t('alt.agency', {agency: agency.name});

        server.render.addCacheDependency({node: agency.image}, renderContext);
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
                            <Render node={realtor} editable={false}/>
                        </Col>
                    ))}
                </Row>
            </Section>
            <Section>
                <HeadingSection title={t('section.heading.exclusiveAgencyEstates')}/>
                <Row className="row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-0">
                    {renderContext.isEditMode() &&
                    <Col key="addNewRealEstate" className="g-0">
                        <AddContentButtons nodeTypes="luxe:estate"/>
                    </Col>}

                    {estates.map(estate => (
                        <Col key={estate.getIdentifier()} className="g-0">
                            <Render node={estate} editable={false}/>
                        </Col>
                    ))}
                </Row>
            </Section>
        </>
    );
};

AgencyFullPage.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:agency',
    name: 'fullPage',
    componentType: 'view'
});
