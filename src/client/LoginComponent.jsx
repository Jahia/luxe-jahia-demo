import React from 'react';
import {useRef, useState, useEffect} from 'react';
import LoginForm from './LoginForm';
import WorkspaceNavigation from './WorkspaceNavigation';
import {useTranslation} from 'react-i18next';

const LoginComponent = ({isLoggedIn, userHydrated, urls, mode, nodePath, showRememberMe}) => {
    const {t} = useTranslation();
    const popupRef = useRef(null);
    const [user, setUser] = useState(userHydrated);
    const [loggedIn, setLoggedIn] = useState(isLoggedIn);

    const closeModal = () => {
        popupRef.current.classList.remove("show");
        document.getElementsByClassName("modal-backdrop")[0].classList.remove("show");
    }

    const logout = () => {
        fetch('/cms/logout');
        setLoggedIn(false);
    }

    if (mode === "edit") {
        return <div className="alert alert-dark fs-6" role="alert">Login is disabled on edit mode</div>
    }

    return loggedIn ? (
        <>
            <h5>{user}</h5>
            <ul className="list-unstyled">
                <WorkspaceNavigation urls={urls} mode={mode} nodePath={nodePath}/>
                <li>
                    <button onClick={logout} className="d-block btn btn-link p-0 lux-capitalize border-0">{t('login.logout')}</button>
                </li>
            </ul>
        </>
    ) : (
        <>
            <h5>{t('footer.backOffice')}</h5>
            <div id="loginModal" className="modal fade" tabIndex="-1" ref={popupRef}>
                <div className="modal-dialog" aria-labelledby="loginModalTitle">
                    <LoginForm close={closeModal} setUser={setUser} setLoggedIn={setLoggedIn} showRememberMe={showRememberMe}/>
                </div>
            </div>
            <button className="d-block btn btn-link p-0 lux-capitalize border-0" data-bs-toggle="modal" data-bs-target="#loginModal">{t('login.login')}</button>
        </>
    );
    


}

export default LoginComponent;