import React from 'react';
import {useRef, useState} from 'react';
import LoginForm from './LoginForm';
import WorkspaceNavigation from './WorkspaceNavigation';
import {useTranslation} from 'react-i18next';

const LoginComponent = ({isLoggedIn, userHydrated, urls, mode, nodePath, showRememberMe}) => {
    const {t} = useTranslation();
    const popupRef = useRef(null);
    const [user, setUser] = useState(userHydrated);
    const [loggedIn, setLoggedIn] = useState(isLoggedIn);

    const showPopup = () => {
        popupRef.current.showModal();
    }

    const closePopup = () => {
        popupRef.current.close();
    }

    const logout = () => {
        fetch('/cms/logout');
        setLoggedIn(false);
    }

 return loggedIn ? (
        <>
            <h3>{user}</h3>
            <WorkspaceNavigation urls={urls} mode={mode} nodePath={nodePath}/>
            <button onClick={logout}>{t('login.logout')}</button>
        </>
    ) : (
        <>
            <dialog className='loginPopup' ref={popupRef}>
                <LoginForm close={closePopup} setUser={setUser} setLoggedIn={setLoggedIn} showRememberMe={showRememberMe}/>
            </dialog>
            <button onClick={showPopup}>{t('login.login')}</button>
        </>
    );



}

export default LoginComponent;