import React from 'react';
import PropTypes from 'prop-types';
import {HtmlFooter, HtmlHead} from '../components';
import {AbsoluteArea, AddResources, useUrlBuilder} from '@jahia/javascript-modules-library';

export const MainLayout = ({head, className, children}) => {
    const {buildStaticUrl} = useUrlBuilder();
    const bootstrap = buildStaticUrl({assetPath: 'javascript/bootstrap.bundle.min.js'});
    return (
        <>
            <HtmlHead>
                {head}
            </HtmlHead>
            <body>
                <AbsoluteArea name="navArea" allowedTypes={['luxe:navMenu']} numberOfItems="1"/>
                <main className={className}>
                    {children}
                </main>
                <HtmlFooter/>
                <AddResources type="javascript" resources={bootstrap}/>
            </body>
        </>
    );
};

MainLayout.propTypes = {
    head: PropTypes.element,
    children: PropTypes.node,
    className: PropTypes.string
};
