import React from 'react';
import {
    useServerContext,
    getNodeProps,
    buildUrl,
    server
} from '@jahia/js-server-core';
import {useTranslation} from 'react-i18next';

export const AgencyDefault = () => {
    const {t} = useTranslation();
    const {currentNode, renderContext, currentResource} = useServerContext();
    const modulePath = renderContext.getURLGenerator().getCurrentModule();
    const agency = getNodeProps(currentNode, [
        'name',
        'address',
        'phone',
        'image'
    ]);

    const image = {
        src: buildUrl({value: `${modulePath}/assets/img/agency-placeholder.jpg`}, renderContext, currentResource),
        alt: 'Placeholder'
    };

    if (agency.image) {
        image.src = agency.image.getUrl();
        image.alt = t('alt.agency', {agency: agency.name});

        server.render.addCacheDependency({node: agency.image}, renderContext);
    }

    return (
        <a className="lux-agencyCard d-flex" href={currentNode.getUrl()}>
            <img className="lux-agencyCard_image me-4"
                 src={image.src}
                 alt={image.alt}
                 width="200"
                 height="200"/>

            <div className="d-flex flex-column justify-content-center flex-fill">
                <h2 className="my-0 lux-capitalize">{agency.name}</h2>
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
