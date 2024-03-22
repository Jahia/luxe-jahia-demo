import React from 'react';
import {Area} from '@jahia/js-server-engine';
import {MainLayout} from '../../layouts';

export const PageDestination = () => {
    return (
        <MainLayout>
            <Area name="heading"
                  allowedTypes={['luxe:header']}
                  subNodesView="textDown"
                  numberOfItems={1}/>
            <section>
                <div className="container">
                    <div className="row lux-richtext">
                        <Area name="main" allowedTypes={['jnt:bigText']}/>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <Area name="related-destinations" allowedTypes={['']}/>
                </div>
            </section>
            <section>
                <div className="container">
                    <Area name="related-agencies" allowedTypes={['']}/>
                </div>
            </section>
        </MainLayout>

    );
};

PageDestination.jahiaComponent = {
    nodeType: 'jnt:page',
    name: 'destination',
    displayName: 'Destination',
    componentType: 'template'
};
