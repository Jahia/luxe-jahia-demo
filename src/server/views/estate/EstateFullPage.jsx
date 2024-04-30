import React from 'react';
import {useServerContext, getNodeProps, server, buildUrl} from '@jahia/js-server-core';
import {Col, Figure, PageTitle, Row, Section} from '../../components';
import {useTranslation} from 'react-i18next';

export const EstateFullPage = () => {
    const {t} = useTranslation();
    const {currentNode, currentResource, renderContext} = useServerContext();
    const modulePath = renderContext.getURLGenerator().getCurrentModule();
    const locale = currentResource.getLocale().getLanguage();

    const estate = getNodeProps(currentNode, [
        'title',
        'description',
        'price',
        'images',
        'type',
        'surface',
        'rooms',
        'bedrooms',
        'bathrooms',
        'options'
    ]);

    const image = {
        src: `${modulePath}/assets/img/img-placeholder.jpg`,
        alt: 'Placeholder'
    };

    if (estate.images[0]) {
        const _image = estate.images[0];
        image.src = buildUrl({value: _image.getUrl()}, renderContext, currentResource);
        image.alt = t('alt.estate', {estate: estate.title});

        server.render.addCacheDependency({node: _image}, renderContext);
    }

    return (
        <>
            <Section>
                <header className="d-flex mb-5">
                    <PageTitle
                        title={estate.title}
                        className="pb-0"
                    />
                </header>
                <Row>
                    <Figure src={image.src}
                            alt={image.alt}
                            layout="imgFull"/>
                </Row>
                <Row className="row-cols-1 row-cols-lg-2 g-5">
                    <Col>
                        {/* eslint-disable-next-line react/no-danger */}
                        <unwanteddiv dangerouslySetInnerHTML={{
                                __html: estate.description
                            }}
                                     className="lux-richText"/>
                    </Col>
                    <Col>
                        <p className="display-5 text-primary fw-medium">
                            {estate.price.toLocaleString(locale)} €
                        </p>
                        <dl className="lux-house_informations">
                            <div className="lux-house_information_row d-flex">
                                <dt className="lux-house_information_key">
                                    {t('estate.type.label')}
                                </dt>
                                <dd className="lux-house_information_value">
                                    {t(`estate.type.${estate.type}`)}
                                </dd>
                            </div>
                            <div className="lux-house_information_row d-flex">
                                <dt className="lux-house_information_key">
                                    {t('estate.surface.label')}
                                </dt>
                                <dd className="lux-house_information_value">
                                    {estate.surface.toLocaleString(locale)} m<sup>2</sup>
                                </dd>
                            </div>
                            <div className="lux-house_information_row d-flex">
                                <dt className="lux-house_information_key">
                                    {t('estate.rooms.label')}
                                </dt>
                                <dd className="lux-house_information_value">
                                    {estate.rooms}
                                </dd>
                            </div>
                            <div className="lux-house_information_row d-flex">
                                <dt className="lux-house_information_key">
                                    {t('estate.bedrooms.label')}
                                </dt>
                                <dd className="lux-house_information_value">
                                    {estate.bedrooms}
                                </dd>
                            </div>
                            <div className="lux-house_information_row d-flex">
                                <dt className="lux-house_information_key">
                                    {t('estate.bathrooms.label')}
                                </dt>
                                <dd className="lux-house_information_value">
                                    {estate.bathrooms}
                                </dd>
                            </div>
                            {estate.options && estate.options.map(option => (
                                <div key={option} className="lux-house_information_row d-flex">
                                    <dt className="lux-house_information_key">
                                        {t(`estate.options.${option}`)}
                                    </dt>
                                    <dd className="lux-house_information_value  d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="24px" height="24px">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                                        </svg>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                        {/* <AgentItem imgURL={profile1} name="Robert Fox"/> */}
                    </Col>
                </Row>
            </Section>
            {/* <Section>TODO: Biens similaire</Section> */}
        </>
    );
};

EstateFullPage.jahiaComponent = {
    nodeType: 'luxe:estate',
    name: 'fullPage',
    componentType: 'view'
};
