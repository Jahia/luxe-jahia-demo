import React from 'react';
import {JArea} from '@jahia/js-server-engine';
import {MainLayout} from '../../layouts';

export const PageDestination = () => {
    return (
        <MainLayout>
            <JArea name="heading"
                   allowedTypes={['luxe:header']}
                   subNodesView="mainHeader-textDown"
                   numberOfItems={1}/>
            <section>
                <div className="container">
                    <div className="row lux-richtext">
                        <JArea name="main" allowedTypes={['jnt:bigText']}/>
                    </div>
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

PageDestination.jahiaComponent = {
    id: 'luxeJahiaDemo_templates_page_PageDestination',
    nodeType: 'jnt:page',
    name: 'destination',
    displayName: 'Destination',
    componentType: 'template'
};
