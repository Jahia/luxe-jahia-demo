import React from 'react';
import { useServerContext, getNodeProps, jUrl, jAddCacheDependency } from '@jahia/js-server-engine';

export const realtorCard = () => {
    const {currentNode, renderContext} = useServerContext();
    const props = getNodeProps(currentNode, ['firstName', 'lastName', 'jobPosition', 'image']);
    const modulePath = renderContext.getURLGenerator().getCurrentModule();
    jAddCacheDependency({node: props.image});
    return (
        <a href="#" className="lux-agentCard d-flex flex-column">
            {(props.image &&
                <img 
                    src={jUrl({path: props.image.getPath()})}
                    className='luxe-agentCard_image'
                    width="250px"
                    height="250px" />) ||
                <img
                    src={jUrl({value: modulePath + '/assets/img/img-placeholder.jpg'})}
                    className='luxe-agentCard_image'
                    width="250px"
                    height="250px" />
            }
            <div className="lux-agentCard_informations d-flex py-3 flex-column justify-content-center">
                <h4 className="my-0">{props.firstName} {props.lastName}</h4>
                <p className="m-0">{props.jobPosition}</p>
            </div>
        </a>
    );
}

realtorCard.jahiaComponent = {
    nodeType: 'luxe:realtor',
    name: 'default',
    componentType: 'view'
};