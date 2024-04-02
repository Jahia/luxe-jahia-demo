import React from 'react';
import {useState} from 'react'
import {login} from './loginRequest';
import {useTranslation} from 'react-i18next';

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