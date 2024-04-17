import React from 'react';
import {useState} from 'react'
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

    if(rememberMe) body.push('useCookie=on');

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
                if(decodedValue === 'OK') {
                    close();
                    setUser(username);
                    setLoggedIn(true);
                } else if(decodedValue === 'unauthorized') {
                    setIncorrectLogin(true)
                } else {
                    throw new Error;
                }
            });
        }catch(e) {
            setUnknownError(true);
        }
    });
}

const LoginForm = ({close, setUser, setLoggedIn, showRememberMe}) => {
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
                // onKeyPress={event => {
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
                {incorrectLogin && <p className="alert alert-danger fs-6" role="alert">{t('login.badCreds')}</p>}
                {unknownError && <p className="alert alert-danger fs-6" role="alert">{t('login.unknownError')}</p>}
                <div>
                    <label htmlFor="inputUser" className="form-label fs-6">{t('login.username')}</label>
                    <input
                        id="inputUser"
                        type="text"
                        name="username"
                        placeholder="irina"
                        className="form-control"
                        onChange={e => setUsername(e.target.value)}
                        autoFocus
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
                {showRememberMe &&
                    <div className="form-check">
                        <input id="remember" type="checkbox" name="remember" className="form-check-input me-2" defaultChecked={rememberMe} onChange={() => setRememberMe(!rememberMe)}/>
                        <label htmlFor="remember" className="form-check-label lux-capitalize">{t('login.rememberMe')}</label>
                    </div>
                }
            </form>
            <footer className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" form="loginForm" className="btn btn-primary lux-capitalize" onClick={() => submitLogin(username,
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
    )
}

export default LoginForm;