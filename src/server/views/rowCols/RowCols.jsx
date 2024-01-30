import React from 'react';
import {
    useServerContext,
    getNodeProps,
    JArea
} from '@jahia/js-server-engine';
import clsx from 'clsx';

export const RowCols = () => {
    const {currentNode} = useServerContext();
    const content = getNodeProps(currentNode, ['colsNumber']);
    const limit = isNaN(parseInt(content.colsNumber, 10)) ? 1 : parseInt(content.colsNumber, 10);
    const cols = Array.from(Array(limit).keys());
    return (
        <>
            {cols.map(col => (
                <div key={col} className={clsx('col')}>
                    <JArea name={`${currentNode.getName()}-col-${col}`}/>
                </div>
            )
            )}
        </>
    );
};

RowCols.jahiaComponent = {
    id: 'rowColsCmp',
    nodeType: 'luxe:rowCols',
    name: 'default',
    componentType: 'view'
};
