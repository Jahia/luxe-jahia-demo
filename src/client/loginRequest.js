export const login = (
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
                const response = new TextDecoder().decode(value);
                if(response == 'OK') {
                    close();
                    setUser(username);
                    setLoggedIn(true);
                } else if(response == 'unauthorized') {
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