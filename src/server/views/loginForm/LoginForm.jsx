import React from 'react';
import {HydrateInBrowser} from '@jahia/js-server-engine';
import {LoginForm as clientLoginForm} from '../../../client'

export const LoginForm = () => {
    return (
        <HydrateInBrowser child={clientLoginForm}/>
    )
}

LoginForm.jahiaComponent = {
    displayName: 'Login Form',
    nodeType: 'luxe:loginForm',
    componentType: 'view'
}