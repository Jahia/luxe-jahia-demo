import React from 'react';
import { MainLayout } from '../../layouts';
import { ContentHeader, Table } from '../../components';
import { Row, HeadingSection } from '../../contentTypes';
import { useServerContext, getNodeProps, jUrl, getChildNodes, JAddContentButtons, JRender, jAddCacheDependency } from '@jahia/js-server-engine';

export const agency = () => {
    const {currentNode, renderContext} = useServerContext();
    const props = getNodeProps(currentNode, ['name', 'description', 'image', 'creationDate', 'languages', 'address', 'email', 'phone']);
    const childs = getChildNodes(currentNode, 50);
    const realtors = childs.filter(child => child.isNodeType('luxe:realtor'));
    const estates = childs.filter(child => child.isNodeType('luxe:estate'));
    const modulePath = renderContext.getURLGenerator().getCurrentModule();
    jAddCacheDependency({node: props.image});
    const data = [
        {
            title: "Nombre d’experts",
            value: `${realtors.length}`,
        },
        {
            title: "Date de création",
            value: `${new Date(props.creationDate).getFullYear()}`,
        },
        {
            title: "Langues parlées",
            value: props.languages.join(', ')
        },
    ];
    return (
        <MainLayout>
            <>
                <section>
                    <ContentHeader 
                        title={props.name}
                        imgURL={(props.image?.getPath() && jUrl({path: props.image.getPath()})) || jUrl({value: modulePath + '/assets/img/img-placeholder.jpg'})}
                        description={props.description}
                    />
                </section>
                <section>
                    <Table rows={data} />
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
                        {realtors.map((realtor, key) => (
                            <JRender path={realtor.getPath()} key={key}/>
                        ))}
                    </Row>
                    <JAddContentButtons />
                </section>
                <section>
                    <HeadingSection title="Propriétés exclusives de l’agence"/>
                    <Row type="grid" grid="3" gutter="none" columnSpacing="none">
                        {estates.map((estate, key) => (
                            <JRender path={estate.getPath()} key={key}/>
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