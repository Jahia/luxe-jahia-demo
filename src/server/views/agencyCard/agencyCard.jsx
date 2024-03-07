import React from 'react';
import { useServerContext, getNodeProps, jUrl, JAddContentButtons, jAddCacheDependency } from '@jahia/js-server-engine';

export const agencyCard = () => {
    const { currentNode, renderContext } = useServerContext();
    const content = getNodeProps(currentNode, ['image', 'name', 'address', 'phone']);
    jAddCacheDependency({node: content.image});
    const modulePath = renderContext.getURLGenerator().getCurrentModule();
    return (
        <a className="lux-agencyCard d-flex" href={jUrl({path: currentNode.getPath()})}>
            {(content.image?.getPath() && <img src={jUrl({path: content.image.getPath()})}
                alt={content.image.getDisplayableName() || 'placeholder'}
                className="lux-agencyCard_image me-4"
                height="200"
                width="200"/>) || 
                <img 
                src={jUrl({value: modulePath + '/assets/img/img-placeholder.jpg'})}
                className="lux-agencyCard_image me-4" />}
            <div className="d-flex flex-column justify-content-center flex-fill">
                <h2 className="my-0">{content.name}</h2>
                {content.address && <p className="m-0">{content.address}</p>}
                {content.phone && <p className="m-0">{content.phone}</p>}
            </div>
            <JAddContentButtons />
        </a>
    );
}

agencyCard.jahiaComponent = {
    nodeType: 'luxe:agency',
    name: 'default',
    componentType: 'view'
};
    