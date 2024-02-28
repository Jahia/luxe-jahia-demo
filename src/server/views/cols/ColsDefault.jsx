import React from 'react';
import {
    useServerContext,
    getNodeProps,
    JArea
} from '@jahia/js-server-engine';
import clsx from 'clsx';

export const ColsDefault = () => {
    const {currentNode, currentResource} = useServerContext();
    const content = getNodeProps(currentNode, ['colsNumber']);
    const colsNumber = Number(content.colsNumber);
    const limit = isNaN(colsNumber) ? 1 : colsNumber;
    // Create an array of integers from 0 to 'limit - 1'
    const cols = Array.from(Array(limit).keys());

    const arrangement = currentResource.getModuleParams().get('arrangement');
    return (
        <div className={clsx('row', arrangement)}>
            {cols.map(col => (
                <div key={col} className={clsx('col')}>
                    <JArea name={`${currentNode.getName()}-col-${col}`} areaAsSubNode={true}/>
                </div>
            )
            )}
        </div>
    );
};

ColsDefault.jahiaComponent = {
    nodeType: 'luxe:cols',
    name: 'default',
    componentType: 'view'
};
