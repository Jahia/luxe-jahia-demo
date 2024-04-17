import React from 'react';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

const submitLogin = (
    username,
    password,
    rememberMe,
    setUser,
    setLoggedIn,
    setIncorrectLogin,
    setUnknownError,
    close) => {
    const body = [
        'username=' + username,
        'password=' + password
    ];

    if (rememberMe) {
        body.push('useCookie=on');
    }

    fetch('/cms/login?restMode=true', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'allow-redirects': 'false'
        },
        body: body.join('&')
    }).then(response => {
        try {
            response.body.getReader().read().then(({value}) => {
                const decodedValue = new TextDecoder().decode(value);
                if (decodedValue === 'OK') {
                    close();
                    setUser(username);
                    setLoggedIn(true);
                } else if (decodedValue === 'unauthorized') {
                    setIncorrectLogin(true);
                } else {
                    throw new Error();
                }
            });
        } catch (e) {
            console.error('Login form error : ', e);
            setUnknownError(true);
        }
    });
};

const LoginForm = ({close, setUser, setLoggedIn, isShowRememberMe}) => {
    const {t} = useTranslation();

    const [incorrectLogin, setIncorrectLogin] = useState(false);
    const [unknownError, setUnknownError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <div className="modal-content">
            <header className="modal-header">
                <h2 id="loginModalTitle" className="lux-capitalize">{t('login.login')}</h2>
            </header>
            <form
                id="loginForm"
                className="modal-body d-flex flex-column gap-3"
                // OnKeyPress={event => {
                //     if (event.key === 'Enter') {
                //         submitLogin(
                //             username,
                //             password,
                //             rememberMe,
                //             setUser,
                //             setLoggedIn,
                //             setIncorrectLogin,
                //             setUnknownError,
                //             close
                //         )
                //     }
                // }}
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
                    />
                </div>
                {isShowRememberMe &&
                    <div>
                        <input
                            id="remember"
                            type="checkbox"
                            name="remember"
                            className="form-check-input me-2"
                            defaultChecked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                        <label htmlFor="remember" className="form-check-label lux-capitalize">{t('login.rememberMe')}</label>
                    </div>}
            </form>
            <footer className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button"
                        form="loginForm"
                        className="btn btn-primary lux-capitalize"
                        onClick={() => submitLogin(username,
                    password,
                    rememberMe,
                    setUser,
                    setLoggedIn,
                    setIncorrectLogin,
                    setUnknownError,
                    close)}
                >
                    {t('login.login')}
                </button>
            </footer>
        </div>
    );
};

LoginForm.propTypes = {
    close: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    setLoggedIn: PropTypes.func.isRequired,
    isShowRememberMe: PropTypes.bool.isRequired
};

export default LoginForm;
