import React from 'react';
import { MainLayout } from '../../layouts';
import { ContentHeader, Table } from '../../components';
import { Row, HeadingSection } from '../../contentTypes';
import { useServerContext, getNodeProps, jUrl, getChildNodes, JAddContentButtons, JRender } from '@jahia/js-server-engine';

export const agency = () => {
    const {currentNode} = useServerContext();
    const props = getNodeProps(currentNode, ['name', 'description', 'image', 'creationDate', 'languages', 'address', 'email', 'phone']);
    const childs = getChildNodes(currentNode);
    const realtors = childs.filter(child => child.getNodeTypes().includes('luxe:realtor'));
    const estates = childs.filter(child => child.getNodeTypes().includes('luxe:estate'));
    const data = [
        {
            k: "Nombre d’experts",
            v: `${realtors.length}`,
        },
        {
            k: "Date de création",
            v: `${new Date(props.creationDate).getFullYear()}`,
        },
        {
            k: "Langues parlées",
            v: props.languages.join(', ')
        },
    ];
    return (
        <MainLayout>
            <>
                <section>
                    <ContentHeader 
                        title={props.name}
                        imgURL={jUrl({path: props.image.getPath()})}
                        description={props.description}
                    />
                </section>
                <section>
                    <Table data={data} />
                </section>
                <section>
                    <HeadingSection title="contact" />
                    <Row>
                        <>
                            <address>
                                <div className="d-flex flex-column mb-4">
                                    <strong>Adresse</strong>
                                    <span>{props.address}</span>
                                </div>
                                <div className="d-flex flex-column mb-4">
                                    <strong>Téléphone</strong>
                                    <a href={`tel:${props.phone}`}>
                                        {props.phone}
                                    </a>
                                </div>
                                <div className="d-flex flex-column mb-4">
                                    <strong>e-mail</strong>
                                    <a href={`mailto:${props.email}`}>
                                        {props.email}
                                    </a>
                                </div>
                            </address>
                            <button
                                className="btn btn-primary btn-lg w-100"
                                data-bs-toggle="modal"
                                data-bs-target="#modalContact"
                            >
                                Prendre rendez-vous
                            </button>
                        </>
                        <div className="d-flex justify-content-center align-items-center bg-secondary flex-fill h-100">
                            map here
                        </div>
                    </Row>
                </section>
                <section>
                    <HeadingSection title="Nos experts" />
                    <Row type="grid" grid="4" gutter="medium">
                        {realtors.map((realtor) => (
                            <JRender path={realtor.getPath()}/>
                        ))}
                    </Row>
                    <JAddContentButtons />
                </section>
                <section>
                    <HeadingSection title="Propriétés exclusives de l’agence"/>
                    <Row type="grid" grid="3" gutter="none" columnSpacing="none">
                        {estates.map((estate) => (
                            <JRender path={estate.getPath()}/>
                        ))}
                    </Row>
                </section>
            </>
        </MainLayout>
    );
}

agency.jahiaComponent = {
    nodeType: 'luxe:agency',
    name: 'default',
    componentType: 'template'
};