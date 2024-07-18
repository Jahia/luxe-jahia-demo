import React from 'react';
import {useTranslation} from 'react-i18next';
import {HeadingSection, Section} from '../../components';
import {
    defineJahiaComponent,
    getNodeProps,
    getNodesByJCRQuery,
    Render,
    server,
    useServerContext
} from '@jahia/js-server-core';

export const PageRelatedContent = () => {
    const {t} = useTranslation();
    const {currentNode, renderContext, currentResource} = useServerContext();
    const page = getNodeProps(currentNode, ['country']);

    const nodeType = currentResource.getModuleParams().get('nodeType');
    const maxItems = currentResource.getModuleParams().get('maxItems');
    const label = currentResource.getModuleParams().get('label');
    let descendantPath = currentResource.getModuleParams().get('descendantPath');

    const asContent = 'content';
    descendantPath = `/sites/${currentNode.getResolveSite().getSiteKey()}${descendantPath ? descendantPath : ''}`;

    const jcrQuery = `SELECT * FROM [${nodeType}] AS ${asContent}
                   WHERE ISDESCENDANTNODE('${descendantPath}')
                   AND ${asContent}.[country] = '${page.country}'
                   ORDER BY ${asContent}.[j:lastPublished] DESC`;

    server.render.addCacheDependency({flushOnPathMatchingRegexp: `${descendantPath}/.*`}, renderContext);
    const queryContent = getNodesByJCRQuery(currentNode.getSession(), jcrQuery, maxItems || -1);

    return (
        <>
            {queryContent && queryContent.length > 0 &&
                <Section>
                    <HeadingSection title={t(label)}/>
                    <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-0">
                        {queryContent.map(node => {
                            return (
                                <div key={node.getIdentifier()} className="col g-0">
                                    <Render node={node}/>
                                </div>
                            );
                        })}
                    </div>
                </Section>}
            {(!queryContent || queryContent.length === 0) && renderContext.isEditMode() &&
                <Section>
                    <HeadingSection title={t(label)}/>
                    <div className="alert alert-dark" role="alert">{t('query.noResult')}</div>
                </Section>}
        </>
    );
};

PageRelatedContent.jahiaComponent = defineJahiaComponent({
    nodeType: 'jnt:page',
    name: 'relatedContent',
    componentType: 'view'
});
