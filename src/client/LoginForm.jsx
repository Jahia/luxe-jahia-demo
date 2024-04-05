import React from 'react';
import {useState} from 'react'
import {useTranslation} from 'react-i18next';

const login = (
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
        <>
            <h1>{t('login.login')}</h1>
            <form>
                {incorrectLogin && <p className="errorMessage">{t('login.badCreds')}</p>}
                {unknownError && <p className="errorMessage">{t('login.unknownError')}</p>}
                <input type="name" name="username" placeholder={t('login.username')} onChange={e => setUsername(e.target.value)} autoFocus/>
                <input type="password" name="password" placeholder={t('login.password')} onChange={e => setPassword(e.target.value)}/>
                {showRememberMe && <div>
                    <input type="checkbox" name="remember" id="remember" defaultChecked={rememberMe} onChange={() => setRememberMe(!rememberMe)}/>
                    <label htmlFor="remember">{t('login.rememberMe')}</label>
                </div>}
                <button type="button" onClick={() => login(username,
                    password,
                    rememberMe,
                    setUser,
                    setLoggedIn,
                    setIncorrectLogin,
                    setUnknownError,
                    close)}>{t('login.login')}</button>
            </form>
        </>
    )
}

export default LoginForm;