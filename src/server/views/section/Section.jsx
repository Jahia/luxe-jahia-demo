import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {
    useServerContext,
    getNodeProps,
    JArea, JRender, JAddContentButtons, getChildNodes
} from '@jahia/js-server-engine';
import clsx from 'clsx';

const getAlign = align => {
    switch (align) {
        case 'left': return 'align-items-start';
        case 'center': return 'align-items-center';
        case 'right': return 'align-items-end';
        default: return '';
    }
};

const Row = ({content, arrangement}) => (
    <div className={clsx('row', getAlign(arrangement))}>
        <JRender node={content}/>
    </div>
);

Row.propTypes = {
    content: PropTypes.object.isRequired,
    arrangement: PropTypes.string.isRequired
};

export const Section = () => {
    const {currentNode} = useServerContext();
    const section = getNodeProps(currentNode, ['arrangement']);
    const sectionContents = getChildNodes(currentNode);
    return (
        <section>
            <div className="container">
                {sectionContents.map(content => (
                    <Row key={content.getIdentifier()}
                         {...{
                                 content,
                             arrangement: section.arrangement
                             }}
                        />

                ))}
                <JAddContentButtons/>
                {/* <JArea name={`${currentNode.getName()}-row`} */}
                {/*       areaView="ContentListRow" */}
                {/*       parameters={{arrangement: getAlign(section.arrangement)}}/> */}
            </div>
        </section>
    );
};

// Section.propTypes = {
//     className: PropTypes.string
// };

Section.jahiaComponent = {
    id: 'sectionCmp',
    nodeType: 'luxe:section',
    name: 'default',
    componentType: 'view'
};
