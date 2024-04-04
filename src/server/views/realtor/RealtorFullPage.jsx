import React from 'react';
import {
    useServerContext,
    getNodeProps,
    server,
    getNodesByJCRQuery, Render
} from '@jahia/js-server-engine';
import todoI18n from '../../temp/locales/fr';
import {Col, ContentHeader, HeadingSection, Row, Section, Table} from '../../components';

const MAX_ESTATE = 6;

export const RealtorFullPage = () => {
    const {currentNode, renderContext} = useServerContext();
    const modulePath = renderContext.getURLGenerator().getCurrentModule();

    const refBy = currentNode.getWeakReferences();
    const refByNode = [];
    while (refBy.hasNext()) {
        refByNode.push(refBy.next().getParent());
    }

    const agencies = refByNode.map(agencyNode => {
        return {
            ...getNodeProps(agencyNode, [
                'name',
                'address'
            ]),
            id: agencyNode.getIdentifier()
        };
    });

    const realtor = getNodeProps(currentNode, [
        'firstName',
        'lastName',
        'description',
        'image',
        'languages',
        'yOfExperience',
        'email',
        'phone'
    ]);

    const queryRefinement = refByNode.reduce((refinement, agencyNode, index) => {
        if (index === 0) {
            refinement = 'WHERE ';
        }

        if (index > 0) {
            refinement = `${refinement}  OR `;
        }

        return `${refinement} isdescendantnode('${agencyNode.getPath()}')`;
    }, '');

    const query = `SELECT *
                   FROM [luxe:estate] AS estate
                    ${queryRefinement}
                   ORDER BY estate.[jcr:created] DESC`;

    refByNode.forEach(agencyNode =>
        server.render.addCacheDependency({flushOnPathMatchingRegexp: `${agencyNode.getPath()}/.*`}, renderContext)
    );

    const estates = getNodesByJCRQuery(currentNode.getSession(), query, MAX_ESTATE);

    const data = [
        {
            title: todoI18n.table.data.agency,
            value: agencies.reduce((value, {name}, index) => {
                if (index === 0) {
                    return name;
                }

                return `${value} / ${name}`;
            }, '')
        },
        {
            title: todoI18n.table.data.spokenLanguage,
            value: realtor.languages.join(', ')
        },
        {
            title: todoI18n.table.data.yOfExperience,
            value: `${realtor.yOfExperience}`
        }
    ];

    const image = {
        src: `${modulePath}/assets/img/agent-placeholder.jpg`,
        alt: 'Placeholder'
    };

    if (realtor.image) {
        server.render.addCacheDependency({node: realtor.image}, renderContext);
        image.src = realtor.image.getUrl();
        image.alt = `Portrait of the agent ${realtor.firstName} ${realtor.lastName}`;
    }

    return (
        <>
            <Section>
                <ContentHeader
                    title={`${realtor.firstName} ${realtor.lastName}`}
                    image={image}
                    description={realtor.description}
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
                                {agencies.map(({address, id}) => <span key={id}>{address}</span>)}
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <strong>{todoI18n.section.contact.phone}</strong>
                                <a href={`tel:${realtor.phone}`}>
                                    {realtor.phone}
                                </a>
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <strong>{todoI18n.section.contact.email}</strong>
                                <a href={`mailto:${realtor.email}`}>
                                    {realtor.email}
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
                        <div className="d-flex justify-content-center align-items-center bg-secondary flex-fill h-100">
                            map here
                        </div>
                    </Col>
                </Row>
            </Section>
            <Section>
                <HeadingSection title={todoI18n.section.heading.exclusiveEstates}/>
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

RealtorFullPage.jahiaComponent = {
    nodeType: 'luxe:realtor',
    name: 'fullPage',
    componentType: 'view'
};
