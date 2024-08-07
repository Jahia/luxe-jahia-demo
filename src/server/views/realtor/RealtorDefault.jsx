import React from 'react';
import {useServerContext, getNodeProps, buildUrl, server, defineJahiaComponent} from '@jahia/js-server-core';
import {useTranslation} from 'react-i18next';

export const RealtorDefault = () => {
    const {t} = useTranslation();
    const {currentNode, renderContext, currentResource} = useServerContext();
    const modulePath = renderContext.getURLGenerator().getCurrentModule();
    const realtor = getNodeProps(currentNode, [
        'firstName',
        'lastName',
        'jobPosition',
        'image'
    ]);

    const image = {
        src: buildUrl({value: `${modulePath}/assets/img/agent-placeholder.jpg`}, renderContext, currentResource),
        alt: 'Placeholder'
    };

    if (realtor.image) {
        server.render.addCacheDependency({node: realtor.image}, renderContext);
        image.src = realtor.image.getUrl();
        image.alt = t('alt.realtor', {realtor: `${realtor.firstName} ${realtor.lastName}`});
    }

    return (
        <a href={currentNode.getUrl()} className="lux-agentCard d-flex flex-column">
            <img className="lux-agentCard_image"
                 src={image.src}
                 alt={image.alt}
                 width="250px"
                 height="250px"/>

            <div className="lux-agentCard_informations d-flex py-3 flex-column justify-content-center">
                <h4 className="my-0">{realtor.firstName} {realtor.lastName}</h4>
                <p className="m-0 lux-capitalize">{t(`realtor.jobPosition.${realtor.jobPosition}`)}</p>
            </div>
        </a>
    );
};

RealtorDefault.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:realtor',
    name: 'default',
    componentType: 'view'
});
