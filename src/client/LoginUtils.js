export const login = async ({
    siteKey,
    username,
    password,
    rememberMe,
    loginUrl,
    setUser,
    setLoggedIn,
    setIncorrectLogin,
    setUnknownError
}) => {
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
