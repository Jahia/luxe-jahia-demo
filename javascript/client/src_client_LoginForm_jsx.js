"use strict";
(self["webpackChunkluxe_jahia_demo"] = self["webpackChunkluxe_jahia_demo"] || []).push([["src_client_LoginForm_jsx"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLENBQUMsRUFDckhRLGNBQWMsaUJBQUkvQiwwREFBQSwyQkFDZkEsMERBQUE7SUFBT3FELElBQUksRUFBQyxVQUFVO0lBQUNDLElBQUksRUFBQyxVQUFVO0lBQUNLLEVBQUUsRUFBQyxVQUFVO0lBQUNDLGNBQWMsRUFBRXRELFVBQVc7SUFBQ2tELFFBQVEsRUFBRSxTQUFBQSxTQUFBO01BQUEsT0FBTVAsYUFBYSxDQUFDLENBQUMzQyxVQUFVLENBQUM7SUFBQTtFQUFDLENBQUMsQ0FBQyxlQUM5SE4sMERBQUE7SUFBTzZELE9BQU8sRUFBQztFQUFVLEdBQUU1QixDQUFDLENBQUMsa0JBQWtCLENBQVMsQ0FDdkQsQ0FBQyxlQUNOakMsMERBQUE7SUFBUXFELElBQUksRUFBQyxRQUFRO0lBQUNTLE9BQU8sRUFBRSxTQUFBQSxRQUFBO01BQUEsT0FBTTNELEtBQUssQ0FBQ0MsUUFBUSxFQUMvQ0MsUUFBUSxFQUNSQyxVQUFVLEVBQ1ZDLE9BQU8sRUFDUEMsV0FBVyxFQUNYQyxpQkFBaUIsRUFDakJDLGVBQWUsRUFDZkMsS0FBSyxDQUFDO0lBQUE7RUFBQyxHQUFFc0IsQ0FBQyxDQUFDLGFBQWEsQ0FBVSxDQUNwQyxDQUNSLENBQUM7QUFFWCxDQUFDO0FBRUQsaUVBQWVKLFNBQVMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vLi9zcmMvY2xpZW50L0xvZ2luRm9ybS5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7dXNlU3RhdGV9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHt1c2VUcmFuc2xhdGlvbn0gZnJvbSAncmVhY3QtaTE4bmV4dCc7XG5cbmNvbnN0IGxvZ2luID0gKFxuICAgIHVzZXJuYW1lLFxuICAgIHBhc3N3b3JkLFxuICAgIHJlbWVtYmVyTWUsXG4gICAgc2V0VXNlcixcbiAgICBzZXRMb2dnZWRJbixcbiAgICBzZXRJbmNvcnJlY3RMb2dpbixcbiAgICBzZXRVbmtub3duRXJyb3IsXG4gICAgY2xvc2UpID0+IHtcbiAgICBjb25zdCBib2R5ID0gW1xuICAgICAgICAndXNlcm5hbWU9JyArIHVzZXJuYW1lLFxuICAgICAgICAncGFzc3dvcmQ9JyArIHBhc3N3b3JkXG4gICAgXTtcbiAgICBpZihyZW1lbWJlck1lKSBib2R5LnB1c2goJ3VzZUNvb2tpZT1vbicpO1xuICAgIGZldGNoKCcvY21zL2xvZ2luP3Jlc3RNb2RlPXRydWUnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04JyxcbiAgICAgICAgICAgICdhbGxvdy1yZWRpcmVjdHMnOiAnZmFsc2UnXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IGJvZHkuam9pbignJicpXG4gICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNwb25zZS5ib2R5LmdldFJlYWRlcigpLnJlYWQoKS50aGVuKCh7dmFsdWV9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVjb2RlZFZhbHVlID0gbmV3IFRleHREZWNvZGVyKCkuZGVjb2RlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZihkZWNvZGVkVmFsdWUgPT09ICdPSycpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VXNlcih1c2VybmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHNldExvZ2dlZEluKHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihkZWNvZGVkVmFsdWUgPT09ICd1bmF1dGhvcml6ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEluY29ycmVjdExvZ2luKHRydWUpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgc2V0VW5rbm93bkVycm9yKHRydWUpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmNvbnN0IExvZ2luRm9ybSA9ICh7Y2xvc2UsIHNldFVzZXIsIHNldExvZ2dlZEluLCBzaG93UmVtZW1iZXJNZX0pID0+IHtcbiAgICBjb25zdCB7dH0gPSB1c2VUcmFuc2xhdGlvbigpO1xuICAgIGNvbnN0IFtpbmNvcnJlY3RMb2dpbiwgc2V0SW5jb3JyZWN0TG9naW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFt1bmtub3duRXJyb3IsIHNldFVua25vd25FcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW3VzZXJuYW1lLCBzZXRVc2VybmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG4gICAgY29uc3QgW3Bhc3N3b3JkLCBzZXRQYXNzd29yZF0gPSB1c2VTdGF0ZSgnJyk7XG4gICAgY29uc3QgW3JlbWVtYmVyTWUsIHNldFJlbWVtYmVyTWVdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxoMT57dCgnbG9naW4ubG9naW4nKX08L2gxPlxuICAgICAgICAgICAgPGZvcm0+XG4gICAgICAgICAgICAgICAge2luY29ycmVjdExvZ2luICYmIDxwIGNsYXNzTmFtZT1cImVycm9yTWVzc2FnZVwiPnt0KCdsb2dpbi5iYWRDcmVkcycpfTwvcD59XG4gICAgICAgICAgICAgICAge3Vua25vd25FcnJvciAmJiA8cCBjbGFzc05hbWU9XCJlcnJvck1lc3NhZ2VcIj57dCgnbG9naW4udW5rbm93bkVycm9yJyl9PC9wPn1cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm5hbWVcIiBuYW1lPVwidXNlcm5hbWVcIiBwbGFjZWhvbGRlcj17dCgnbG9naW4udXNlcm5hbWUnKX0gb25DaGFuZ2U9e2UgPT4gc2V0VXNlcm5hbWUoZS50YXJnZXQudmFsdWUpfSBhdXRvRm9jdXMvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj17dCgnbG9naW4ucGFzc3dvcmQnKX0gb25DaGFuZ2U9e2UgPT4gc2V0UGFzc3dvcmQoZS50YXJnZXQudmFsdWUpfS8+XG4gICAgICAgICAgICAgICAge3Nob3dSZW1lbWJlck1lICYmIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwicmVtZW1iZXJcIiBpZD1cInJlbWVtYmVyXCIgZGVmYXVsdENoZWNrZWQ9e3JlbWVtYmVyTWV9IG9uQ2hhbmdlPXsoKSA9PiBzZXRSZW1lbWJlck1lKCFyZW1lbWJlck1lKX0vPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInJlbWVtYmVyXCI+e3QoJ2xvZ2luLnJlbWVtYmVyTWUnKX08L2xhYmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2Pn1cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKSA9PiBsb2dpbih1c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgIHJlbWVtYmVyTWUsXG4gICAgICAgICAgICAgICAgICAgIHNldFVzZXIsXG4gICAgICAgICAgICAgICAgICAgIHNldExvZ2dlZEluLFxuICAgICAgICAgICAgICAgICAgICBzZXRJbmNvcnJlY3RMb2dpbixcbiAgICAgICAgICAgICAgICAgICAgc2V0VW5rbm93bkVycm9yLFxuICAgICAgICAgICAgICAgICAgICBjbG9zZSl9Pnt0KCdsb2dpbi5sb2dpbicpfTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8Lz5cbiAgICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IExvZ2luRm9ybTsiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZVRyYW5zbGF0aW9uIiwibG9naW4iLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwicmVtZW1iZXJNZSIsInNldFVzZXIiLCJzZXRMb2dnZWRJbiIsInNldEluY29ycmVjdExvZ2luIiwic2V0VW5rbm93bkVycm9yIiwiY2xvc2UiLCJib2R5IiwicHVzaCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImpvaW4iLCJ0aGVuIiwicmVzcG9uc2UiLCJnZXRSZWFkZXIiLCJyZWFkIiwiX3JlZiIsInZhbHVlIiwiZGVjb2RlZFZhbHVlIiwiVGV4dERlY29kZXIiLCJkZWNvZGUiLCJFcnJvciIsImUiLCJMb2dpbkZvcm0iLCJfcmVmMiIsInNob3dSZW1lbWJlck1lIiwiX3VzZVRyYW5zbGF0aW9uIiwidCIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsImluY29ycmVjdExvZ2luIiwiX3VzZVN0YXRlMyIsIl91c2VTdGF0ZTQiLCJ1bmtub3duRXJyb3IiLCJfdXNlU3RhdGU1IiwiX3VzZVN0YXRlNiIsInNldFVzZXJuYW1lIiwiX3VzZVN0YXRlNyIsIl91c2VTdGF0ZTgiLCJzZXRQYXNzd29yZCIsIl91c2VTdGF0ZTkiLCJfdXNlU3RhdGUxMCIsInNldFJlbWVtYmVyTWUiLCJjcmVhdGVFbGVtZW50IiwiRnJhZ21lbnQiLCJjbGFzc05hbWUiLCJ0eXBlIiwibmFtZSIsInBsYWNlaG9sZGVyIiwib25DaGFuZ2UiLCJ0YXJnZXQiLCJhdXRvRm9jdXMiLCJpZCIsImRlZmF1bHRDaGVja2VkIiwiaHRtbEZvciIsIm9uQ2xpY2siXSwic291cmNlUm9vdCI6IiJ9