import React from 'react';
import {defineJahiaComponent, getNodeProps, server, useServerContext, useUrlBuilder} from '@jahia/javascript-modules-library';
import {useTranslation} from 'react-i18next';

export const RealtorDefault = () => {
    const {t} = useTranslation();
    const {currentNode, renderContext} = useServerContext();
    const {buildStaticUrl} = useUrlBuilder();
    const realtor = getNodeProps(currentNode, [
        'firstName',
        'lastName',
        'jobPosition',
        'image'
    ]);

    const image = {
        src: buildStaticUrl({assetPath: 'img/agent-placeholder.jpg'}),
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
