import React from 'react';
import {
    useServerContext,
    getNodeProps,
    Area,
    defineJahiaComponent
} from '@jahia/javascript-modules-library';
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
                    <Area areaAsSubNode name={`${currentNode.getName()}-col-${col}`}/>
                </div>
            )
            )}
        </div>
    );
};

ColsDefault.jahiaComponent = defineJahiaComponent({
    nodeType: 'luxe:cols',
    name: 'default',
    componentType: 'view'
});
