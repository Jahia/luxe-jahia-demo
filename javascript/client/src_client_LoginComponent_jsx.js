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
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ "webpack/sharing/consume/default/react-i18next/react-i18next");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_1__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var login = function login(username, password, rememberMe, setUser, setLoggedIn, setIncorrectLogin, setUnknownError, close) {
  var body = ['username=' + username, 'password=' + password];
  if (rememberMe) body.push('useCookie=on');
  fetch('/cms/login?restMode=true', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'allow-redirects': 'false'
    },
    body: body.join('&')
  }).then(function (response) {
    try {
      response.body.getReader().read().then(function (_ref) {
        var value = _ref.value;
        var decodedValue = new TextDecoder().decode(value);
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
      setUnknownError(true);
    }
  });
};
var LoginForm = function LoginForm(_ref2) {
  var close = _ref2.close,
    setUser = _ref2.setUser,
    setLoggedIn = _ref2.setLoggedIn,
    showRememberMe = _ref2.showRememberMe;
  var _useTranslation = (0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation)(),
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
      return login(username, password, rememberMe, setUser, setLoggedIn, setIncorrectLogin, setUnknownError, close);
    }
  }, t('login.login'))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoginForm);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NsaWVudF9Mb2dpbkNvbXBvbmVudF9qc3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNhO0FBQ0g7QUFDb0I7QUFDWDtBQUU3QyxJQUFNTSxjQUFjLEdBQUcsU0FBakJBLGNBQWNBLENBQUFDLElBQUEsRUFBeUU7RUFBQSxJQUFwRUMsVUFBVSxHQUFBRCxJQUFBLENBQVZDLFVBQVU7SUFBRUMsWUFBWSxHQUFBRixJQUFBLENBQVpFLFlBQVk7SUFBRUMsSUFBSSxHQUFBSCxJQUFBLENBQUpHLElBQUk7SUFBRUMsSUFBSSxHQUFBSixJQUFBLENBQUpJLElBQUk7SUFBRUMsUUFBUSxHQUFBTCxJQUFBLENBQVJLLFFBQVE7SUFBRUMsY0FBYyxHQUFBTixJQUFBLENBQWRNLGNBQWM7RUFDbkYsSUFBQUMsZUFBQSxHQUFZVCw2REFBYyxDQUFDLENBQUM7SUFBckJVLENBQUMsR0FBQUQsZUFBQSxDQUFEQyxDQUFDO0VBQ1IsSUFBTUMsUUFBUSxHQUFHZiw2Q0FBTSxDQUFDLElBQUksQ0FBQztFQUM3QixJQUFBZ0IsU0FBQSxHQUF3QmYsK0NBQVEsQ0FBQ08sWUFBWSxDQUFDO0lBQUFTLFVBQUEsR0FBQUMsY0FBQSxDQUFBRixTQUFBO0lBQXZDRyxJQUFJLEdBQUFGLFVBQUE7SUFBRUcsT0FBTyxHQUFBSCxVQUFBO0VBQ3BCLElBQUFJLFVBQUEsR0FBZ0NwQiwrQ0FBUSxDQUFDTSxVQUFVLENBQUM7SUFBQWUsVUFBQSxHQUFBSixjQUFBLENBQUFHLFVBQUE7SUFBN0NFLFFBQVEsR0FBQUQsVUFBQTtJQUFFRSxXQUFXLEdBQUFGLFVBQUE7RUFFNUIsSUFBTUcsU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQUEsRUFBUztJQUNwQlYsUUFBUSxDQUFDVyxPQUFPLENBQUNDLFNBQVMsQ0FBQyxDQUFDO0VBQ2hDLENBQUM7RUFFRCxJQUFNQyxVQUFVLEdBQUcsU0FBYkEsVUFBVUEsQ0FBQSxFQUFTO0lBQ3JCYixRQUFRLENBQUNXLE9BQU8sQ0FBQ0csS0FBSyxDQUFDLENBQUM7RUFDNUIsQ0FBQztFQUVELElBQU1DLE1BQU0sR0FBRyxTQUFUQSxNQUFNQSxDQUFBLEVBQVM7SUFDakJDLEtBQUssQ0FBQyxhQUFhLENBQUM7SUFDcEJQLFdBQVcsQ0FBQyxLQUFLLENBQUM7RUFDdEIsQ0FBQztFQUVKLE9BQU9ELFFBQVEsZ0JBQ1J4QiwwREFBQSxDQUFBQSx1REFBQSxxQkFDSUEsMERBQUEsYUFBS29CLElBQVMsQ0FBQyxlQUNmcEIsMERBQUEsQ0FBQ0ksNERBQW1CO0lBQUNNLElBQUksRUFBRUEsSUFBSztJQUFDQyxJQUFJLEVBQUVBLElBQUs7SUFBQ0MsUUFBUSxFQUFFQTtFQUFTLENBQUMsQ0FBQyxlQUNsRVosMERBQUE7SUFBUW1DLE9BQU8sRUFBRUo7RUFBTyxHQUFFaEIsQ0FBQyxDQUFDLGNBQWMsQ0FBVSxDQUN0RCxDQUFDLGdCQUVIZiwwREFBQSxDQUFBQSx1REFBQSxxQkFDSUEsMERBQUE7SUFBUW9DLFNBQVMsRUFBQyxZQUFZO0lBQUNDLEdBQUcsRUFBRXJCO0VBQVMsZ0JBQ3pDaEIsMERBQUEsQ0FBQ0csa0RBQVM7SUFBQzJCLEtBQUssRUFBRUQsVUFBVztJQUFDUixPQUFPLEVBQUVBLE9BQVE7SUFBQ0ksV0FBVyxFQUFFQSxXQUFZO0lBQUNaLGNBQWMsRUFBRUE7RUFBZSxDQUFDLENBQ3RHLENBQUMsZUFDVGIsMERBQUE7SUFBUW1DLE9BQU8sRUFBRVQ7RUFBVSxHQUFFWCxDQUFDLENBQUMsYUFBYSxDQUFVLENBQ3hELENBQ0w7QUFJTCxDQUFDO0FBRUQsaUVBQWVULGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDSDtBQUNJO0FBQ2U7QUFFN0MsSUFBTWdDLEtBQUssR0FBRyxTQUFSQSxLQUFLQSxDQUNQQyxRQUFRLEVBQ1JDLFFBQVEsRUFDUkMsVUFBVSxFQUNWcEIsT0FBTyxFQUNQSSxXQUFXLEVBQ1hpQixpQkFBaUIsRUFDakJDLGVBQWUsRUFDZmIsS0FBSyxFQUFLO0VBQ1YsSUFBTWMsSUFBSSxHQUFHLENBQ1QsV0FBVyxHQUFHTCxRQUFRLEVBQ3RCLFdBQVcsR0FBR0MsUUFBUSxDQUN6QjtFQUNELElBQUdDLFVBQVUsRUFBRUcsSUFBSSxDQUFDQyxJQUFJLENBQUMsY0FBYyxDQUFDO0VBQ3hDYixLQUFLLENBQUMsMEJBQTBCLEVBQUU7SUFDOUJjLE1BQU0sRUFBRSxNQUFNO0lBQ2RDLE9BQU8sRUFBRTtNQUNMLGNBQWMsRUFBRSxpREFBaUQ7TUFDakUsaUJBQWlCLEVBQUU7SUFDdkIsQ0FBQztJQUNESCxJQUFJLEVBQUVBLElBQUksQ0FBQ0ksSUFBSSxDQUFDLEdBQUc7RUFDdkIsQ0FBQyxDQUFDLENBQUNDLElBQUksQ0FBQyxVQUFBQyxRQUFRLEVBQUk7SUFDaEIsSUFBSTtNQUNBQSxRQUFRLENBQUNOLElBQUksQ0FBQ08sU0FBUyxDQUFDLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLENBQUMsQ0FBQ0gsSUFBSSxDQUFDLFVBQUExQyxJQUFBLEVBQWE7UUFBQSxJQUFYOEMsS0FBSyxHQUFBOUMsSUFBQSxDQUFMOEMsS0FBSztRQUN6QyxJQUFNQyxZQUFZLEdBQUcsSUFBSUMsV0FBVyxDQUFDLENBQUMsQ0FBQ0MsTUFBTSxDQUFDSCxLQUFLLENBQUM7UUFDcEQsSUFBR0MsWUFBWSxLQUFLLElBQUksRUFBRTtVQUN0QnhCLEtBQUssQ0FBQyxDQUFDO1VBQ1BULE9BQU8sQ0FBQ2tCLFFBQVEsQ0FBQztVQUNqQmQsV0FBVyxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDLE1BQU0sSUFBRzZCLFlBQVksS0FBSyxjQUFjLEVBQUU7VUFDdkNaLGlCQUFpQixDQUFDLElBQUksQ0FBQztRQUMzQixDQUFDLE1BQU07VUFDSCxNQUFNLElBQUllLEtBQUssQ0FBRCxDQUFDO1FBQ25CO01BQ0osQ0FBQyxDQUFDO0lBQ04sQ0FBQyxRQUFNQyxDQUFDLEVBQUU7TUFDTmYsZUFBZSxDQUFDLElBQUksQ0FBQztJQUN6QjtFQUNKLENBQUMsQ0FBQztBQUNOLENBQUM7QUFFRCxJQUFNeEMsU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQUF3RCxLQUFBLEVBQXNEO0VBQUEsSUFBakQ3QixLQUFLLEdBQUE2QixLQUFBLENBQUw3QixLQUFLO0lBQUVULE9BQU8sR0FBQXNDLEtBQUEsQ0FBUHRDLE9BQU87SUFBRUksV0FBVyxHQUFBa0MsS0FBQSxDQUFYbEMsV0FBVztJQUFFWixjQUFjLEdBQUE4QyxLQUFBLENBQWQ5QyxjQUFjO0VBQzNELElBQUFDLGVBQUEsR0FBWVQsNkRBQWMsQ0FBQyxDQUFDO0lBQXJCVSxDQUFDLEdBQUFELGVBQUEsQ0FBREMsQ0FBQztFQUNSLElBQUFFLFNBQUEsR0FBNENmLCtDQUFRLENBQUMsS0FBSyxDQUFDO0lBQUFnQixVQUFBLEdBQUFDLGNBQUEsQ0FBQUYsU0FBQTtJQUFwRDJDLGNBQWMsR0FBQTFDLFVBQUE7SUFBRXdCLGlCQUFpQixHQUFBeEIsVUFBQTtFQUN4QyxJQUFBSSxVQUFBLEdBQXdDcEIsK0NBQVEsQ0FBQyxLQUFLLENBQUM7SUFBQXFCLFVBQUEsR0FBQUosY0FBQSxDQUFBRyxVQUFBO0lBQWhEdUMsWUFBWSxHQUFBdEMsVUFBQTtJQUFFb0IsZUFBZSxHQUFBcEIsVUFBQTtFQUNwQyxJQUFBdUMsVUFBQSxHQUFnQzVELCtDQUFRLENBQUMsRUFBRSxDQUFDO0lBQUE2RCxVQUFBLEdBQUE1QyxjQUFBLENBQUEyQyxVQUFBO0lBQXJDdkIsUUFBUSxHQUFBd0IsVUFBQTtJQUFFQyxXQUFXLEdBQUFELFVBQUE7RUFDNUIsSUFBQUUsVUFBQSxHQUFnQy9ELCtDQUFRLENBQUMsRUFBRSxDQUFDO0lBQUFnRSxVQUFBLEdBQUEvQyxjQUFBLENBQUE4QyxVQUFBO0lBQXJDekIsUUFBUSxHQUFBMEIsVUFBQTtJQUFFQyxXQUFXLEdBQUFELFVBQUE7RUFDNUIsSUFBQUUsVUFBQSxHQUFvQ2xFLCtDQUFRLENBQUMsS0FBSyxDQUFDO0lBQUFtRSxXQUFBLEdBQUFsRCxjQUFBLENBQUFpRCxVQUFBO0lBQTVDM0IsVUFBVSxHQUFBNEIsV0FBQTtJQUFFQyxhQUFhLEdBQUFELFdBQUE7RUFFaEMsb0JBQ0lyRSwwREFBQSxDQUFBQSx1REFBQSxxQkFDSUEsMERBQUEsYUFBS2UsQ0FBQyxDQUFDLGFBQWEsQ0FBTSxDQUFDLGVBQzNCZiwwREFBQSxlQUNLNEQsY0FBYyxpQkFBSTVELDBEQUFBO0lBQUdvQyxTQUFTLEVBQUM7RUFBYyxHQUFFckIsQ0FBQyxDQUFDLGdCQUFnQixDQUFLLENBQUMsRUFDdkU4QyxZQUFZLGlCQUFJN0QsMERBQUE7SUFBR29DLFNBQVMsRUFBQztFQUFjLEdBQUVyQixDQUFDLENBQUMsb0JBQW9CLENBQUssQ0FBQyxlQUMxRWYsMERBQUE7SUFBT3VFLElBQUksRUFBQyxNQUFNO0lBQUNDLElBQUksRUFBQyxVQUFVO0lBQUNDLFdBQVcsRUFBRTFELENBQUMsQ0FBQyxnQkFBZ0IsQ0FBRTtJQUFDMkQsUUFBUSxFQUFFLFNBQUFBLFNBQUFoQixDQUFDO01BQUEsT0FBSU0sV0FBVyxDQUFDTixDQUFDLENBQUNpQixNQUFNLENBQUN0QixLQUFLLENBQUM7SUFBQSxDQUFDO0lBQUN1QixTQUFTO0VBQUEsQ0FBQyxDQUFDLGVBQzVINUUsMERBQUE7SUFBT3VFLElBQUksRUFBQyxVQUFVO0lBQUNDLElBQUksRUFBQyxVQUFVO0lBQUNDLFdBQVcsRUFBRTFELENBQUMsQ0FBQyxnQkFBZ0IsQ0FBRTtJQUFDMkQsUUFBUSxFQUFFLFNBQUFBLFNBQUFoQixDQUFDO01BQUEsT0FBSVMsV0FBVyxDQUFDVCxDQUFDLENBQUNpQixNQUFNLENBQUN0QixLQUFLLENBQUM7SUFBQTtFQUFDLENBQUMsQ0FBQyxFQUNySHhDLGNBQWMsaUJBQUliLDBEQUFBLDJCQUNmQSwwREFBQTtJQUFPdUUsSUFBSSxFQUFDLFVBQVU7SUFBQ0MsSUFBSSxFQUFDLFVBQVU7SUFBQ0ssRUFBRSxFQUFDLFVBQVU7SUFBQ0MsY0FBYyxFQUFFckMsVUFBVztJQUFDaUMsUUFBUSxFQUFFLFNBQUFBLFNBQUE7TUFBQSxPQUFNSixhQUFhLENBQUMsQ0FBQzdCLFVBQVUsQ0FBQztJQUFBO0VBQUMsQ0FBQyxDQUFDLGVBQzlIekMsMERBQUE7SUFBTytFLE9BQU8sRUFBQztFQUFVLEdBQUVoRSxDQUFDLENBQUMsa0JBQWtCLENBQVMsQ0FDdkQsQ0FBQyxlQUNOZiwwREFBQTtJQUFRdUUsSUFBSSxFQUFDLFFBQVE7SUFBQ3BDLE9BQU8sRUFBRSxTQUFBQSxRQUFBO01BQUEsT0FBTUcsS0FBSyxDQUFDQyxRQUFRLEVBQy9DQyxRQUFRLEVBQ1JDLFVBQVUsRUFDVnBCLE9BQU8sRUFDUEksV0FBVyxFQUNYaUIsaUJBQWlCLEVBQ2pCQyxlQUFlLEVBQ2ZiLEtBQUssQ0FBQztJQUFBO0VBQUMsR0FBRWYsQ0FBQyxDQUFDLGFBQWEsQ0FBVSxDQUNwQyxDQUNSLENBQUM7QUFFWCxDQUFDO0FBRUQsaUVBQWVaLFNBQVMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vLi9zcmMvY2xpZW50L0xvZ2luQ29tcG9uZW50LmpzeCIsIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vLi9zcmMvY2xpZW50L0xvZ2luRm9ybS5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7dXNlUmVmLCB1c2VTdGF0ZX0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IExvZ2luRm9ybSBmcm9tICcuL0xvZ2luRm9ybSc7XG5pbXBvcnQgV29ya3NwYWNlTmF2aWdhdGlvbiBmcm9tICcuL1dvcmtzcGFjZU5hdmlnYXRpb24nO1xuaW1wb3J0IHt1c2VUcmFuc2xhdGlvbn0gZnJvbSAncmVhY3QtaTE4bmV4dCc7XG5cbmNvbnN0IExvZ2luQ29tcG9uZW50ID0gKHtpc0xvZ2dlZEluLCB1c2VySHlkcmF0ZWQsIHVybHMsIG1vZGUsIG5vZGVQYXRoLCBzaG93UmVtZW1iZXJNZX0pID0+IHtcbiAgICBjb25zdCB7dH0gPSB1c2VUcmFuc2xhdGlvbigpO1xuICAgIGNvbnN0IHBvcHVwUmVmID0gdXNlUmVmKG51bGwpO1xuICAgIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlKHVzZXJIeWRyYXRlZCk7XG4gICAgY29uc3QgW2xvZ2dlZEluLCBzZXRMb2dnZWRJbl0gPSB1c2VTdGF0ZShpc0xvZ2dlZEluKTtcblxuICAgIGNvbnN0IHNob3dQb3B1cCA9ICgpID0+IHtcbiAgICAgICAgcG9wdXBSZWYuY3VycmVudC5zaG93TW9kYWwoKTtcbiAgICB9XG5cbiAgICBjb25zdCBjbG9zZVBvcHVwID0gKCkgPT4ge1xuICAgICAgICBwb3B1cFJlZi5jdXJyZW50LmNsb3NlKCk7XG4gICAgfVxuXG4gICAgY29uc3QgbG9nb3V0ID0gKCkgPT4ge1xuICAgICAgICBmZXRjaCgnL2Ntcy9sb2dvdXQnKTtcbiAgICAgICAgc2V0TG9nZ2VkSW4oZmFsc2UpO1xuICAgIH1cblxuIHJldHVybiBsb2dnZWRJbiA/IChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxoMz57dXNlcn08L2gzPlxuICAgICAgICAgICAgPFdvcmtzcGFjZU5hdmlnYXRpb24gdXJscz17dXJsc30gbW9kZT17bW9kZX0gbm9kZVBhdGg9e25vZGVQYXRofS8+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2xvZ291dH0+e3QoJ2xvZ2luLmxvZ291dCcpfTwvYnV0dG9uPlxuICAgICAgICA8Lz5cbiAgICApIDogKFxuICAgICAgICA8PlxuICAgICAgICAgICAgPGRpYWxvZyBjbGFzc05hbWU9J2xvZ2luUG9wdXAnIHJlZj17cG9wdXBSZWZ9PlxuICAgICAgICAgICAgICAgIDxMb2dpbkZvcm0gY2xvc2U9e2Nsb3NlUG9wdXB9IHNldFVzZXI9e3NldFVzZXJ9IHNldExvZ2dlZEluPXtzZXRMb2dnZWRJbn0gc2hvd1JlbWVtYmVyTWU9e3Nob3dSZW1lbWJlck1lfS8+XG4gICAgICAgICAgICA8L2RpYWxvZz5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17c2hvd1BvcHVwfT57dCgnbG9naW4ubG9naW4nKX08L2J1dHRvbj5cbiAgICAgICAgPC8+XG4gICAgKTtcblxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9naW5Db21wb25lbnQ7IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7dXNlU3RhdGV9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHt1c2VUcmFuc2xhdGlvbn0gZnJvbSAncmVhY3QtaTE4bmV4dCc7XG5cbmNvbnN0IGxvZ2luID0gKFxuICAgIHVzZXJuYW1lLFxuICAgIHBhc3N3b3JkLFxuICAgIHJlbWVtYmVyTWUsXG4gICAgc2V0VXNlcixcbiAgICBzZXRMb2dnZWRJbixcbiAgICBzZXRJbmNvcnJlY3RMb2dpbixcbiAgICBzZXRVbmtub3duRXJyb3IsXG4gICAgY2xvc2UpID0+IHtcbiAgICBjb25zdCBib2R5ID0gW1xuICAgICAgICAndXNlcm5hbWU9JyArIHVzZXJuYW1lLFxuICAgICAgICAncGFzc3dvcmQ9JyArIHBhc3N3b3JkXG4gICAgXTtcbiAgICBpZihyZW1lbWJlck1lKSBib2R5LnB1c2goJ3VzZUNvb2tpZT1vbicpO1xuICAgIGZldGNoKCcvY21zL2xvZ2luP3Jlc3RNb2RlPXRydWUnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04JyxcbiAgICAgICAgICAgICdhbGxvdy1yZWRpcmVjdHMnOiAnZmFsc2UnXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IGJvZHkuam9pbignJicpXG4gICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNwb25zZS5ib2R5LmdldFJlYWRlcigpLnJlYWQoKS50aGVuKCh7dmFsdWV9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVjb2RlZFZhbHVlID0gbmV3IFRleHREZWNvZGVyKCkuZGVjb2RlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZihkZWNvZGVkVmFsdWUgPT09ICdPSycpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VXNlcih1c2VybmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHNldExvZ2dlZEluKHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihkZWNvZGVkVmFsdWUgPT09ICd1bmF1dGhvcml6ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEluY29ycmVjdExvZ2luKHRydWUpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgc2V0VW5rbm93bkVycm9yKHRydWUpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmNvbnN0IExvZ2luRm9ybSA9ICh7Y2xvc2UsIHNldFVzZXIsIHNldExvZ2dlZEluLCBzaG93UmVtZW1iZXJNZX0pID0+IHtcbiAgICBjb25zdCB7dH0gPSB1c2VUcmFuc2xhdGlvbigpO1xuICAgIGNvbnN0IFtpbmNvcnJlY3RMb2dpbiwgc2V0SW5jb3JyZWN0TG9naW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFt1bmtub3duRXJyb3IsIHNldFVua25vd25FcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW3VzZXJuYW1lLCBzZXRVc2VybmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG4gICAgY29uc3QgW3Bhc3N3b3JkLCBzZXRQYXNzd29yZF0gPSB1c2VTdGF0ZSgnJyk7XG4gICAgY29uc3QgW3JlbWVtYmVyTWUsIHNldFJlbWVtYmVyTWVdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxoMT57dCgnbG9naW4ubG9naW4nKX08L2gxPlxuICAgICAgICAgICAgPGZvcm0+XG4gICAgICAgICAgICAgICAge2luY29ycmVjdExvZ2luICYmIDxwIGNsYXNzTmFtZT1cImVycm9yTWVzc2FnZVwiPnt0KCdsb2dpbi5iYWRDcmVkcycpfTwvcD59XG4gICAgICAgICAgICAgICAge3Vua25vd25FcnJvciAmJiA8cCBjbGFzc05hbWU9XCJlcnJvck1lc3NhZ2VcIj57dCgnbG9naW4udW5rbm93bkVycm9yJyl9PC9wPn1cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm5hbWVcIiBuYW1lPVwidXNlcm5hbWVcIiBwbGFjZWhvbGRlcj17dCgnbG9naW4udXNlcm5hbWUnKX0gb25DaGFuZ2U9e2UgPT4gc2V0VXNlcm5hbWUoZS50YXJnZXQudmFsdWUpfSBhdXRvRm9jdXMvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj17dCgnbG9naW4ucGFzc3dvcmQnKX0gb25DaGFuZ2U9e2UgPT4gc2V0UGFzc3dvcmQoZS50YXJnZXQudmFsdWUpfS8+XG4gICAgICAgICAgICAgICAge3Nob3dSZW1lbWJlck1lICYmIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwicmVtZW1iZXJcIiBpZD1cInJlbWVtYmVyXCIgZGVmYXVsdENoZWNrZWQ9e3JlbWVtYmVyTWV9IG9uQ2hhbmdlPXsoKSA9PiBzZXRSZW1lbWJlck1lKCFyZW1lbWJlck1lKX0vPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInJlbWVtYmVyXCI+e3QoJ2xvZ2luLnJlbWVtYmVyTWUnKX08L2xhYmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2Pn1cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBsb2dpbih1c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgIHJlbWVtYmVyTWUsXG4gICAgICAgICAgICAgICAgICAgIHNldFVzZXIsXG4gICAgICAgICAgICAgICAgICAgIHNldExvZ2dlZEluLFxuICAgICAgICAgICAgICAgICAgICBzZXRJbmNvcnJlY3RMb2dpbixcbiAgICAgICAgICAgICAgICAgICAgc2V0VW5rbm93bkVycm9yLFxuICAgICAgICAgICAgICAgICAgICBjbG9zZSl9Pnt0KCdsb2dpbi5sb2dpbicpfTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8Lz5cbiAgICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IExvZ2luRm9ybTsiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VSZWYiLCJ1c2VTdGF0ZSIsIkxvZ2luRm9ybSIsIldvcmtzcGFjZU5hdmlnYXRpb24iLCJ1c2VUcmFuc2xhdGlvbiIsIkxvZ2luQ29tcG9uZW50IiwiX3JlZiIsImlzTG9nZ2VkSW4iLCJ1c2VySHlkcmF0ZWQiLCJ1cmxzIiwibW9kZSIsIm5vZGVQYXRoIiwic2hvd1JlbWVtYmVyTWUiLCJfdXNlVHJhbnNsYXRpb24iLCJ0IiwicG9wdXBSZWYiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3NsaWNlZFRvQXJyYXkiLCJ1c2VyIiwic2V0VXNlciIsIl91c2VTdGF0ZTMiLCJfdXNlU3RhdGU0IiwibG9nZ2VkSW4iLCJzZXRMb2dnZWRJbiIsInNob3dQb3B1cCIsImN1cnJlbnQiLCJzaG93TW9kYWwiLCJjbG9zZVBvcHVwIiwiY2xvc2UiLCJsb2dvdXQiLCJmZXRjaCIsImNyZWF0ZUVsZW1lbnQiLCJGcmFnbWVudCIsIm9uQ2xpY2siLCJjbGFzc05hbWUiLCJyZWYiLCJsb2dpbiIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJyZW1lbWJlck1lIiwic2V0SW5jb3JyZWN0TG9naW4iLCJzZXRVbmtub3duRXJyb3IiLCJib2R5IiwicHVzaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJqb2luIiwidGhlbiIsInJlc3BvbnNlIiwiZ2V0UmVhZGVyIiwicmVhZCIsInZhbHVlIiwiZGVjb2RlZFZhbHVlIiwiVGV4dERlY29kZXIiLCJkZWNvZGUiLCJFcnJvciIsImUiLCJfcmVmMiIsImluY29ycmVjdExvZ2luIiwidW5rbm93bkVycm9yIiwiX3VzZVN0YXRlNSIsIl91c2VTdGF0ZTYiLCJzZXRVc2VybmFtZSIsIl91c2VTdGF0ZTciLCJfdXNlU3RhdGU4Iiwic2V0UGFzc3dvcmQiLCJfdXNlU3RhdGU5IiwiX3VzZVN0YXRlMTAiLCJzZXRSZW1lbWJlck1lIiwidHlwZSIsIm5hbWUiLCJwbGFjZWhvbGRlciIsIm9uQ2hhbmdlIiwidGFyZ2V0IiwiYXV0b0ZvY3VzIiwiaWQiLCJkZWZhdWx0Q2hlY2tlZCIsImh0bWxGb3IiXSwic291cmNlUm9vdCI6IiJ9