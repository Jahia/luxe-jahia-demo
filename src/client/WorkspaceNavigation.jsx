import React from 'react';
import {useState, useEffect} from 'react';
import {hasPermission} from './hasPermission';
import {useTranslation} from 'react-i18next';

const WorkspaceNavigation = ({urls, mode, nodePath}) => {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [hasJcontentPermission, setHasJcontentPermission] = useState(false);
    const [hasContributePermission, setHasContributePermission] = useState(false);

    useEffect(() => {
        const getPermissions = async () => {
            setHasJcontentPermission(await hasPermission('jContentAccess', nodePath));
            setHasContributePermission(await hasPermission('contributeModeAccess', nodePath));
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
                {mode != 'contribute' && !hasJcontentPermission && hasContributePermission && <li><a href={urls.contributeUrl}>{t('login.contributeWorkspace')}</a></li>}
            </ul>
        </nav>
    );
}

export default WorkspaceNavigation;