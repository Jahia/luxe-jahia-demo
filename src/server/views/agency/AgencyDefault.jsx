import React from 'react';
import {
    useServerContext,
    getNodeProps,
    jUrl,
    jAddCacheDependency
} from '@jahia/js-server-engine';

export const AgencyDefault = () => {
    const {currentNode, renderContext} = useServerContext();
    const modulePath = renderContext.getURLGenerator().getCurrentModule();
    const agency = getNodeProps(currentNode, [
        'name',
        'address',
        'phone',
        'image'
    ]);

    const image = {
        src: `${modulePath}/assets/img/agency-placeholder.jpg`,
        alt: 'Placeholder'
    };

    if (agency.image) {
        jAddCacheDependency({node: agency.image});
        image.src = agency.image.getUrl();
        image.alt = `View of the agency ${agency.name}`;
    }

    return (
        <a className="lux-agencyCard d-flex" href={jUrl({path: currentNode.getPath()})}>
            <img className="lux-agencyCard_image me-4"
                 src={image.src}
                 alt={image.alt}
                 width="200"
                 height="200"/>

            <div className="d-flex flex-column justify-content-center flex-fill">
                <h2 className="my-0">{agency.name}</h2>
                {agency.address && <p className="m-0">{agency.address}</p>}
                {agency.phone && <p className="m-0">{agency.phone}</p>}
            </div>
        </a>
    );
};

AgencyDefault.jahiaComponent = {
    nodeType: 'luxe:agency',
    name: 'default',
    componentType: 'view'
};
