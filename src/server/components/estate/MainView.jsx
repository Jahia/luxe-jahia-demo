import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {ChevronLeftIcon} from '@heroicons/react/24/solid';
import {Figure, PageHeader} from '../';

export const EstateMainView = ({
    title,
    description,
    price,
    image,
    type,
    surface,
    rooms,
    bedrooms,
    bathrooms,
    options,
    locale,
    parent,
    isBackBtnEnabled = false
}) => {
    const btnProps = {
        'x-on:click': 'alert(\'holalala\')'
    };
    return (
        <>
            <section className="container">
                <div className="d-flex mb-4">
                    {isBackBtnEnabled && parent && (
                        <button
                            {...btnProps}
                            className="btn btn-light btn-lg me-4 _backToParentPage"
                            // OnClick={() => { // TODO this is moved to script.js event based on _backToParentPage
                            //     console.log('helllo world');
                            //     window.location.href = jUrl({path: parent.getPath()});
                            //     return false;
                            // }}
                        >
                            <ChevronLeftIcon className="lux-icon"/>
                        </button>
                    )}

                    <PageHeader
                        title={title}
                        className="pb-0"
                    />
                </div>
                <Figure src={image.getUrl()}
                        alt={image.getDisplayableName()}
                        layout="imgFull"/>
            </section>
            <section className="container">
                <div className="row gap-5">
                    <div className="col">
                        {/* eslint-disable-next-line react/no-danger */}
                        <unwanteddiv dangerouslySetInnerHTML={{
                            __html: description
                        }}
                                     className="lux-richText"/>
                    </div>
                    <div className="col">
                        <p className="display-5 text-primary fw-medium">
                            {price.toLocaleString(locale)} €
                        </p>
                        <dl className="lux-house_informations">
                            <div className="lux-house_information_row d-flex">
                                <dt className="lux-house_information_key">
                                    Type
                                </dt>
                                <dd className="lux-house_information_value">
                                    {type}
                                </dd>
                            </div>
                            <div className="lux-house_information_row d-flex">
                                <dt className="lux-house_information_key">
                                    Superficie
                                </dt>
                                <dd className="lux-house_information_value">
                                    {surface.toLocaleString(locale)}m<sup>2</sup>
                                </dd>
                            </div>
                            <div className="lux-house_information_row d-flex">
                                <dt className="lux-house_information_key">
                                    Pièces
                                </dt>
                                <dd className="lux-house_information_value">
                                    {rooms}
                                </dd>
                            </div>
                            <div className="lux-house_information_row d-flex">
                                <dt className="lux-house_information_key">
                                    Chambres
                                </dt>
                                <dd className="lux-house_information_value">
                                    {bedrooms}
                                </dd>
                            </div>
                            <div className="lux-house_information_row d-flex">
                                <dt className="lux-house_information_key">
                                    Salles de bain
                                </dt>
                                <dd className="lux-house_information_value">
                                    {bathrooms}
                                </dd>
                            </div>
                            <div className="lux-house_information_row d-flex">
                                {options?.map(option => (
                                    <Fragment key={option}>
                                        <dt className="lux-house_information_key">
                                            {option}
                                        </dt>
                                        <dd className="lux-house_information_value">
                                            Oui
                                        </dd>
                                    </Fragment>
                                ))}

                            </div>
                        </dl>
                        {/* <AgentItem imgURL={profile1} name="Robert Fox"/> */}
                    </div>
                </div>
            </section>
            <section className="container">TODO: Biens similaire</section>
        </>
    );
};

EstateMainView.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    surface: PropTypes.number.isRequired,
    rooms: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    options: PropTypes.array,
    locale: PropTypes.string.isRequired,
    parent: PropTypes.object,
    isBackBtnEnabled: PropTypes.bool
};
