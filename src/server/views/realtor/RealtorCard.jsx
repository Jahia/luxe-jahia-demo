import React from 'react';
import {useServerContext, getNodeProps, jUrl, jAddCacheDependency} from '@jahia/js-server-engine';

export const RealtorCard = () => {
    const {currentNode, renderContext} = useServerContext();
    const modulePath = renderContext.getURLGenerator().getCurrentModule();
    const realtor = getNodeProps(currentNode, [
        'firstName',
        'lastName',
        'jobPosition',
        'image'
    ]);

    const image = {
        src: `${modulePath}/assets/img/agent-placeholder.jpg`,
        alt: 'Placeholder'
    };

    if (realtor.image) {
        jAddCacheDependency({node: realtor.image});
        image.src = realtor.image.getUrl();
        image.alt = `Portrait of ${realtor.firstName} ${realtor.lastName}`;
    }

    return (
        <a href={jUrl({path: currentNode.getPath()})} className="lux-agentCard d-flex flex-column">
            <img className="lux-agentCard_image"
                 src={image.src}
                 alt={image.alt}
                 width="250px"
                 height="250px"/>

            <div className="lux-agentCard_informations d-flex py-3 flex-column justify-content-center">
                <h4 className="my-0">{realtor.firstName} {realtor.lastName}</h4>
                <p className="m-0">{realtor.jobPosition}</p>
            </div>
        </a>
    );
};

RealtorCard.jahiaComponent = {
    nodeType: 'luxe:realtor',
    name: 'default',
    componentType: 'view'
};
