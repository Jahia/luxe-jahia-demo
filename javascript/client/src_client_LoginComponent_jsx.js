"use strict";
(self["webpackChunkluxe_jahia_demo"] = self["webpackChunkluxe_jahia_demo"] || []).push([["src_client_LoginComponent_jsx"],{

/***/ "./src/client/LoginComponent.jsx":
/*!***************************************!*\
  !*** ./src/client/LoginComponent.jsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _LoginForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LoginForm */ "./src/client/LoginForm.jsx");
/* harmony import */ var _WorkspaceNavigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WorkspaceNavigation */ "./src/client/WorkspaceNavigation.jsx");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-i18next */ "webpack/sharing/consume/default/react-i18next/react-i18next");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var LoginComponent = function LoginComponent(_ref) {
  var isLoggedIn = _ref.isLoggedIn,
    userHydrated = _ref.userHydrated,
    urls = _ref.urls,
    mode = _ref.mode,
    nodePath = _ref.nodePath,
    showRememberMe = _ref.showRememberMe;
  var _useTranslation = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)(),
    t = _useTranslation.t;
  var popupRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(userHydrated),
    _useState2 = _slicedToArray(_useState, 2),
    user = _useState2[0],
    setUser = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(isLoggedIn),
    _useState4 = _slicedToArray(_useState3, 2),
    loggedIn = _useState4[0],
    setLoggedIn = _useState4[1];
  var showPopup = function showPopup() {
    popupRef.current.showModal();
  };
  var closePopup = function closePopup() {
    popupRef.current.close();
  };
  var logout = function logout() {
    fetch('/cms/logout');
    setLoggedIn(false);
  };
  return loggedIn ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, user), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_WorkspaceNavigation__WEBPACK_IMPORTED_MODULE_2__["default"], {
    urls: urls,
    mode: mode,
    nodePath: nodePath
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: logout
  }, t('login.logout'))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("dialog", {
    className: "loginPopup",
    ref: popupRef
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_LoginForm__WEBPACK_IMPORTED_MODULE_1__["default"], {
    close: closePopup,
    setUser: setUser,
    setLoggedIn: setLoggedIn,
    showRememberMe: showRememberMe
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: showPopup
  }, t('login.login')));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoginComponent);

/***/ }),

/***/ "./src/client/LoginForm.jsx":
/*!**********************************!*\
  !*** ./src/client/LoginForm.jsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _loginRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loginRequest */ "./src/client/loginRequest.js");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "webpack/sharing/consume/default/react-i18next/react-i18next");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var LoginForm = function LoginForm(_ref) {
  var close = _ref.close,
    setUser = _ref.setUser,
    setLoggedIn = _ref.setLoggedIn,
    showRememberMe = _ref.showRememberMe;
  var _useTranslation = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)(),
    t = _useTranslation.t;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    incorrectLogin = _useState2[0],
    setIncorrectLogin = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    unknownError = _useState4[0],
    setUnknownError = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    username = _useState6[0],
    setUsername = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    password = _useState8[0],
    setPassword = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    rememberMe = _useState10[0],
    setRememberMe = _useState10[1];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, t('login.login')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", null, incorrectLogin && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "errorMessage"
  }, t('login.badCreds')), unknownError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "errorMessage"
  }, t('login.unknownError')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "name",
    name: "username",
    placeholder: t('login.username'),
    onChange: function onChange(e) {
      return setUsername(e.target.value);
    },
    autoFocus: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "password",
    name: "password",
    placeholder: t('login.password'),
    onChange: function onChange(e) {
      return setPassword(e.target.value);
    }
  }), showRememberMe && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "checkbox",
    name: "remember",
    id: "remember",
    defaultChecked: rememberMe,
    onChange: function onChange() {
      return setRememberMe(!rememberMe);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    htmlFor: "remember"
  }, t('login.rememberMe'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "button",
    onClick: function onClick() {
      return (0,_loginRequest__WEBPACK_IMPORTED_MODULE_1__.login)(username, password, rememberMe, setUser, setLoggedIn, setIncorrectLogin, setUnknownError, close);
    }
  }, t('login.login'))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoginForm);

/***/ }),

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUssQ0FBQ08sUUFBUSxFQUMvQ0ksUUFBUSxFQUNSSSxVQUFVLEVBQ1ZoQyxPQUFPLEVBQ1BJLFdBQVcsRUFDWGUsaUJBQWlCLEVBQ2pCRSxlQUFlLEVBQ2ZaLEtBQUssQ0FBQztJQUFBO0VBQUMsR0FBRWYsQ0FBQyxDQUFDLGFBQWEsQ0FBVSxDQUNwQyxDQUNSLENBQUM7QUFFWCxDQUFDO0FBRUQsaUVBQWVaLFNBQVM7Ozs7Ozs7Ozs7Ozs7O0FDdENqQjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStEO0FBQy9EO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0Esb0RBQW9ELE1BQU07QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHV4ZS1qYWhpYS1kZW1vLy4vc3JjL2NsaWVudC9Mb2dpbkNvbXBvbmVudC5qc3giLCJ3ZWJwYWNrOi8vbHV4ZS1qYWhpYS1kZW1vLy4vc3JjL2NsaWVudC9Mb2dpbkZvcm0uanN4Iiwid2VicGFjazovL2x1eGUtamFoaWEtZGVtby8uL3NyYy9jbGllbnQvbG9naW5SZXF1ZXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge3VzZVJlZiwgdXNlU3RhdGV9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBMb2dpbkZvcm0gZnJvbSAnLi9Mb2dpbkZvcm0nO1xuaW1wb3J0IFdvcmtzcGFjZU5hdmlnYXRpb24gZnJvbSAnLi9Xb3Jrc3BhY2VOYXZpZ2F0aW9uJztcbmltcG9ydCB7dXNlVHJhbnNsYXRpb259IGZyb20gJ3JlYWN0LWkxOG5leHQnO1xuXG5jb25zdCBMb2dpbkNvbXBvbmVudCA9ICh7aXNMb2dnZWRJbiwgdXNlckh5ZHJhdGVkLCB1cmxzLCBtb2RlLCBub2RlUGF0aCwgc2hvd1JlbWVtYmVyTWV9KSA9PiB7XG4gICAgY29uc3Qge3R9ID0gdXNlVHJhbnNsYXRpb24oKTtcbiAgICBjb25zdCBwb3B1cFJlZiA9IHVzZVJlZihudWxsKTtcbiAgICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZSh1c2VySHlkcmF0ZWQpO1xuICAgIGNvbnN0IFtsb2dnZWRJbiwgc2V0TG9nZ2VkSW5dID0gdXNlU3RhdGUoaXNMb2dnZWRJbik7XG5cbiAgICBjb25zdCBzaG93UG9wdXAgPSAoKSA9PiB7XG4gICAgICAgIHBvcHVwUmVmLmN1cnJlbnQuc2hvd01vZGFsKCk7XG4gICAgfVxuXG4gICAgY29uc3QgY2xvc2VQb3B1cCA9ICgpID0+IHtcbiAgICAgICAgcG9wdXBSZWYuY3VycmVudC5jbG9zZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IGxvZ291dCA9ICgpID0+IHtcbiAgICAgICAgZmV0Y2goJy9jbXMvbG9nb3V0Jyk7XG4gICAgICAgIHNldExvZ2dlZEluKGZhbHNlKTtcbiAgICB9XG5cbiByZXR1cm4gbG9nZ2VkSW4gPyAoXG4gICAgICAgIDw+XG4gICAgICAgICAgICA8aDM+e3VzZXJ9PC9oMz5cbiAgICAgICAgICAgIDxXb3Jrc3BhY2VOYXZpZ2F0aW9uIHVybHM9e3VybHN9IG1vZGU9e21vZGV9IG5vZGVQYXRoPXtub2RlUGF0aH0vPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtsb2dvdXR9Pnt0KCdsb2dpbi5sb2dvdXQnKX08L2J1dHRvbj5cbiAgICAgICAgPC8+XG4gICAgKSA6IChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxkaWFsb2cgY2xhc3NOYW1lPSdsb2dpblBvcHVwJyByZWY9e3BvcHVwUmVmfT5cbiAgICAgICAgICAgICAgICA8TG9naW5Gb3JtIGNsb3NlPXtjbG9zZVBvcHVwfSBzZXRVc2VyPXtzZXRVc2VyfSBzZXRMb2dnZWRJbj17c2V0TG9nZ2VkSW59IHNob3dSZW1lbWJlck1lPXtzaG93UmVtZW1iZXJNZX0vPlxuICAgICAgICAgICAgPC9kaWFsb2c+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3Nob3dQb3B1cH0+e3QoJ2xvZ2luLmxvZ2luJyl9PC9idXR0b24+XG4gICAgICAgIDwvPlxuICAgICk7XG5cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IExvZ2luQ29tcG9uZW50OyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge3VzZVN0YXRlfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7bG9naW59IGZyb20gJy4vbG9naW5SZXF1ZXN0JztcbmltcG9ydCB7dXNlVHJhbnNsYXRpb259IGZyb20gJ3JlYWN0LWkxOG5leHQnO1xuXG5jb25zdCBMb2dpbkZvcm0gPSAoe2Nsb3NlLCBzZXRVc2VyLCBzZXRMb2dnZWRJbiwgc2hvd1JlbWVtYmVyTWV9KSA9PiB7XG4gICAgY29uc3Qge3R9ID0gdXNlVHJhbnNsYXRpb24oKTtcbiAgICBjb25zdCBbaW5jb3JyZWN0TG9naW4sIHNldEluY29ycmVjdExvZ2luXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbdW5rbm93bkVycm9yLCBzZXRVbmtub3duRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFt1c2VybmFtZSwgc2V0VXNlcm5hbWVdID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtwYXNzd29yZCwgc2V0UGFzc3dvcmRdID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtyZW1lbWJlck1lLCBzZXRSZW1lbWJlck1lXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgICA8aDE+e3QoJ2xvZ2luLmxvZ2luJyl9PC9oMT5cbiAgICAgICAgICAgIDxmb3JtPlxuICAgICAgICAgICAgICAgIHtpbmNvcnJlY3RMb2dpbiAmJiA8cCBjbGFzc05hbWU9XCJlcnJvck1lc3NhZ2VcIj57dCgnbG9naW4uYmFkQ3JlZHMnKX08L3A+fVxuICAgICAgICAgICAgICAgIHt1bmtub3duRXJyb3IgJiYgPHAgY2xhc3NOYW1lPVwiZXJyb3JNZXNzYWdlXCI+e3QoJ2xvZ2luLnVua25vd25FcnJvcicpfTwvcD59XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJuYW1lXCIgbmFtZT1cInVzZXJuYW1lXCIgcGxhY2Vob2xkZXI9e3QoJ2xvZ2luLnVzZXJuYW1lJyl9IG9uQ2hhbmdlPXtlID0+IHNldFVzZXJuYW1lKGUudGFyZ2V0LnZhbHVlKX0gYXV0b0ZvY3VzLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9e3QoJ2xvZ2luLnBhc3N3b3JkJyl9IG9uQ2hhbmdlPXtlID0+IHNldFBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKX0vPlxuICAgICAgICAgICAgICAgIHtzaG93UmVtZW1iZXJNZSAmJiA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInJlbWVtYmVyXCIgaWQ9XCJyZW1lbWJlclwiIGRlZmF1bHRDaGVja2VkPXtyZW1lbWJlck1lfSBvbkNoYW5nZT17KCkgPT4gc2V0UmVtZW1iZXJNZSghcmVtZW1iZXJNZSl9Lz5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJyZW1lbWJlclwiPnt0KCdsb2dpbi5yZW1lbWJlck1lJyl9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj59XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gbG9naW4odXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICByZW1lbWJlck1lLFxuICAgICAgICAgICAgICAgICAgICBzZXRVc2VyLFxuICAgICAgICAgICAgICAgICAgICBzZXRMb2dnZWRJbixcbiAgICAgICAgICAgICAgICAgICAgc2V0SW5jb3JyZWN0TG9naW4sXG4gICAgICAgICAgICAgICAgICAgIHNldFVua25vd25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgY2xvc2UpfT57dCgnbG9naW4ubG9naW4nKX08L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC8+XG4gICAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2dpbkZvcm07IiwiZXhwb3J0IGNvbnN0IGxvZ2luID0gKFxuICAgIHVzZXJuYW1lLFxuICAgIHBhc3N3b3JkLFxuICAgIHJlbWVtYmVyTWUsXG4gICAgc2V0VXNlcixcbiAgICBzZXRMb2dnZWRJbixcbiAgICBzZXRJbmNvcnJlY3RMb2dpbixcbiAgICBzZXRVbmtub3duRXJyb3IsXG4gICAgY2xvc2UpID0+IHtcbiAgICBjb25zdCBib2R5ID0gW1xuICAgICAgICAndXNlcm5hbWU9JyArIHVzZXJuYW1lLFxuICAgICAgICAncGFzc3dvcmQ9JyArIHBhc3N3b3JkXG4gICAgXTtcbiAgICBpZihyZW1lbWJlck1lKSBib2R5LnB1c2goJ3VzZUNvb2tpZT1vbicpO1xuICAgIGZldGNoKCcvY21zL2xvZ2luP3Jlc3RNb2RlPXRydWUnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04JyxcbiAgICAgICAgICAgICdhbGxvdy1yZWRpcmVjdHMnOiAnZmFsc2UnXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IGJvZHkuam9pbignJicpXG4gICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNwb25zZS5ib2R5LmdldFJlYWRlcigpLnJlYWQoKS50aGVuKCh7dmFsdWV9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgVGV4dERlY29kZXIoKS5kZWNvZGUodmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlID09ICdPSycpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VXNlcih1c2VybmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHNldExvZ2dlZEluKHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihyZXNwb25zZSA9PSAndW5hdXRob3JpemVkJykge1xuICAgICAgICAgICAgICAgICAgICBzZXRJbmNvcnJlY3RMb2dpbih0cnVlKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfWNhdGNoKGUpIHtcbiAgICAgICAgICAgIHNldFVua25vd25FcnJvcih0cnVlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVJlZiIsInVzZVN0YXRlIiwiTG9naW5Gb3JtIiwiV29ya3NwYWNlTmF2aWdhdGlvbiIsInVzZVRyYW5zbGF0aW9uIiwiTG9naW5Db21wb25lbnQiLCJfcmVmIiwiaXNMb2dnZWRJbiIsInVzZXJIeWRyYXRlZCIsInVybHMiLCJtb2RlIiwibm9kZVBhdGgiLCJzaG93UmVtZW1iZXJNZSIsIl91c2VUcmFuc2xhdGlvbiIsInQiLCJwb3B1cFJlZiIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsInVzZXIiLCJzZXRVc2VyIiwiX3VzZVN0YXRlMyIsIl91c2VTdGF0ZTQiLCJsb2dnZWRJbiIsInNldExvZ2dlZEluIiwic2hvd1BvcHVwIiwiY3VycmVudCIsInNob3dNb2RhbCIsImNsb3NlUG9wdXAiLCJjbG9zZSIsImxvZ291dCIsImZldGNoIiwiY3JlYXRlRWxlbWVudCIsIkZyYWdtZW50Iiwib25DbGljayIsImNsYXNzTmFtZSIsInJlZiIsImxvZ2luIiwiaW5jb3JyZWN0TG9naW4iLCJzZXRJbmNvcnJlY3RMb2dpbiIsInVua25vd25FcnJvciIsInNldFVua25vd25FcnJvciIsIl91c2VTdGF0ZTUiLCJfdXNlU3RhdGU2IiwidXNlcm5hbWUiLCJzZXRVc2VybmFtZSIsIl91c2VTdGF0ZTciLCJfdXNlU3RhdGU4IiwicGFzc3dvcmQiLCJzZXRQYXNzd29yZCIsIl91c2VTdGF0ZTkiLCJfdXNlU3RhdGUxMCIsInJlbWVtYmVyTWUiLCJzZXRSZW1lbWJlck1lIiwidHlwZSIsIm5hbWUiLCJwbGFjZWhvbGRlciIsIm9uQ2hhbmdlIiwiZSIsInRhcmdldCIsInZhbHVlIiwiYXV0b0ZvY3VzIiwiaWQiLCJkZWZhdWx0Q2hlY2tlZCIsImh0bWxGb3IiXSwic291cmNlUm9vdCI6IiJ9