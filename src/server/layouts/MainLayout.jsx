import React from 'react';
// Import PropTypes from 'prop-types';
import {HtmlFooter, HtmlHead} from '../components';
import {AbsoluteArea} from '@jahia/javascript-modules-library';

/**
 * @param head : element to enrich the html Head tag, e.g. :
 * <>
 *     <title>...</title>
 *     <meta property="..." content="...">
 *     <script type="text/javascript" src="..."></script>
 * </>
 * the elements will be place after the others defined in the HtmlHead cmp
 * @param className : used to add css classes to the <main> html tag
 * @param children : content of hte <main> html tag of the page
 * @returns {JSX.Element}
 * @constructor
 */
export const MainLayout = ({head, className, children}) => {
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
            </body>
        </>
    );
};

// MainLayout.propTypes = {
//     head: PropTypes.element,
//     children: PropTypes.node,
//     className: PropTypes.string
// };
