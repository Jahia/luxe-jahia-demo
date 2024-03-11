import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {ContentHeader, HeadingSection, Table} from '../';
import {JAddContentButtons, JRender} from '@jahia/js-server-engine';

export const AgencyMainView = ({
    name,
    description,
    image,
    data,
    address,
    phone,
    email,
    realtors,
    estates
}) => {
    return (
        <>
            <section>
                <div className="container">
                    <ContentHeader
                        title={name}
                        image={image}
                        description={description}
                    />
                </div>
            </section>
            <section>
                <div className="container">
                    <Table rows={data}/>
                </div>
            </section>
            <section>
                <div className="container">
                    <HeadingSection title="contact"/>
                    <div className="row">
                        <div className="col">
                            <address>
                                <div className="d-flex flex-column mb-4">
                                    <strong>Adresse</strong>
                                    <span>{address}</span>
                                </div>
                                <div className="d-flex flex-column mb-4">
                                    <strong>Téléphone</strong>
                                    <a href={`tel:${phone}`}>
                                        {phone}
                                    </a>
                                </div>
                                <div className="d-flex flex-column mb-4">
                                    <strong>e-mail</strong>
                                    <a href={`mailto:${email}`}>
                                        {email}
                                    </a>
                                </div>
                            </address>
                            <button type="button"
                                    className="btn btn-primary btn-lg w-100"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalContact"
                            >
                                Prendre rendez-vous
                            </button>
                        </div>
                        <div className="col">
                            <div className="d-flex justify-content-center align-items-center bg-secondary flex-fill h-100">
                                map here
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <HeadingSection title="Nos experts"/>
                    <div className="row row-cols-4 g-3">
                        {realtors.map(realtor => (
                            <div key={realtor.getIdentifier()} className="col">
                                <JRender node={realtor}/>
                            </div>
                    ))}
                    </div>
                </div>
                <JAddContentButtons/>
            </section>
            <section>
                <div className="container">
                    <HeadingSection title="Propriétés exclusives de l’agence"/>
                    <div className="row row-cols-3 g-0">
                        {estates.map(estate => (
                            <div key={estate.getIdentifier()} className="col g-0">
                                <JRender node={estate}/>
                            </div>
                    ))}
                    </div>
                </div>
            </section>
        </>
    );
};

AgencyMainView.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired
    }).isRequired,
    data: PropTypes.array.isRequired,
    address: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    realtors: PropTypes.array,
    estates: PropTypes.array
};
