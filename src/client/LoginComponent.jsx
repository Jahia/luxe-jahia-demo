import React from 'react';
import {useRef, useState} from 'react';
import LoginForm from './LoginForm';
import WorkspaceNavigation from './WorkspaceNavigation';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';

const LoginComponent = ({isLoggedIn, userHydrated, urls, mode, nodePath, isShowRememberMe}) => {
    const {t} = useTranslation();
    const modalRef = useRef(null);
    const [user, setUser] = useState(userHydrated);
    const [loggedIn, setLoggedIn] = useState(isLoggedIn);

    const showModal = () => {
        modalRef.current.showModal();
    }

    const closeModal = () => {
        modalRef.current.close();
    }

    const handleOverlayClick = (event) => {
        if (event.target === modalRef.current) {
            modalRef.current.close();
        }
    }

    const logout = () => {
        fetch('/cms/logout');
        setLoggedIn(false);
    };

    if (mode === 'edit') {
        return <div className="alert alert-dark fs-6" role="alert">{t('login.editModeWarning')}</div>;
    }

    return loggedIn ? (
        <>
            <h5>{user}</h5>
            <ul className="list-unstyled">
                <WorkspaceNavigation {...{
                    urls,
                    mode,
                    nodePath
                }}
                />
                <li>
                    <button
                        type="button"
                        className="d-block btn btn-link p-0 lux-capitalize border-0"
                        onClick={logout}
                    >
                        {t('login.logout')}
                    </button>
                </li>
            </ul>
        </>
    ) : (
        <>
            <h5>{t('footer.backOffice')}</h5>
            <dialog id="loginModal" className="lux-dialog modal" ref={modalRef} onClick={event => handleOverlayClick(event)}>
                <div className="modal-dialog" aria-labelledby="loginModalTitle">
                    <LoginForm
                        close={closeModal}
                        showRememberMe={isShowRememberMe}
                        setUser={setUser}
                        setLoggedIn={setLoggedIn}
                    />
                </div>
            </dialog>
            <button
                type="button"
                onClick={showModal}
                className="d-block btn btn-link p-0 lux-capitalize border-0">
                    {t('login.login')}
            </button>
        </>
    );
}

LoginComponent.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    userHydrated: PropTypes.string,
    urls: PropTypes.shape({
        liveUrl: PropTypes.string.isRequired,
        previewUrl: PropTypes.string.isRequired,
        editUrl: PropTypes.string.isRequired
    }).isRequired,
    mode: PropTypes.string.isRequired,
    nodePath: PropTypes.string.isRequired,
    isShowRememberMe: PropTypes.bool.isRequired
};

export default LoginComponent;
