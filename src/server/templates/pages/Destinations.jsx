import React from 'react';
import {JArea} from '@jahia/js-server-engine';
import {MainLayout} from '../../layouts';

export const Destinations = () => {
    return (
        <MainLayout>
            <JArea name="heading" subNodesView="mainHeader" allowedTypes={['luxe:header']} numberOfItems={1}/>
            <section>
                <div className="container">
                    <JArea name="main" allowedTypes={['jnt:bigText']}/>
                </div>
            </section>
            <section>
                <div className="container">
                    <JArea name="related-destinations" allowedTypes={['']}/>
                </div>
            </section>
            <section>
                <div className="container">
                    <JArea name="related-agencies" allowedTypes={['']}/>
                </div>
            </section>
        </MainLayout>

    );
};

Destinations.jahiaComponent = {
    id: 'pageDestinationsCmp',
    nodeType: 'jnt:page',
    name: 'destinations',
    displayName: 'Destinations',
    componentType: 'template'
};
