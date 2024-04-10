import React from 'react';
import {useServerContext, getNodeProps, server} from '@jahia/js-server-core';
import {Col, Figure, PageTitle, Row, Section} from '../../components';
import {ChevronLeftIcon} from '@heroicons/react/24/solid';

export const EstateFullPage = () => {
    const {currentNode, currentResource, renderContext} = useServerContext();
    const locale = currentResource.getLocale().getLanguage();
    const isBackBtnEnabled = currentResource.getModuleParams().get('isBackBtnEnabled') === 'true';

    const parent = currentNode.getParent();
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

    const image = estate.images[0];
    server.render.addCacheDependency({node: image}, renderContext);

    return (
        <>
            <Section>
                <div className="d-flex mb-4">
                    {isBackBtnEnabled && parent && (
                    <button
                                type="button"
                                className="btn btn-light btn-lg me-4 _backToParentPage"
                    >
                        <ChevronLeftIcon className="lux-icon"/>
                    </button>
                        )}

                    <PageTitle
                            title={estate.title}
                            className="pb-0"
                        />
                </div>
                <Figure src={image.getUrl()}
                        alt={image.getDisplayableName()}
                        layout="imgFull"/>

            </Section>
            <Section>
                <Row className="gap-5">
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
                                    Type
                                </dt>
                                <dd className="lux-house_information_value">
                                    {estate.type}
                                </dd>
                            </div>
                            <div className="lux-house_information_row d-flex">
                                <dt className="lux-house_information_key">
                                    Superficie
                                </dt>
                                <dd className="lux-house_information_value">
                                    {estate.surface.toLocaleString(locale)}m<sup>2</sup>
                                </dd>
                            </div>
                            <div className="lux-house_information_row d-flex">
                                <dt className="lux-house_information_key">
                                    Pièces
                                </dt>
                                <dd className="lux-house_information_value">
                                    {estate.rooms}
                                </dd>
                            </div>
                            <div className="lux-house_information_row d-flex">
                                <dt className="lux-house_information_key">
                                    Chambres
                                </dt>
                                <dd className="lux-house_information_value">
                                    {estate.bedrooms}
                                </dd>
                            </div>
                            <div className="lux-house_information_row d-flex">
                                <dt className="lux-house_information_key">
                                    Salles de bain
                                </dt>
                                <dd className="lux-house_information_value">
                                    {estate.bathrooms}
                                </dd>
                            </div>
                            {estate.options && estate.options.map(option => (
                                <div key={option} className="lux-house_information_row d-flex">
                                    <dt className="lux-house_information_key">
                                        {option}
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
