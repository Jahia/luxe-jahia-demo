import React from 'react';
import PropTypes from 'prop-types';
import {useState} from 'react';
import LoginCard from './LoginCard';
import {useTranslation} from 'react-i18next';

const LoginForm = ({loginUrl, close, setUser, setLoggedIn, siteKey, isShowRememberMe = true}) => {
    const {t} = useTranslation();

    const [incorrectLogin, setIncorrectLogin] = useState(false);
    const [unknownError, setUnknownError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const login = async () => {
        const params = new URLSearchParams();
        params.set('restMode', 'true');

        if (siteKey) {
            params.set('site', siteKey);
        }

        // Request must be sent as application/x-www-form-urlencoded
        const body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);

        if (rememberMe) {
            body.set('useCookie', 'on');
        }

        try {
            const response = await fetch(loginUrl + '?' + params.toString(), {
                method: 'POST',
                body
            });
            const value = await response.text();
            if (value === 'OK') {
                close();
                setUser(username);
                setLoggedIn(true);
            } else if (value === 'unauthorized') {
                setIncorrectLogin(true);
            } else {
                throw new Error('Unknown error: ' + value);
            }
        } catch (error) {
            console.error('Login form error: ', error);
            setUnknownError(true);
        }
    };

    return (
        <div className="modal-content">
            <header className="modal-header p-5">
                <h2 id="loginModalTitle" className="lux-capitalize text-center w-100 display-4 m-0">{t('form.login.login')}</h2>
            </header>
            <div className="modal-body d-flex flex-row p-6 gap-6">
                <div className="d-flex flex-column w-50">
                    <h3 className="m0">En tant que persona</h3>
                    <p className="text-muted small">Utiliser un utilisateur pré-configurer pour simuler différents cas d’usages.</p>
                    <div className="d-flex flex-column gap-2">
                        <LoginCard imgUrl="https://placehold.co/90x90" userName="pam" role="marketer" description="lalala"/>
                        <LoginCard imgUrl="https://placehold.co/90x90" userName="robin" role="devloper" description="lalala"/>
                        <LoginCard imgUrl="https://placehold.co/90x90" userName="toto" role="devloper" description="lalala"/>
                    </div>
                </div>
                <div className="w-50">
                    <h3 className="m0">En tant qu&apos;utilisateur</h3>
                    <p className="text-muted small">Utiliser vos identifants et mot de passe pour vous connecter.</p>
                    <form
                        id="loginForm"
                        className="d-flex flex-column gap-3"
                    >
                        {incorrectLogin &&
                            <p className="alert alert-danger fs-6" role="alert">
                                {t('form.login.badCreds')}
                            </p>}

                        {unknownError &&
                            <p className="alert alert-danger fs-6" role="alert">
                                {t('form.login.unknownError')}
                            </p>}

                        <div>
                            <label htmlFor="inputUser" className="form-label fs-6">{t('form.login.username')}</label>
                            <input
                                autoFocus
                                id="inputUser"
                                type="text"
                                name="username"
                                placeholder="robin"
                                className="form-control"
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="inputPassword" className="form-label fs-6">{t('form.login.password')}</label>
                            <input
                                id="inputPassword"
                                type="password"
                                name="password"
                                className="form-control"
                                onChange={e => setPassword(e.target.value)}
                                onKeyUp={event => {
                                    if (event.key === 'Enter') {
                                        login();
                                    }
                                }}
                            />
                        </div>
                        {isShowRememberMe &&
                            <div className="form-check d-flex align-items-center">
                                <input id="remember" type="checkbox" name="remember" className="form-check-input me-2 mt-0" defaultChecked={rememberMe} onChange={() => setRememberMe(!rememberMe)}/>
                                <label htmlFor="remember" className="form-check-label lux-capitalize fs-6">{t('login.rememberMe')}</label>
                            </div>}
                        <button
                            type="button"
                            form="loginForm"
                            className="btn btn-primary lux-capitalize"
                            onClick={login}
                        >
                            {t('form.login.login')}
                        </button>
                    </form>
                </div>
            </div>
            {/* <footer className="modal-footer p-6">
                <button type="button" className="btn btn-secondary" onClick={close}>Cancel</button>
                <button type="button"
                        form="loginForm"
                        className="btn btn-primary lux-capitalize"
                        onClick={login}
                >
                    {t('form.login.login')}
                </button>
            </footer> */}
        </div>
    );
};

LoginForm.propTypes = {
    loginUrl: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    setLoggedIn: PropTypes.func.isRequired,
    isShowRememberMe: PropTypes.bool.isRequired,
    siteKey: PropTypes.string
};

export default LoginForm;
