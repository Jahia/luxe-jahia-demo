import React from 'react';
import {JRender, JAddContentButtons, useServerContext, getNodeProps, getChildNodes} from '@jahia/js-server-engine';
import clsx from 'clsx';

const getAddContentButtons = (current, limit) => {
    if (current < limit) {
        return <JAddContentButtons/>;
    }

    return null;
};

export const RowCols = () => {
    const {currentNode} = useServerContext();
    const content = getNodeProps(currentNode, ['j:colsNumber']);
    const limit = isNaN(parseInt(content['j:colsNumber'], 10)) ? 1 : parseInt(content['j:colsNumber'], 10);
    const subContents = getChildNodes(currentNode, limit);

    return (
        <>
            {subContents.map(subContent => (
                <div key={subContent.getIdentifier()} className={clsx('col')}>
                    <JRender node={subContent}/>
                </div>
            )
            )}
            {getAddContentButtons(subContents.length, limit)}
        </>
    );
};

RowCols.jahiaComponent = {
    id: 'rowColsCmp',
    nodeType: 'jnt:rowCols',
    displayName: 'Default',
    componentType: 'view'
};
