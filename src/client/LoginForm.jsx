import React from 'react';
import PropTypes from 'prop-types';
import {useState} from 'react';
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

        // Request will be sent as application/x-www-form-urlencoded
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
            <header className="modal-header">
                <h2 id="loginModalTitle" className="lux-capitalize">{t('login.login')}</h2>
            </header>
            <form
                id="loginForm"
                className="modal-body d-flex flex-column gap-3"
            >
                {incorrectLogin &&
                    <p className="alert alert-danger fs-6" role="alert">
                        {t('login.badCreds')}
                    </p>}

                {unknownError &&
                    <p className="alert alert-danger fs-6" role="alert">
                        {t('login.unknownError')}
                    </p>}

                <div>
                    <label htmlFor="inputUser" className="form-label fs-6">{t('login.username')}</label>
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
                    <label htmlFor="inputPassword" className="form-label fs-6">{t('login.password')}</label>
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
                    <div className="form-check">
                        <input id="remember" type="checkbox" name="remember" className="form-check-input me-2" defaultChecked={rememberMe} onChange={() => setRememberMe(!rememberMe)}/>
                        <label htmlFor="remember" className="form-check-label lux-capitalize fs-6">{t('login.rememberMe')}</label>
                    </div>}
            </form>
            <footer className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={close}>Cancel</button>
                <button type="button"
                        form="loginForm"
                        className="btn btn-primary lux-capitalize"
                        onClick={login}
                >
                    {t('login.login')}
                </button>
            </footer>
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
