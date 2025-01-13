import React from 'react';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';

const hasPermission = async (gqlUrl, permission, path) => {
    const response = await fetch(gqlUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
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
};

const WorkspaceNavigation = ({urls, mode, nodePath}) => {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [hasJContentPermission, setHasJContentPermission] = useState(false);

    useEffect(() => {
        const getPermissions = async () => {
            setHasJContentPermission(await hasPermission(urls.gqlUrl ,'jContentAccess', nodePath));
            setIsLoading(false);
        };

        getPermissions();
    }, []);

    if (isLoading) {
        return null;
    }

    return (
        <>
            {mode !== 'live' &&
                <li>
                    <a href={urls.liveUrl}>{t('login.liveWorkspace')}</a>
                </li>}

            {mode !== 'preview' && hasJContentPermission &&
                <li>
                    <a href={urls.previewUrl}>{t('login.previewWorkspace')}</a>
                </li>}

            {mode !== 'edit' && hasJContentPermission &&
                <li>
                    <a href={urls.editUrl}>{t('login.editWorkspace')}</a>
                </li>}
        </>
    );
};

WorkspaceNavigation.propTypes = {
    urls: PropTypes.shape({
        liveUrl: PropTypes.string.isRequired,
        previewUrl: PropTypes.string.isRequired,
        editUrl: PropTypes.string.isRequired,
        gqlUrl: PropTypes.string.isRequired
    }).isRequired,
    mode: PropTypes.string.isRequired,
    nodePath: PropTypes.string.isRequired
};
export default WorkspaceNavigation;
