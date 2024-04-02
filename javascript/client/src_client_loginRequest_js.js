"use strict";
(self["webpackChunkluxe_jahia_demo"] = self["webpackChunkluxe_jahia_demo"] || []).push([["src_client_loginRequest_js"],{

/***/ "./src/client/loginRequest.js":
/*!************************************!*\
  !*** ./src/client/loginRequest.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   login: () => (/* binding */ login)
/* harmony export */ });
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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NsaWVudF9sb2dpblJlcXVlc3RfanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxvREFBb0QsTUFBTTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0wiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vLi9zcmMvY2xpZW50L2xvZ2luUmVxdWVzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgbG9naW4gPSAoXG4gICAgdXNlcm5hbWUsXG4gICAgcGFzc3dvcmQsXG4gICAgcmVtZW1iZXJNZSxcbiAgICBzZXRVc2VyLFxuICAgIHNldExvZ2dlZEluLFxuICAgIHNldEluY29ycmVjdExvZ2luLFxuICAgIHNldFVua25vd25FcnJvcixcbiAgICBjbG9zZSkgPT4ge1xuICAgIGNvbnN0IGJvZHkgPSBbXG4gICAgICAgICd1c2VybmFtZT0nICsgdXNlcm5hbWUsXG4gICAgICAgICdwYXNzd29yZD0nICsgcGFzc3dvcmRcbiAgICBdO1xuICAgIGlmKHJlbWVtYmVyTWUpIGJvZHkucHVzaCgndXNlQ29va2llPW9uJyk7XG4gICAgZmV0Y2goJy9jbXMvbG9naW4/cmVzdE1vZGU9dHJ1ZScsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnLFxuICAgICAgICAgICAgJ2FsbG93LXJlZGlyZWN0cyc6ICdmYWxzZSdcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogYm9keS5qb2luKCcmJylcbiAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3BvbnNlLmJvZHkuZ2V0UmVhZGVyKCkucmVhZCgpLnRoZW4oKHt2YWx1ZX0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYocmVzcG9uc2UgPT0gJ09LJykge1xuICAgICAgICAgICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICBzZXRVc2VyKHVzZXJuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0TG9nZ2VkSW4odHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHJlc3BvbnNlID09ICd1bmF1dGhvcml6ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEluY29ycmVjdExvZ2luKHRydWUpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgc2V0VW5rbm93bkVycm9yKHRydWUpO1xuICAgICAgICB9XG4gICAgfSk7XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9