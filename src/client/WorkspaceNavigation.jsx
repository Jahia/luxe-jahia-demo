import React from 'react';
import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';

const hasPermission = async (permission, path) => {
    const response = await fetch('/modules/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
        },
        body: JSON.stringify({
            query: `query {
                jcr {
                    nodeByPath(path: "${path}") {
                        site {
                            hasPermission(permissionName: "${permission}")
                        }
                    }
                }
            }`})
    });

    const data = await response.json();
    return data.data.jcr.nodeByPath.site.hasPermission;
}

const WorkspaceNavigation = ({urls, mode, nodePath}) => {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [hasJcontentPermission, setHasJcontentPermission] = useState(false);

    useEffect(() => {
        const getPermissions = async () => {
            setHasJcontentPermission(await hasPermission('jContentAccess', nodePath));
            setIsLoading(false);
        }
        getPermissions();
    },[]);
    if(isLoading) return;
    return (
        <nav>
            <ul>
                {mode != 'live' && <li><a href={urls.liveUrl}>{t('login.liveWorkspace')}</a></li>}
                {mode != 'preview' && hasJcontentPermission && <li><a href={urls.previewUrl}>{t('login.previewWorkspace')}</a></li>}
                {mode != 'edit' && hasJcontentPermission && <li><a href={urls.editUrl}>{t('login.editWorkspace')}</a></li>}
            </ul>
        </nav>
    );
}

export default WorkspaceNavigation;