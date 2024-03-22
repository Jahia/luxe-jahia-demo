import React from 'react';
import {Area} from '@jahia/js-server-engine';
import {MainLayout} from '../../layouts';

export const PageDestinations = () => {
    return (
        <MainLayout>
            <Area name="heading"
                  allowedTypes={['luxe:header']}
                  subNodesView="textUp"
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
                    <Area name="related-destinations"
                          allowedTypes={['luxe:textIllustrated']}
                          numberOfItems={1}/>
                </div>
            </section>
        </MainLayout>

    );
};

PageDestinations.jahiaComponent = {
    nodeType: 'jnt:page',
    name: 'destinations',
    displayName: 'Destinations',
    componentType: 'template'
};
