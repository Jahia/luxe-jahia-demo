export const getCookie = name => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
};

export const prefillWithUserContext = (sessionId, setPrefill) => {
    if (!sessionId) {
        return;
    }

    const contextServerPublicUrl = window.digitalData.contextServerPublicUrl;
    const body = {
        requiredProfileProperties: ['firstName', 'lastName', 'email'],
        sessionId,
        source: {
            itemId: window.digitalData.page.pageInfo.pageID,
            itemType: 'page',
            scope: window.digitalData.scope
        }
    };
    fetch(`${contextServerPublicUrl}/context.json`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'allow-redirects': 'false'
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }).then(data => {
        const {firstName: firstname, lastName: lastname, email} = data.profileProperties;
        setPrefill({firstname, lastname, email});
    }).catch(error => {
        console.log('Error in the call to retrieve user profiles data: ');
        console.error(error);
    });
};

export const submitContact = ({
    target,
    body,
    setFeedback,
    setUnknownError}) => {
    fetch(target || '/luxe/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'allow-redirects': 'false'
        },
        body: JSON.stringify(body)
    }).then(({ok, status}) => {
        try {
            setFeedback({
                show: true,
                msgProps: body,
                // Note remove Hardcoded value
                ok, // : true,
                status// : 200
            });
        } catch (e) {
            console.error('Contact form error : ', e);
            setUnknownError(true);
        }
    });
};
