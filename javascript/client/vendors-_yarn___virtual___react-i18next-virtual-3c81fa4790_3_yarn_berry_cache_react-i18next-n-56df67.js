(self["webpackChunkluxe_jahia_demo"] = self["webpackChunkluxe_jahia_demo"] || []).push([["vendors-_yarn___virtual___react-i18next-virtual-3c81fa4790_3_yarn_berry_cache_react-i18next-n-56df67"],{

/***/ "../../.yarn/berry/cache/html-parse-stringify-npm-3.0.1-5762cd4b01-10c0.zip/node_modules/html-parse-stringify/dist/html-parse-stringify.module.js":
/*!********************************************************************************************************************************************************!*\
  !*** ../../.yarn/berry/cache/html-parse-stringify-npm-3.0.1-5762cd4b01-10c0.zip/node_modules/html-parse-stringify/dist/html-parse-stringify.module.js ***!
  \********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var void_elements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! void-elements */ "../../.yarn/berry/cache/void-elements-npm-3.1.0-4f43780839-10c0.zip/node_modules/void-elements/index.js");
/* harmony import */ var void_elements__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(void_elements__WEBPACK_IMPORTED_MODULE_0__);
var t=/\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;function n(n){var r={type:"tag",name:"",voidElement:!1,attrs:{},children:[]},i=n.match(/<\/?([^\s]+?)[/\s>]/);if(i&&(r.name=i[1],((void_elements__WEBPACK_IMPORTED_MODULE_0___default())[i[1]]||"/"===n.charAt(n.length-2))&&(r.voidElement=!0),r.name.startsWith("!--"))){var s=n.indexOf("--\x3e");return{type:"comment",comment:-1!==s?n.slice(4,s):""}}for(var a=new RegExp(t),c=null;null!==(c=a.exec(n));)if(c[0].trim())if(c[1]){var o=c[1].trim(),l=[o,""];o.indexOf("=")>-1&&(l=o.split("=")),r.attrs[l[0]]=l[1],a.lastIndex--}else c[2]&&(r.attrs[c[2]]=c[3].trim().substring(1,c[3].length-1));return r}var r=/<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g,i=/^\s*$/,s=Object.create(null);function a(e,t){switch(t.type){case"text":return e+t.content;case"tag":return e+="<"+t.name+(t.attrs?function(e){var t=[];for(var n in e)t.push(n+'="'+e[n]+'"');return t.length?" "+t.join(" "):""}(t.attrs):"")+(t.voidElement?"/>":">"),t.voidElement?e:e+t.children.reduce(a,"")+"</"+t.name+">";case"comment":return e+"\x3c!--"+t.comment+"--\x3e"}}var c={parse:function(e,t){t||(t={}),t.components||(t.components=s);var a,c=[],o=[],l=-1,m=!1;if(0!==e.indexOf("<")){var u=e.indexOf("<");c.push({type:"text",content:-1===u?e:e.substring(0,u)})}return e.replace(r,function(r,s){if(m){if(r!=="</"+a.name+">")return;m=!1}var u,f="/"!==r.charAt(1),h=r.startsWith("\x3c!--"),p=s+r.length,d=e.charAt(p);if(h){var v=n(r);return l<0?(c.push(v),c):((u=o[l]).children.push(v),c)}if(f&&(l++,"tag"===(a=n(r)).type&&t.components[a.name]&&(a.type="component",m=!0),a.voidElement||m||!d||"<"===d||a.children.push({type:"text",content:e.slice(p,e.indexOf("<",p))}),0===l&&c.push(a),(u=o[l-1])&&u.children.push(a),o[l]=a),(!f||a.voidElement)&&(l>-1&&(a.voidElement||a.name===r.slice(2,-1))&&(l--,a=-1===l?c:o[l]),!m&&"<"!==d&&d)){u=-1===l?c:o[l].children;var x=e.indexOf("<",p),g=e.slice(p,-1===x?void 0:x);i.test(g)&&(g=" "),(x>-1&&l+u.length>=0||" "!==g)&&u.push({type:"text",content:g})}}),c},stringify:function(e){return e.reduce(function(e,t){return e+a("",t)},"")}};/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (c);
//# sourceMappingURL=html-parse-stringify.module.js.map


/***/ }),

/***/ "../../.yarn/berry/cache/void-elements-npm-3.1.0-4f43780839-10c0.zip/node_modules/void-elements/index.js":
/*!***************************************************************************************************************!*\
  !*** ../../.yarn/berry/cache/void-elements-npm-3.1.0-4f43780839-10c0.zip/node_modules/void-elements/index.js ***!
  \***************************************************************************************************************/
/***/ ((module) => {

/**
 * This file automatically generated from `pre-publish.js`.
 * Do not manually edit.
 */

module.exports = {
  "area": true,
  "base": true,
  "br": true,
  "col": true,
  "embed": true,
  "hr": true,
  "img": true,
  "input": true,
  "link": true,
  "meta": true,
  "param": true,
  "source": true,
  "track": true,
  "wbr": true
};


/***/ }),

/***/ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/I18nextProvider.js":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/I18nextProvider.js ***!
  \***********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I18nextProvider: () => (/* binding */ I18nextProvider)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/context.js");


function I18nextProvider(_ref) {
  let {
    i18n,
    defaultNS,
    children
  } = _ref;
  const value = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    i18n,
    defaultNS
  }), [i18n, defaultNS]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_context_js__WEBPACK_IMPORTED_MODULE_1__.I18nContext.Provider, {
    value
  }, children);
}

/***/ }),

/***/ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/Trans.js":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/Trans.js ***!
  \*************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Trans: () => (/* binding */ Trans),
/* harmony export */   nodesToString: () => (/* reexport safe */ _TransWithoutContext_js__WEBPACK_IMPORTED_MODULE_1__.nodesToString)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var _TransWithoutContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TransWithoutContext.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/TransWithoutContext.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./context.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/context.js");




function Trans(_ref) {
  let {
    children,
    count,
    parent,
    i18nKey,
    context,
    tOptions = {},
    values,
    defaults,
    components,
    ns,
    i18n: i18nFromProps,
    t: tFromProps,
    shouldUnescape,
    ...additionalProps
  } = _ref;
  const {
    i18n: i18nFromContext,
    defaultNS: defaultNSFromContext
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_js__WEBPACK_IMPORTED_MODULE_2__.I18nContext) || {};
  const i18n = i18nFromProps || i18nFromContext || (0,_context_js__WEBPACK_IMPORTED_MODULE_2__.getI18n)();
  const t = tFromProps || i18n && i18n.t.bind(i18n);
  return (0,_TransWithoutContext_js__WEBPACK_IMPORTED_MODULE_1__.Trans)({
    children,
    count,
    parent,
    i18nKey,
    context,
    tOptions,
    values,
    defaults,
    components,
    ns: ns || t && t.ns || defaultNSFromContext || i18n && i18n.options && i18n.options.defaultNS,
    i18n,
    t: tFromProps,
    shouldUnescape,
    ...additionalProps
  });
}

/***/ }),

/***/ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/TransWithoutContext.js":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/TransWithoutContext.js ***!
  \***************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Trans: () => (/* binding */ Trans),
/* harmony export */   nodesToString: () => (/* binding */ nodesToString)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var html_parse_stringify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html-parse-stringify */ "../../.yarn/berry/cache/html-parse-stringify-npm-3.0.1-5762cd4b01-10c0.zip/node_modules/html-parse-stringify/dist/html-parse-stringify.module.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/utils.js");
/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./defaults.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/defaults.js");
/* harmony import */ var _i18nInstance_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./i18nInstance.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/i18nInstance.js");





function hasChildren(node, checkLength) {
  if (!node) return false;
  const base = node.props ? node.props.children : node.children;
  if (checkLength) return base.length > 0;
  return !!base;
}
function getChildren(node) {
  if (!node) return [];
  const children = node.props ? node.props.children : node.children;
  return node.props && node.props.i18nIsDynamicList ? getAsArray(children) : children;
}
function hasValidReactChildren(children) {
  if (Object.prototype.toString.call(children) !== '[object Array]') return false;
  return children.every(child => (0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child));
}
function getAsArray(data) {
  return Array.isArray(data) ? data : [data];
}
function mergeProps(source, target) {
  const newTarget = {
    ...target
  };
  newTarget.props = Object.assign(source.props, target.props);
  return newTarget;
}
function nodesToString(children, i18nOptions) {
  if (!children) return '';
  let stringNode = '';
  const childrenArray = getAsArray(children);
  const keepArray = i18nOptions.transSupportBasicHtmlNodes && i18nOptions.transKeepBasicHtmlNodesFor ? i18nOptions.transKeepBasicHtmlNodesFor : [];
  childrenArray.forEach((child, childIndex) => {
    if (typeof child === 'string') {
      stringNode += `${child}`;
    } else if ((0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child)) {
      const childPropsCount = Object.keys(child.props).length;
      const shouldKeepChild = keepArray.indexOf(child.type) > -1;
      const childChildren = child.props.children;
      if (!childChildren && shouldKeepChild && childPropsCount === 0) {
        stringNode += `<${child.type}/>`;
      } else if (!childChildren && (!shouldKeepChild || childPropsCount !== 0)) {
        stringNode += `<${childIndex}></${childIndex}>`;
      } else if (child.props.i18nIsDynamicList) {
        stringNode += `<${childIndex}></${childIndex}>`;
      } else if (shouldKeepChild && childPropsCount === 1 && typeof childChildren === 'string') {
        stringNode += `<${child.type}>${childChildren}</${child.type}>`;
      } else {
        const content = nodesToString(childChildren, i18nOptions);
        stringNode += `<${childIndex}>${content}</${childIndex}>`;
      }
    } else if (child === null) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.warn)(`Trans: the passed in value is invalid - seems you passed in a null child.`);
    } else if (typeof child === 'object') {
      const {
        format,
        ...clone
      } = child;
      const keys = Object.keys(clone);
      if (keys.length === 1) {
        const value = format ? `${keys[0]}, ${format}` : keys[0];
        stringNode += `{{${value}}}`;
      } else {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.warn)(`react-i18next: the passed in object contained more than one variable - the object should look like {{ value, format }} where format is optional.`, child);
      }
    } else {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.warn)(`Trans: the passed in value is invalid - seems you passed in a variable like {number} - please pass in variables for interpolation as full objects like {{number}}.`, child);
    }
  });
  return stringNode;
}
function renderNodes(children, targetString, i18n, i18nOptions, combinedTOpts, shouldUnescape) {
  if (targetString === '') return [];
  const keepArray = i18nOptions.transKeepBasicHtmlNodesFor || [];
  const emptyChildrenButNeedsHandling = targetString && new RegExp(keepArray.map(keep => `<${keep}`).join('|')).test(targetString);
  if (!children && !emptyChildrenButNeedsHandling && !shouldUnescape) return [targetString];
  const data = {};
  function getData(childs) {
    const childrenArray = getAsArray(childs);
    childrenArray.forEach(child => {
      if (typeof child === 'string') return;
      if (hasChildren(child)) getData(getChildren(child));else if (typeof child === 'object' && !(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child)) Object.assign(data, child);
    });
  }
  getData(children);
  const ast = html_parse_stringify__WEBPACK_IMPORTED_MODULE_1__["default"].parse(`<0>${targetString}</0>`);
  const opts = {
    ...data,
    ...combinedTOpts
  };
  function renderInner(child, node, rootReactNode) {
    const childs = getChildren(child);
    const mappedChildren = mapAST(childs, node.children, rootReactNode);
    return hasValidReactChildren(childs) && mappedChildren.length === 0 || child.props && child.props.i18nIsDynamicList ? childs : mappedChildren;
  }
  function pushTranslatedJSX(child, inner, mem, i, isVoid) {
    if (child.dummy) {
      child.children = inner;
      mem.push((0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(child, {
        key: i
      }, isVoid ? undefined : inner));
    } else {
      mem.push(...react__WEBPACK_IMPORTED_MODULE_0__.Children.map([child], c => {
        const props = {
          ...c.props
        };
        delete props.i18nIsDynamicList;
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(c.type, {
          ...props,
          key: i,
          ref: c.ref
        }, isVoid ? null : inner);
      }));
    }
  }
  function mapAST(reactNode, astNode, rootReactNode) {
    const reactNodes = getAsArray(reactNode);
    const astNodes = getAsArray(astNode);
    return astNodes.reduce((mem, node, i) => {
      const translationContent = node.children && node.children[0] && node.children[0].content && i18n.services.interpolator.interpolate(node.children[0].content, opts, i18n.language);
      if (node.type === 'tag') {
        let tmp = reactNodes[parseInt(node.name, 10)];
        if (rootReactNode.length === 1 && !tmp) tmp = rootReactNode[0][node.name];
        if (!tmp) tmp = {};
        const child = Object.keys(node.attrs).length !== 0 ? mergeProps({
          props: node.attrs
        }, tmp) : tmp;
        const isElement = (0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child);
        const isValidTranslationWithChildren = isElement && hasChildren(node, true) && !node.voidElement;
        const isEmptyTransWithHTML = emptyChildrenButNeedsHandling && typeof child === 'object' && child.dummy && !isElement;
        const isKnownComponent = typeof children === 'object' && children !== null && Object.hasOwnProperty.call(children, node.name);
        if (typeof child === 'string') {
          const value = i18n.services.interpolator.interpolate(child, opts, i18n.language);
          mem.push(value);
        } else if (hasChildren(child) || isValidTranslationWithChildren) {
          const inner = renderInner(child, node, rootReactNode);
          pushTranslatedJSX(child, inner, mem, i);
        } else if (isEmptyTransWithHTML) {
          const inner = mapAST(reactNodes, node.children, rootReactNode);
          pushTranslatedJSX(child, inner, mem, i);
        } else if (Number.isNaN(parseFloat(node.name))) {
          if (isKnownComponent) {
            const inner = renderInner(child, node, rootReactNode);
            pushTranslatedJSX(child, inner, mem, i, node.voidElement);
          } else if (i18nOptions.transSupportBasicHtmlNodes && keepArray.indexOf(node.name) > -1) {
            if (node.voidElement) {
              mem.push((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(node.name, {
                key: `${node.name}-${i}`
              }));
            } else {
              const inner = mapAST(reactNodes, node.children, rootReactNode);
              mem.push((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(node.name, {
                key: `${node.name}-${i}`
              }, inner));
            }
          } else if (node.voidElement) {
            mem.push(`<${node.name} />`);
          } else {
            const inner = mapAST(reactNodes, node.children, rootReactNode);
            mem.push(`<${node.name}>${inner}</${node.name}>`);
          }
        } else if (typeof child === 'object' && !isElement) {
          const content = node.children[0] ? translationContent : null;
          if (content) mem.push(content);
        } else {
          pushTranslatedJSX(child, translationContent, mem, i, node.children.length !== 1 || !translationContent);
        }
      } else if (node.type === 'text') {
        const wrapTextNodes = i18nOptions.transWrapTextNodes;
        const content = shouldUnescape ? i18nOptions.unescape(i18n.services.interpolator.interpolate(node.content, opts, i18n.language)) : i18n.services.interpolator.interpolate(node.content, opts, i18n.language);
        if (wrapTextNodes) {
          mem.push((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(wrapTextNodes, {
            key: `${node.name}-${i}`
          }, content));
        } else {
          mem.push(content);
        }
      }
      return mem;
    }, []);
  }
  const result = mapAST([{
    dummy: true,
    children: children || []
  }], ast, getAsArray(children || []));
  return getChildren(result[0]);
}
function Trans(_ref) {
  let {
    children,
    count,
    parent,
    i18nKey,
    context,
    tOptions = {},
    values,
    defaults,
    components,
    ns,
    i18n: i18nFromProps,
    t: tFromProps,
    shouldUnescape,
    ...additionalProps
  } = _ref;
  const i18n = i18nFromProps || (0,_i18nInstance_js__WEBPACK_IMPORTED_MODULE_4__.getI18n)();
  if (!i18n) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.warnOnce)('You will need to pass in an i18next instance by using i18nextReactModule');
    return children;
  }
  const t = tFromProps || i18n.t.bind(i18n) || (k => k);
  tOptions.context = context;
  const reactI18nextOptions = {
    ...(0,_defaults_js__WEBPACK_IMPORTED_MODULE_3__.getDefaults)(),
    ...(i18n.options && i18n.options.react)
  };
  let namespaces = ns || t.ns || i18n.options && i18n.options.defaultNS;
  namespaces = typeof namespaces === 'string' ? [namespaces] : namespaces || ['translation'];
  const nodeAsString = nodesToString(children, reactI18nextOptions);
  const defaultValue = defaults || nodeAsString || reactI18nextOptions.transEmptyNodeValue || i18nKey;
  const {
    hashTransKey
  } = reactI18nextOptions;
  const key = i18nKey || (hashTransKey ? hashTransKey(nodeAsString || defaultValue) : nodeAsString || defaultValue);
  if (i18n.options && i18n.options.interpolation && i18n.options.interpolation.defaultVariables) {
    values = values && Object.keys(values).length > 0 ? {
      ...values,
      ...i18n.options.interpolation.defaultVariables
    } : {
      ...i18n.options.interpolation.defaultVariables
    };
  }
  const combinedTOpts = {
    ...tOptions,
    count,
    ...values,
    defaultValue,
    ns: namespaces
  };
  const translation = key ? t(key, combinedTOpts) : defaultValue;
  if (components) {
    Object.keys(components).forEach(c => {
      const comp = components[c];
      if (typeof comp.type === 'function' || !comp.props || !comp.props.children || translation.indexOf(`${c}/>`) < 0 && translation.indexOf(`${c} />`) < 0) return;
      function Componentized() {
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, comp);
      }
      components[c] = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Componentized);
    });
  }
  const content = renderNodes(components || children, translation, i18n, reactI18nextOptions, combinedTOpts, shouldUnescape);
  const useAsParent = parent !== undefined ? parent : reactI18nextOptions.defaultTransParent;
  return useAsParent ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(useAsParent, additionalProps, content) : content;
}

/***/ }),

/***/ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/Translation.js":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/Translation.js ***!
  \*******************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Translation: () => (/* binding */ Translation)
/* harmony export */ });
/* harmony import */ var _useTranslation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useTranslation.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/useTranslation.js");

function Translation(props) {
  const {
    ns,
    children,
    ...options
  } = props;
  const [t, i18n, ready] = (0,_useTranslation_js__WEBPACK_IMPORTED_MODULE_0__.useTranslation)(ns, options);
  return children(t, {
    i18n,
    lng: i18n.language
  }, ready);
}

/***/ }),

/***/ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/context.js":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/context.js ***!
  \***************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I18nContext: () => (/* binding */ I18nContext),
/* harmony export */   ReportNamespaces: () => (/* binding */ ReportNamespaces),
/* harmony export */   composeInitialProps: () => (/* binding */ composeInitialProps),
/* harmony export */   getDefaults: () => (/* reexport safe */ _defaults_js__WEBPACK_IMPORTED_MODULE_1__.getDefaults),
/* harmony export */   getI18n: () => (/* reexport safe */ _i18nInstance_js__WEBPACK_IMPORTED_MODULE_2__.getI18n),
/* harmony export */   getInitialProps: () => (/* binding */ getInitialProps),
/* harmony export */   initReactI18next: () => (/* reexport safe */ _initReactI18next_js__WEBPACK_IMPORTED_MODULE_3__.initReactI18next),
/* harmony export */   setDefaults: () => (/* reexport safe */ _defaults_js__WEBPACK_IMPORTED_MODULE_1__.setDefaults),
/* harmony export */   setI18n: () => (/* reexport safe */ _i18nInstance_js__WEBPACK_IMPORTED_MODULE_2__.setI18n)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaults.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/defaults.js");
/* harmony import */ var _i18nInstance_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./i18nInstance.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/i18nInstance.js");
/* harmony import */ var _initReactI18next_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initReactI18next.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/initReactI18next.js");





const I18nContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)();
class ReportNamespaces {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(namespaces) {
    namespaces.forEach(ns => {
      if (!this.usedNamespaces[ns]) this.usedNamespaces[ns] = true;
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
}
function composeInitialProps(ForComponent) {
  return ctx => new Promise(resolve => {
    const i18nInitialProps = getInitialProps();
    if (ForComponent.getInitialProps) {
      ForComponent.getInitialProps(ctx).then(componentsInitialProps => {
        resolve({
          ...componentsInitialProps,
          ...i18nInitialProps
        });
      });
    } else {
      resolve(i18nInitialProps);
    }
  });
}
function getInitialProps() {
  const i18n = (0,_i18nInstance_js__WEBPACK_IMPORTED_MODULE_2__.getI18n)();
  const namespaces = i18n.reportNamespaces ? i18n.reportNamespaces.getUsedNamespaces() : [];
  const ret = {};
  const initialI18nStore = {};
  i18n.languages.forEach(l => {
    initialI18nStore[l] = {};
    namespaces.forEach(ns => {
      initialI18nStore[l][ns] = i18n.getResourceBundle(l, ns) || {};
    });
  });
  ret.initialI18nStore = initialI18nStore;
  ret.initialLanguage = i18n.language;
  return ret;
}

/***/ }),

/***/ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/defaults.js":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/defaults.js ***!
  \****************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaults: () => (/* binding */ getDefaults),
/* harmony export */   setDefaults: () => (/* binding */ setDefaults)
/* harmony export */ });
/* harmony import */ var _unescape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unescape.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/unescape.js");

let defaultOptions = {
  bindI18n: 'languageChanged',
  bindI18nStore: '',
  transEmptyNodeValue: '',
  transSupportBasicHtmlNodes: true,
  transWrapTextNodes: '',
  transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
  useSuspense: true,
  unescape: _unescape_js__WEBPACK_IMPORTED_MODULE_0__.unescape
};
function setDefaults() {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  defaultOptions = {
    ...defaultOptions,
    ...options
  };
}
function getDefaults() {
  return defaultOptions;
}

/***/ }),

/***/ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/i18nInstance.js":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/i18nInstance.js ***!
  \********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getI18n: () => (/* binding */ getI18n),
/* harmony export */   setI18n: () => (/* binding */ setI18n)
/* harmony export */ });
let i18nInstance;
function setI18n(instance) {
  i18nInstance = instance;
}
function getI18n() {
  return i18nInstance;
}

/***/ }),

/***/ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/index.js":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/index.js ***!
  \*************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I18nContext: () => (/* reexport safe */ _context_js__WEBPACK_IMPORTED_MODULE_11__.I18nContext),
/* harmony export */   I18nextProvider: () => (/* reexport safe */ _I18nextProvider_js__WEBPACK_IMPORTED_MODULE_5__.I18nextProvider),
/* harmony export */   Trans: () => (/* reexport safe */ _Trans_js__WEBPACK_IMPORTED_MODULE_0__.Trans),
/* harmony export */   TransWithoutContext: () => (/* reexport safe */ _TransWithoutContext_js__WEBPACK_IMPORTED_MODULE_1__.Trans),
/* harmony export */   Translation: () => (/* reexport safe */ _Translation_js__WEBPACK_IMPORTED_MODULE_4__.Translation),
/* harmony export */   composeInitialProps: () => (/* reexport safe */ _context_js__WEBPACK_IMPORTED_MODULE_11__.composeInitialProps),
/* harmony export */   date: () => (/* binding */ date),
/* harmony export */   getDefaults: () => (/* reexport safe */ _defaults_js__WEBPACK_IMPORTED_MODULE_9__.getDefaults),
/* harmony export */   getI18n: () => (/* reexport safe */ _i18nInstance_js__WEBPACK_IMPORTED_MODULE_10__.getI18n),
/* harmony export */   getInitialProps: () => (/* reexport safe */ _context_js__WEBPACK_IMPORTED_MODULE_11__.getInitialProps),
/* harmony export */   initReactI18next: () => (/* reexport safe */ _initReactI18next_js__WEBPACK_IMPORTED_MODULE_8__.initReactI18next),
/* harmony export */   number: () => (/* binding */ number),
/* harmony export */   plural: () => (/* binding */ plural),
/* harmony export */   select: () => (/* binding */ select),
/* harmony export */   selectOrdinal: () => (/* binding */ selectOrdinal),
/* harmony export */   setDefaults: () => (/* reexport safe */ _defaults_js__WEBPACK_IMPORTED_MODULE_9__.setDefaults),
/* harmony export */   setI18n: () => (/* reexport safe */ _i18nInstance_js__WEBPACK_IMPORTED_MODULE_10__.setI18n),
/* harmony export */   time: () => (/* binding */ time),
/* harmony export */   useSSR: () => (/* reexport safe */ _useSSR_js__WEBPACK_IMPORTED_MODULE_7__.useSSR),
/* harmony export */   useTranslation: () => (/* reexport safe */ _useTranslation_js__WEBPACK_IMPORTED_MODULE_2__.useTranslation),
/* harmony export */   withSSR: () => (/* reexport safe */ _withSSR_js__WEBPACK_IMPORTED_MODULE_6__.withSSR),
/* harmony export */   withTranslation: () => (/* reexport safe */ _withTranslation_js__WEBPACK_IMPORTED_MODULE_3__.withTranslation)
/* harmony export */ });
/* harmony import */ var _Trans_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Trans.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/Trans.js");
/* harmony import */ var _TransWithoutContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TransWithoutContext.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/TransWithoutContext.js");
/* harmony import */ var _useTranslation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useTranslation.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/useTranslation.js");
/* harmony import */ var _withTranslation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./withTranslation.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/withTranslation.js");
/* harmony import */ var _Translation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Translation.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/Translation.js");
/* harmony import */ var _I18nextProvider_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./I18nextProvider.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/I18nextProvider.js");
/* harmony import */ var _withSSR_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./withSSR.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/withSSR.js");
/* harmony import */ var _useSSR_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./useSSR.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/useSSR.js");
/* harmony import */ var _initReactI18next_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./initReactI18next.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/initReactI18next.js");
/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./defaults.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/defaults.js");
/* harmony import */ var _i18nInstance_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./i18nInstance.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/i18nInstance.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./context.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/context.js");












const date = () => '';
const time = () => '';
const number = () => '';
const select = () => '';
const plural = () => '';
const selectOrdinal = () => '';

/***/ }),

/***/ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/initReactI18next.js":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/initReactI18next.js ***!
  \************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initReactI18next: () => (/* binding */ initReactI18next)
/* harmony export */ });
/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaults.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/defaults.js");
/* harmony import */ var _i18nInstance_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18nInstance.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/i18nInstance.js");


const initReactI18next = {
  type: '3rdParty',
  init(instance) {
    (0,_defaults_js__WEBPACK_IMPORTED_MODULE_0__.setDefaults)(instance.options.react);
    (0,_i18nInstance_js__WEBPACK_IMPORTED_MODULE_1__.setI18n)(instance);
  }
};

/***/ }),

/***/ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/unescape.js":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/unescape.js ***!
  \****************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   unescape: () => (/* binding */ unescape)
/* harmony export */ });
const matchHtmlEntity = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g;
const htmlEntities = {
  '&amp;': '&',
  '&#38;': '&',
  '&lt;': '<',
  '&#60;': '<',
  '&gt;': '>',
  '&#62;': '>',
  '&apos;': "'",
  '&#39;': "'",
  '&quot;': '"',
  '&#34;': '"',
  '&nbsp;': ' ',
  '&#160;': ' ',
  '&copy;': '©',
  '&#169;': '©',
  '&reg;': '®',
  '&#174;': '®',
  '&hellip;': '…',
  '&#8230;': '…',
  '&#x2F;': '/',
  '&#47;': '/'
};
const unescapeHtmlEntity = m => htmlEntities[m];
const unescape = text => text.replace(matchHtmlEntity, unescapeHtmlEntity);

/***/ }),

/***/ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/useSSR.js":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/useSSR.js ***!
  \**************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSSR: () => (/* binding */ useSSR)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/context.js");


function useSSR(initialI18nStore, initialLanguage) {
  let props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const {
    i18n: i18nFromProps
  } = props;
  const {
    i18n: i18nFromContext
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_js__WEBPACK_IMPORTED_MODULE_1__.I18nContext) || {};
  const i18n = i18nFromProps || i18nFromContext || (0,_context_js__WEBPACK_IMPORTED_MODULE_1__.getI18n)();
  if (i18n.options && i18n.options.isClone) return;
  if (initialI18nStore && !i18n.initializedStoreOnce) {
    i18n.services.resourceStore.data = initialI18nStore;
    i18n.options.ns = Object.values(initialI18nStore).reduce((mem, lngResources) => {
      Object.keys(lngResources).forEach(ns => {
        if (mem.indexOf(ns) < 0) mem.push(ns);
      });
      return mem;
    }, i18n.options.ns);
    i18n.initializedStoreOnce = true;
    i18n.isInitialized = true;
  }
  if (initialLanguage && !i18n.initializedLanguageOnce) {
    i18n.changeLanguage(initialLanguage);
    i18n.initializedLanguageOnce = true;
  }
}

/***/ }),

/***/ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/useTranslation.js":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/useTranslation.js ***!
  \**********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useTranslation: () => (/* binding */ useTranslation)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/context.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/utils.js");



const usePrevious = (value, ignore) => {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    ref.current = ignore ? ref.current : value;
  }, [value, ignore]);
  return ref.current;
};
function alwaysNewT(i18n, language, namespace, keyPrefix) {
  return i18n.getFixedT(language, namespace, keyPrefix);
}
function useMemoizedT(i18n, language, namespace, keyPrefix) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(alwaysNewT(i18n, language, namespace, keyPrefix), [i18n, language, namespace, keyPrefix]);
}
function useTranslation(ns) {
  let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    i18n: i18nFromProps
  } = props;
  const {
    i18n: i18nFromContext,
    defaultNS: defaultNSFromContext
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_js__WEBPACK_IMPORTED_MODULE_1__.I18nContext) || {};
  const i18n = i18nFromProps || i18nFromContext || (0,_context_js__WEBPACK_IMPORTED_MODULE_1__.getI18n)();
  if (i18n && !i18n.reportNamespaces) i18n.reportNamespaces = new _context_js__WEBPACK_IMPORTED_MODULE_1__.ReportNamespaces();
  if (!i18n) {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.warnOnce)('You will need to pass in an i18next instance by using initReactI18next');
    const notReadyT = (k, optsOrDefaultValue) => {
      if (typeof optsOrDefaultValue === 'string') return optsOrDefaultValue;
      if (optsOrDefaultValue && typeof optsOrDefaultValue === 'object' && typeof optsOrDefaultValue.defaultValue === 'string') return optsOrDefaultValue.defaultValue;
      return Array.isArray(k) ? k[k.length - 1] : k;
    };
    const retNotReady = [notReadyT, {}, false];
    retNotReady.t = notReadyT;
    retNotReady.i18n = {};
    retNotReady.ready = false;
    return retNotReady;
  }
  if (i18n.options.react && i18n.options.react.wait !== undefined) (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.warnOnce)('It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.');
  const i18nOptions = {
    ...(0,_context_js__WEBPACK_IMPORTED_MODULE_1__.getDefaults)(),
    ...i18n.options.react,
    ...props
  };
  const {
    useSuspense,
    keyPrefix
  } = i18nOptions;
  let namespaces = ns || defaultNSFromContext || i18n.options && i18n.options.defaultNS;
  namespaces = typeof namespaces === 'string' ? [namespaces] : namespaces || ['translation'];
  if (i18n.reportNamespaces.addUsedNamespaces) i18n.reportNamespaces.addUsedNamespaces(namespaces);
  const ready = (i18n.isInitialized || i18n.initializedStoreOnce) && namespaces.every(n => (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.hasLoadedNamespace)(n, i18n, i18nOptions));
  const memoGetT = useMemoizedT(i18n, props.lng || null, i18nOptions.nsMode === 'fallback' ? namespaces : namespaces[0], keyPrefix);
  const getT = () => memoGetT;
  const getNewT = () => alwaysNewT(i18n, props.lng || null, i18nOptions.nsMode === 'fallback' ? namespaces : namespaces[0], keyPrefix);
  const [t, setT] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(getT);
  let joinedNS = namespaces.join();
  if (props.lng) joinedNS = `${props.lng}${joinedNS}`;
  const previousJoinedNS = usePrevious(joinedNS);
  const isMounted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      bindI18n,
      bindI18nStore
    } = i18nOptions;
    isMounted.current = true;
    if (!ready && !useSuspense) {
      if (props.lng) {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.loadLanguages)(i18n, props.lng, namespaces, () => {
          if (isMounted.current) setT(getNewT);
        });
      } else {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.loadNamespaces)(i18n, namespaces, () => {
          if (isMounted.current) setT(getNewT);
        });
      }
    }
    if (ready && previousJoinedNS && previousJoinedNS !== joinedNS && isMounted.current) {
      setT(getNewT);
    }
    function boundReset() {
      if (isMounted.current) setT(getNewT);
    }
    if (bindI18n && i18n) i18n.on(bindI18n, boundReset);
    if (bindI18nStore && i18n) i18n.store.on(bindI18nStore, boundReset);
    return () => {
      isMounted.current = false;
      if (bindI18n && i18n) bindI18n.split(' ').forEach(e => i18n.off(e, boundReset));
      if (bindI18nStore && i18n) bindI18nStore.split(' ').forEach(e => i18n.store.off(e, boundReset));
    };
  }, [i18n, joinedNS]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isMounted.current && ready) {
      setT(getT);
    }
  }, [i18n, keyPrefix, ready]);
  const ret = [t, i18n, ready];
  ret.t = t;
  ret.i18n = i18n;
  ret.ready = ready;
  if (ready) return ret;
  if (!ready && !useSuspense) return ret;
  throw new Promise(resolve => {
    if (props.lng) {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.loadLanguages)(i18n, props.lng, namespaces, () => resolve());
    } else {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.loadNamespaces)(i18n, namespaces, () => resolve());
    }
  });
}

/***/ }),

/***/ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/utils.js":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/utils.js ***!
  \*************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDisplayName: () => (/* binding */ getDisplayName),
/* harmony export */   hasLoadedNamespace: () => (/* binding */ hasLoadedNamespace),
/* harmony export */   loadLanguages: () => (/* binding */ loadLanguages),
/* harmony export */   loadNamespaces: () => (/* binding */ loadNamespaces),
/* harmony export */   warn: () => (/* binding */ warn),
/* harmony export */   warnOnce: () => (/* binding */ warnOnce)
/* harmony export */ });
function warn() {
  if (console && console.warn) {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (typeof args[0] === 'string') args[0] = `react-i18next:: ${args[0]}`;
    console.warn(...args);
  }
}
const alreadyWarned = {};
function warnOnce() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  if (typeof args[0] === 'string' && alreadyWarned[args[0]]) return;
  if (typeof args[0] === 'string') alreadyWarned[args[0]] = new Date();
  warn(...args);
}
const loadedClb = (i18n, cb) => () => {
  if (i18n.isInitialized) {
    cb();
  } else {
    const initialized = () => {
      setTimeout(() => {
        i18n.off('initialized', initialized);
      }, 0);
      cb();
    };
    i18n.on('initialized', initialized);
  }
};
function loadNamespaces(i18n, ns, cb) {
  i18n.loadNamespaces(ns, loadedClb(i18n, cb));
}
function loadLanguages(i18n, lng, ns, cb) {
  if (typeof ns === 'string') ns = [ns];
  ns.forEach(n => {
    if (i18n.options.ns.indexOf(n) < 0) i18n.options.ns.push(n);
  });
  i18n.loadLanguages(lng, loadedClb(i18n, cb));
}
function oldI18nextHasLoadedNamespace(ns, i18n) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const lng = i18n.languages[0];
  const fallbackLng = i18n.options ? i18n.options.fallbackLng : false;
  const lastLng = i18n.languages[i18n.languages.length - 1];
  if (lng.toLowerCase() === 'cimode') return true;
  const loadNotPending = (l, n) => {
    const loadState = i18n.services.backendConnector.state[`${l}|${n}`];
    return loadState === -1 || loadState === 2;
  };
  if (options.bindI18n && options.bindI18n.indexOf('languageChanging') > -1 && i18n.services.backendConnector.backend && i18n.isLanguageChangingTo && !loadNotPending(i18n.isLanguageChangingTo, ns)) return false;
  if (i18n.hasResourceBundle(lng, ns)) return true;
  if (!i18n.services.backendConnector.backend || i18n.options.resources && !i18n.options.partialBundledLanguages) return true;
  if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
  return false;
}
function hasLoadedNamespace(ns, i18n) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!i18n.languages || !i18n.languages.length) {
    warnOnce('i18n.languages were undefined or empty', i18n.languages);
    return true;
  }
  const isNewerI18next = i18n.options.ignoreJSONStructure !== undefined;
  if (!isNewerI18next) {
    return oldI18nextHasLoadedNamespace(ns, i18n, options);
  }
  return i18n.hasLoadedNamespace(ns, {
    lng: options.lng,
    precheck: (i18nInstance, loadNotPending) => {
      if (options.bindI18n && options.bindI18n.indexOf('languageChanging') > -1 && i18nInstance.services.backendConnector.backend && i18nInstance.isLanguageChangingTo && !loadNotPending(i18nInstance.isLanguageChangingTo, ns)) return false;
    }
  });
}
function getDisplayName(Component) {
  return Component.displayName || Component.name || (typeof Component === 'string' && Component.length > 0 ? Component : 'Unknown');
}

/***/ }),

/***/ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/withSSR.js":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/withSSR.js ***!
  \***************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   withSSR: () => (/* binding */ withSSR)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var _useSSR_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useSSR.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/useSSR.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./context.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/context.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/utils.js");




function withSSR() {
  return function Extend(WrappedComponent) {
    function I18nextWithSSR(_ref) {
      let {
        initialI18nStore,
        initialLanguage,
        ...rest
      } = _ref;
      (0,_useSSR_js__WEBPACK_IMPORTED_MODULE_1__.useSSR)(initialI18nStore, initialLanguage);
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(WrappedComponent, {
        ...rest
      });
    }
    I18nextWithSSR.getInitialProps = (0,_context_js__WEBPACK_IMPORTED_MODULE_2__.composeInitialProps)(WrappedComponent);
    I18nextWithSSR.displayName = `withI18nextSSR(${(0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.getDisplayName)(WrappedComponent)})`;
    I18nextWithSSR.WrappedComponent = WrappedComponent;
    return I18nextWithSSR;
  };
}

/***/ }),

/***/ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/withTranslation.js":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/withTranslation.js ***!
  \***********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   withTranslation: () => (/* binding */ withTranslation)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var _useTranslation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useTranslation.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/useTranslation.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/utils.js");



function withTranslation(ns) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function Extend(WrappedComponent) {
    function I18nextWithTranslation(_ref) {
      let {
        forwardedRef,
        ...rest
      } = _ref;
      const [t, i18n, ready] = (0,_useTranslation_js__WEBPACK_IMPORTED_MODULE_1__.useTranslation)(ns, {
        ...rest,
        keyPrefix: options.keyPrefix
      });
      const passDownProps = {
        ...rest,
        t,
        i18n,
        tReady: ready
      };
      if (options.withRef && forwardedRef) {
        passDownProps.ref = forwardedRef;
      } else if (!options.withRef && forwardedRef) {
        passDownProps.forwardedRef = forwardedRef;
      }
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(WrappedComponent, passDownProps);
    }
    I18nextWithTranslation.displayName = `withI18nextTranslation(${(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.getDisplayName)(WrappedComponent)})`;
    I18nextWithTranslation.WrappedComponent = WrappedComponent;
    const forwardRef = (props, ref) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(I18nextWithTranslation, Object.assign({}, props, {
      forwardedRef: ref
    }));
    return options.withRef ? (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(forwardRef) : I18nextWithTranslation;
  };
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVuZG9ycy1feWFybl9fX3ZpcnR1YWxfX19yZWFjdC1pMThuZXh0LXZpcnR1YWwtM2M4MWZhNDc5MF8zX3lhcm5fYmVycnlfY2FjaGVfcmVhY3QtaTE4bmV4dC1uLTU2ZGY2Ny5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBNkIsMkRBQTJELGNBQWMsT0FBTywwQ0FBMEMsYUFBYSxrQ0FBa0Msb0JBQW9CLHNEQUFDLG1GQUFtRiwwQkFBMEIsT0FBTywrQ0FBK0MsK0JBQStCLHFCQUFxQix5QkFBeUIsMkJBQTJCLHFFQUFxRSxrRUFBa0UsU0FBUyx3RkFBd0YsZ0JBQWdCLGVBQWUsOEJBQThCLG9EQUFvRCxTQUFTLHVDQUF1QyxtQ0FBbUMsaUdBQWlHLHFEQUFxRCxPQUFPLG9CQUFvQixRQUFRLGlDQUFpQywwQkFBMEIsdUJBQXVCLHFCQUFxQixRQUFRLDhDQUE4QyxFQUFFLGlDQUFpQyxNQUFNLDhCQUE4QixLQUFLLCtFQUErRSxNQUFNLFdBQVcsdURBQXVELGtJQUFrSSxnREFBZ0Qsc0tBQXNLLHlCQUF5QixvREFBb0QsMkRBQTJELHNCQUFzQixHQUFHLElBQUksdUJBQXVCLDhCQUE4QixpQkFBaUIsT0FBTyxpRUFBZSxDQUFDLEVBQUM7QUFDdGlFOzs7Ozs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQitDO0FBQ0o7QUFDcEM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixnQkFBZ0IsOENBQU87QUFDdkI7QUFDQTtBQUNBLEdBQUc7QUFDSCxTQUFTLG9EQUFhLENBQUMsb0RBQVc7QUFDbEM7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmbUM7QUFDb0Q7QUFDbkM7QUFDM0I7QUFDbEI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNB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QkFBK0Isa0VBQWM7QUFDN0M7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxhQUFhLG9EQUFhO0FBQzFCO0FBQ0EsbUVBQW1FLHlEQUFjLG1CQUFtQjtBQUNwRztBQUNBLHVDQUF1QyxvREFBYSx5Q0FBeUM7QUFDN0Y7QUFDQSxLQUFLO0FBQ0wsNkJBQTZCLGlEQUFlO0FBQzVDO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vLi4vLi4vLnlhcm4vYmVycnkvY2FjaGUvaHRtbC1wYXJzZS1zdHJpbmdpZnktbnBtLTMuMC4xLTU3NjJjZDRiMDEtMTBjMC56aXAvbm9kZV9tb2R1bGVzL2h0bWwtcGFyc2Utc3RyaW5naWZ5L2Rpc3QvaHRtbC1wYXJzZS1zdHJpbmdpZnkubW9kdWxlLmpzIiwid2VicGFjazovL2x1eGUtamFoaWEtZGVtby8uLi8uLi8ueWFybi9iZXJyeS9jYWNoZS92b2lkLWVsZW1lbnRzLW5wbS0zLjEuMC00ZjQzNzgwODM5LTEwYzAuemlwL25vZGVfbW9kdWxlcy92b2lkLWVsZW1lbnRzL2luZGV4LmpzIiwid2VicGFjazovL2x1eGUtamFoaWEtZGVtby8uLy55YXJuL19fdmlydHVhbF9fL3JlYWN0LWkxOG5leHQtdmlydHVhbC0zYzgxZmE0NzkwLzMvLnlhcm4vYmVycnkvY2FjaGUvcmVhY3QtaTE4bmV4dC1ucG0tMTQuMS4wLTBiOTEyMmZmMzAtMTBjMC56aXAvbm9kZV9tb2R1bGVzL3JlYWN0LWkxOG5leHQvZGlzdC9lcy9JMThuZXh0UHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vbHV4ZS1qYWhpYS1kZW1vLy4vLnlhcm4vX192aXJ0dWFsX18vcmVhY3QtaTE4bmV4dC12aXJ0dWFsLTNjODFmYTQ3OTAvMy8ueWFybi9iZXJyeS9jYWNoZS9yZWFjdC1pMThuZXh0LW5wbS0xNC4xLjAtMGI5MTIyZmYzMC0xMGMwLnppcC9ub2RlX21vZHVsZXMvcmVhY3QtaTE4bmV4dC9kaXN0L2VzL1RyYW5zLmpzIiwid2VicGFjazovL2x1eGUtamFoaWEtZGVtby8uLy55YXJuL19fdmlydHVhbF9fL3JlYWN0LWkxOG5leHQtdmlydHVhbC0zYzgxZmE0NzkwLzMvLnlhcm4vYmVycnkvY2FjaGUvcmVhY3QtaTE4bmV4dC1ucG0tMTQuMS4wLTBiOTEyMmZmMzAtMTBjMC56aXAvbm9kZV9tb2R1bGVzL3JlYWN0LWkxOG5leHQvZGlzdC9lcy9UcmFuc1dpdGhvdXRDb250ZXh0LmpzIiwid2VicGFjazovL2x1eGUtamFoaWEtZGVtby8uLy55YXJuL19fdmlydHVhbF9fL3JlYWN0LWkxOG5leHQtdmlydHVhbC0zYzgxZmE0NzkwLzMvLnlhcm4vYmVycnkvY2FjaGUvcmVhY3QtaTE4bmV4dC1ucG0tMTQuMS4wLTBiOTEyMmZmMzAtMTBjMC56aXAvbm9kZV9tb2R1bGVzL3JlYWN0LWkxOG5leHQvZGlzdC9lcy9UcmFuc2xhdGlvbi5qcyIsIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vLi8ueWFybi9fX3ZpcnR1YWxfXy9yZWFjdC1pMThuZXh0LXZpcnR1YWwtM2M4MWZhNDc5MC8zLy55YXJuL2JlcnJ5L2NhY2hlL3JlYWN0LWkxOG5leHQtbnBtLTE0LjEuMC0wYjkxMjJmZjMwLTEwYzAuemlwL25vZGVfbW9kdWxlcy9yZWFjdC1pMThuZXh0L2Rpc3QvZXMvY29udGV4dC5qcyIsIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vLi8ueWFybi9fX3ZpcnR1YWxfXy9yZWFjdC1pMThuZXh0LXZpcnR1YWwtM2M4MWZhNDc5MC8zLy55YXJuL2JlcnJ5L2NhY2hlL3JlYWN0LWkxOG5leHQtbnBtLTE0LjEuMC0wYjkxMjJmZjMwLTEwYzAuemlwL25vZGVfbW9kdWxlcy9yZWFjdC1pMThuZXh0L2Rpc3QvZXMvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vbHV4ZS1qYWhpYS1kZW1vLy4vLnlhcm4vX192aXJ0dWFsX18vcmVhY3QtaTE4bmV4dC12aXJ0dWFsLTNjODFmYTQ3OTAvMy8ueWFybi9iZXJyeS9jYWNoZS9yZWFjdC1pMThuZXh0LW5wbS0xNC4xLjAtMGI5MTIyZmYzMC0xMGMwLnppcC9ub2RlX21vZHVsZXMvcmVhY3QtaTE4bmV4dC9kaXN0L2VzL2kxOG5JbnN0YW5jZS5qcyIsIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vLi8ueWFybi9fX3ZpcnR1YWxfXy9yZWFjdC1pMThuZXh0LXZpcnR1YWwtM2M4MWZhNDc5MC8zLy55YXJuL2JlcnJ5L2NhY2hlL3JlYWN0LWkxOG5leHQtbnBtLTE0LjEuMC0wYjkxMjJmZjMwLTEwYzAuemlwL25vZGVfbW9kdWxlcy9yZWFjdC1pMThuZXh0L2Rpc3QvZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbHV4ZS1qYWhpYS1kZW1vLy4vLnlhcm4vX192aXJ0dWFsX18vcmVhY3QtaTE4bmV4dC12aXJ0dWFsLTNjODFmYTQ3OTAvMy8ueWFybi9iZXJyeS9jYWNoZS9yZWFjdC1pMThuZXh0LW5wbS0xNC4xLjAtMGI5MTIyZmYzMC0xMGMwLnppcC9ub2RlX21vZHVsZXMvcmVhY3QtaTE4bmV4dC9kaXN0L2VzL2luaXRSZWFjdEkxOG5leHQuanMiLCJ3ZWJwYWNrOi8vbHV4ZS1qYWhpYS1kZW1vLy4vLnlhcm4vX192aXJ0dWFsX18vcmVhY3QtaTE4bmV4dC12aXJ0dWFsLTNjODFmYTQ3OTAvMy8ueWFybi9iZXJyeS9jYWNoZS9yZWFjdC1pMThuZXh0LW5wbS0xNC4xLjAtMGI5MTIyZmYzMC0xMGMwLnppcC9ub2RlX21vZHVsZXMvcmVhY3QtaTE4bmV4dC9kaXN0L2VzL3VuZXNjYXBlLmpzIiwid2VicGFjazovL2x1eGUtamFoaWEtZGVtby8uLy55YXJuL19fdmlydHVhbF9fL3JlYWN0LWkxOG5leHQtdmlydHVhbC0zYzgxZmE0NzkwLzMvLnlhcm4vYmVycnkvY2FjaGUvcmVhY3QtaTE4bmV4dC1ucG0tMTQuMS4wLTBiOTEyMmZmMzAtMTBjMC56aXAvbm9kZV9tb2R1bGVzL3JlYWN0LWkxOG5leHQvZGlzdC9lcy91c2VTU1IuanMiLCJ3ZWJwYWNrOi8vbHV4ZS1qYWhpYS1kZW1vLy4vLnlhcm4vX192aXJ0dWFsX18vcmVhY3QtaTE4bmV4dC12aXJ0dWFsLTNjODFmYTQ3OTAvMy8ueWFybi9iZXJyeS9jYWNoZS9yZWFjdC1pMThuZXh0LW5wbS0xNC4xLjAtMGI5MTIyZmYzMC0xMGMwLnppcC9ub2RlX21vZHVsZXMvcmVhY3QtaTE4bmV4dC9kaXN0L2VzL3VzZVRyYW5zbGF0aW9uLmpzIiwid2VicGFjazovL2x1eGUtamFoaWEtZGVtby8uLy55YXJuL19fdmlydHVhbF9fL3JlYWN0LWkxOG5leHQtdmlydHVhbC0zYzgxZmE0NzkwLzMvLnlhcm4vYmVycnkvY2FjaGUvcmVhY3QtaTE4bmV4dC1ucG0tMTQuMS4wLTBiOTEyMmZmMzAtMTBjMC56aXAvbm9kZV9tb2R1bGVzL3JlYWN0LWkxOG5leHQvZGlzdC9lcy91dGlscy5qcyIsIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vLi8ueWFybi9fX3ZpcnR1YWxfXy9yZWFjdC1pMThuZXh0LXZpcnR1YWwtM2M4MWZhNDc5MC8zLy55YXJuL2JlcnJ5L2NhY2hlL3JlYWN0LWkxOG5leHQtbnBtLTE0LjEuMC0wYjkxMjJmZjMwLTEwYzAuemlwL25vZGVfbW9kdWxlcy9yZWFjdC1pMThuZXh0L2Rpc3QvZXMvd2l0aFNTUi5qcyIsIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vLi8ueWFybi9fX3ZpcnR1YWxfXy9yZWFjdC1pMThuZXh0LXZpcnR1YWwtM2M4MWZhNDc5MC8zLy55YXJuL2JlcnJ5L2NhY2hlL3JlYWN0LWkxOG5leHQtbnBtLTE0LjEuMC0wYjkxMjJmZjMwLTEwYzAuemlwL25vZGVfbW9kdWxlcy9yZWFjdC1pMThuZXh0L2Rpc3QvZXMvd2l0aFRyYW5zbGF0aW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBlIGZyb21cInZvaWQtZWxlbWVudHNcIjt2YXIgdD0vXFxzKFteJ1wiL1xccz48XSs/KVtcXHMvPl18KFteXFxzPV0rKT1cXHM/KFwiLio/XCJ8Jy4qPycpL2c7ZnVuY3Rpb24gbihuKXt2YXIgcj17dHlwZTpcInRhZ1wiLG5hbWU6XCJcIix2b2lkRWxlbWVudDohMSxhdHRyczp7fSxjaGlsZHJlbjpbXX0saT1uLm1hdGNoKC88XFwvPyhbXlxcc10rPylbL1xccz5dLyk7aWYoaSYmKHIubmFtZT1pWzFdLChlW2lbMV1dfHxcIi9cIj09PW4uY2hhckF0KG4ubGVuZ3RoLTIpKSYmKHIudm9pZEVsZW1lbnQ9ITApLHIubmFtZS5zdGFydHNXaXRoKFwiIS0tXCIpKSl7dmFyIHM9bi5pbmRleE9mKFwiLS1cXHgzZVwiKTtyZXR1cm57dHlwZTpcImNvbW1lbnRcIixjb21tZW50Oi0xIT09cz9uLnNsaWNlKDQscyk6XCJcIn19Zm9yKHZhciBhPW5ldyBSZWdFeHAodCksYz1udWxsO251bGwhPT0oYz1hLmV4ZWMobikpOylpZihjWzBdLnRyaW0oKSlpZihjWzFdKXt2YXIgbz1jWzFdLnRyaW0oKSxsPVtvLFwiXCJdO28uaW5kZXhPZihcIj1cIik+LTEmJihsPW8uc3BsaXQoXCI9XCIpKSxyLmF0dHJzW2xbMF1dPWxbMV0sYS5sYXN0SW5kZXgtLX1lbHNlIGNbMl0mJihyLmF0dHJzW2NbMl1dPWNbM10udHJpbSgpLnN1YnN0cmluZygxLGNbM10ubGVuZ3RoLTEpKTtyZXR1cm4gcn12YXIgcj0vPFthLXpBLVowLTlcXC1cXCFcXC9dKD86XCJbXlwiXSpcInwnW14nXSonfFteJ1wiPl0pKj4vZyxpPS9eXFxzKiQvLHM9T2JqZWN0LmNyZWF0ZShudWxsKTtmdW5jdGlvbiBhKGUsdCl7c3dpdGNoKHQudHlwZSl7Y2FzZVwidGV4dFwiOnJldHVybiBlK3QuY29udGVudDtjYXNlXCJ0YWdcIjpyZXR1cm4gZSs9XCI8XCIrdC5uYW1lKyh0LmF0dHJzP2Z1bmN0aW9uKGUpe3ZhciB0PVtdO2Zvcih2YXIgbiBpbiBlKXQucHVzaChuKyc9XCInK2Vbbl0rJ1wiJyk7cmV0dXJuIHQubGVuZ3RoP1wiIFwiK3Quam9pbihcIiBcIik6XCJcIn0odC5hdHRycyk6XCJcIikrKHQudm9pZEVsZW1lbnQ/XCIvPlwiOlwiPlwiKSx0LnZvaWRFbGVtZW50P2U6ZSt0LmNoaWxkcmVuLnJlZHVjZShhLFwiXCIpK1wiPC9cIit0Lm5hbWUrXCI+XCI7Y2FzZVwiY29tbWVudFwiOnJldHVybiBlK1wiXFx4M2MhLS1cIit0LmNvbW1lbnQrXCItLVxceDNlXCJ9fXZhciBjPXtwYXJzZTpmdW5jdGlvbihlLHQpe3R8fCh0PXt9KSx0LmNvbXBvbmVudHN8fCh0LmNvbXBvbmVudHM9cyk7dmFyIGEsYz1bXSxvPVtdLGw9LTEsbT0hMTtpZigwIT09ZS5pbmRleE9mKFwiPFwiKSl7dmFyIHU9ZS5pbmRleE9mKFwiPFwiKTtjLnB1c2goe3R5cGU6XCJ0ZXh0XCIsY29udGVudDotMT09PXU/ZTplLnN1YnN0cmluZygwLHUpfSl9cmV0dXJuIGUucmVwbGFjZShyLGZ1bmN0aW9uKHIscyl7aWYobSl7aWYociE9PVwiPC9cIithLm5hbWUrXCI+XCIpcmV0dXJuO209ITF9dmFyIHUsZj1cIi9cIiE9PXIuY2hhckF0KDEpLGg9ci5zdGFydHNXaXRoKFwiXFx4M2MhLS1cIikscD1zK3IubGVuZ3RoLGQ9ZS5jaGFyQXQocCk7aWYoaCl7dmFyIHY9bihyKTtyZXR1cm4gbDwwPyhjLnB1c2godiksYyk6KCh1PW9bbF0pLmNoaWxkcmVuLnB1c2godiksYyl9aWYoZiYmKGwrKyxcInRhZ1wiPT09KGE9bihyKSkudHlwZSYmdC5jb21wb25lbnRzW2EubmFtZV0mJihhLnR5cGU9XCJjb21wb25lbnRcIixtPSEwKSxhLnZvaWRFbGVtZW50fHxtfHwhZHx8XCI8XCI9PT1kfHxhLmNoaWxkcmVuLnB1c2goe3R5cGU6XCJ0ZXh0XCIsY29udGVudDplLnNsaWNlKHAsZS5pbmRleE9mKFwiPFwiLHApKX0pLDA9PT1sJiZjLnB1c2goYSksKHU9b1tsLTFdKSYmdS5jaGlsZHJlbi5wdXNoKGEpLG9bbF09YSksKCFmfHxhLnZvaWRFbGVtZW50KSYmKGw+LTEmJihhLnZvaWRFbGVtZW50fHxhLm5hbWU9PT1yLnNsaWNlKDIsLTEpKSYmKGwtLSxhPS0xPT09bD9jOm9bbF0pLCFtJiZcIjxcIiE9PWQmJmQpKXt1PS0xPT09bD9jOm9bbF0uY2hpbGRyZW47dmFyIHg9ZS5pbmRleE9mKFwiPFwiLHApLGc9ZS5zbGljZShwLC0xPT09eD92b2lkIDA6eCk7aS50ZXN0KGcpJiYoZz1cIiBcIiksKHg+LTEmJmwrdS5sZW5ndGg+PTB8fFwiIFwiIT09ZykmJnUucHVzaCh7dHlwZTpcInRleHRcIixjb250ZW50Omd9KX19KSxjfSxzdHJpbmdpZnk6ZnVuY3Rpb24oZSl7cmV0dXJuIGUucmVkdWNlKGZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUrYShcIlwiLHQpfSxcIlwiKX19O2V4cG9ydCBkZWZhdWx0IGM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1odG1sLXBhcnNlLXN0cmluZ2lmeS5tb2R1bGUuanMubWFwXG4iLCIvKipcbiAqIFRoaXMgZmlsZSBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBmcm9tIGBwcmUtcHVibGlzaC5qc2AuXG4gKiBEbyBub3QgbWFudWFsbHkgZWRpdC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJhcmVhXCI6IHRydWUsXG4gIFwiYmFzZVwiOiB0cnVlLFxuICBcImJyXCI6IHRydWUsXG4gIFwiY29sXCI6IHRydWUsXG4gIFwiZW1iZWRcIjogdHJ1ZSxcbiAgXCJoclwiOiB0cnVlLFxuICBcImltZ1wiOiB0cnVlLFxuICBcImlucHV0XCI6IHRydWUsXG4gIFwibGlua1wiOiB0cnVlLFxuICBcIm1ldGFcIjogdHJ1ZSxcbiAgXCJwYXJhbVwiOiB0cnVlLFxuICBcInNvdXJjZVwiOiB0cnVlLFxuICBcInRyYWNrXCI6IHRydWUsXG4gIFwid2JyXCI6IHRydWVcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgSTE4bkNvbnRleHQgfSBmcm9tICcuL2NvbnRleHQuanMnO1xuZXhwb3J0IGZ1bmN0aW9uIEkxOG5leHRQcm92aWRlcihfcmVmKSB7XG4gIGxldCB7XG4gICAgaTE4bixcbiAgICBkZWZhdWx0TlMsXG4gICAgY2hpbGRyZW5cbiAgfSA9IF9yZWY7XG4gIGNvbnN0IHZhbHVlID0gdXNlTWVtbygoKSA9PiAoe1xuICAgIGkxOG4sXG4gICAgZGVmYXVsdE5TXG4gIH0pLCBbaTE4biwgZGVmYXVsdE5TXSk7XG4gIHJldHVybiBjcmVhdGVFbGVtZW50KEkxOG5Db250ZXh0LlByb3ZpZGVyLCB7XG4gICAgdmFsdWVcbiAgfSwgY2hpbGRyZW4pO1xufSIsImltcG9ydCB7IHVzZUNvbnRleHQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBub2Rlc1RvU3RyaW5nLCBUcmFucyBhcyBUcmFuc1dpdGhvdXRDb250ZXh0IH0gZnJvbSAnLi9UcmFuc1dpdGhvdXRDb250ZXh0LmpzJztcbmltcG9ydCB7IGdldEkxOG4sIEkxOG5Db250ZXh0IH0gZnJvbSAnLi9jb250ZXh0LmpzJztcbmV4cG9ydCB7IG5vZGVzVG9TdHJpbmcgfTtcbmV4cG9ydCBmdW5jdGlvbiBUcmFucyhfcmVmKSB7XG4gIGxldCB7XG4gICAgY2hpbGRyZW4sXG4gICAgY291bnQsXG4gICAgcGFyZW50LFxuICAgIGkxOG5LZXksXG4gICAgY29udGV4dCxcbiAgICB0T3B0aW9ucyA9IHt9LFxuICAgIHZhbHVlcyxcbiAgICBkZWZhdWx0cyxcbiAgICBjb21wb25lbnRzLFxuICAgIG5zLFxuICAgIGkxOG46IGkxOG5Gcm9tUHJvcHMsXG4gICAgdDogdEZyb21Qcm9wcyxcbiAgICBzaG91bGRVbmVzY2FwZSxcbiAgICAuLi5hZGRpdGlvbmFsUHJvcHNcbiAgfSA9IF9yZWY7XG4gIGNvbnN0IHtcbiAgICBpMThuOiBpMThuRnJvbUNvbnRleHQsXG4gICAgZGVmYXVsdE5TOiBkZWZhdWx0TlNGcm9tQ29udGV4dFxuICB9ID0gdXNlQ29udGV4dChJMThuQ29udGV4dCkgfHwge307XG4gIGNvbnN0IGkxOG4gPSBpMThuRnJvbVByb3BzIHx8IGkxOG5Gcm9tQ29udGV4dCB8fCBnZXRJMThuKCk7XG4gIGNvbnN0IHQgPSB0RnJvbVByb3BzIHx8IGkxOG4gJiYgaTE4bi50LmJpbmQoaTE4bik7XG4gIHJldHVybiBUcmFuc1dpdGhvdXRDb250ZXh0KHtcbiAgICBjaGlsZHJlbixcbiAgICBjb3VudCxcbiAgICBwYXJlbnQsXG4gICAgaTE4bktleSxcbiAgICBjb250ZXh0LFxuICAgIHRPcHRpb25zLFxuICAgIHZhbHVlcyxcbiAgICBkZWZhdWx0cyxcbiAgICBjb21wb25lbnRzLFxuICAgIG5zOiBucyB8fCB0ICYmIHQubnMgfHwgZGVmYXVsdE5TRnJvbUNvbnRleHQgfHwgaTE4biAmJiBpMThuLm9wdGlvbnMgJiYgaTE4bi5vcHRpb25zLmRlZmF1bHROUyxcbiAgICBpMThuLFxuICAgIHQ6IHRGcm9tUHJvcHMsXG4gICAgc2hvdWxkVW5lc2NhcGUsXG4gICAgLi4uYWRkaXRpb25hbFByb3BzXG4gIH0pO1xufSIsImltcG9ydCB7IEZyYWdtZW50LCBpc1ZhbGlkRWxlbWVudCwgY2xvbmVFbGVtZW50LCBjcmVhdGVFbGVtZW50LCBDaGlsZHJlbiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIVE1MIGZyb20gJ2h0bWwtcGFyc2Utc3RyaW5naWZ5JztcbmltcG9ydCB7IHdhcm4sIHdhcm5PbmNlIH0gZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgeyBnZXREZWZhdWx0cyB9IGZyb20gJy4vZGVmYXVsdHMuanMnO1xuaW1wb3J0IHsgZ2V0STE4biB9IGZyb20gJy4vaTE4bkluc3RhbmNlLmpzJztcbmZ1bmN0aW9uIGhhc0NoaWxkcmVuKG5vZGUsIGNoZWNrTGVuZ3RoKSB7XG4gIGlmICghbm9kZSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBiYXNlID0gbm9kZS5wcm9wcyA/IG5vZGUucHJvcHMuY2hpbGRyZW4gOiBub2RlLmNoaWxkcmVuO1xuICBpZiAoY2hlY2tMZW5ndGgpIHJldHVybiBiYXNlLmxlbmd0aCA+IDA7XG4gIHJldHVybiAhIWJhc2U7XG59XG5mdW5jdGlvbiBnZXRDaGlsZHJlbihub2RlKSB7XG4gIGlmICghbm9kZSkgcmV0dXJuIFtdO1xuICBjb25zdCBjaGlsZHJlbiA9IG5vZGUucHJvcHMgPyBub2RlLnByb3BzLmNoaWxkcmVuIDogbm9kZS5jaGlsZHJlbjtcbiAgcmV0dXJuIG5vZGUucHJvcHMgJiYgbm9kZS5wcm9wcy5pMThuSXNEeW5hbWljTGlzdCA/IGdldEFzQXJyYXkoY2hpbGRyZW4pIDogY2hpbGRyZW47XG59XG5mdW5jdGlvbiBoYXNWYWxpZFJlYWN0Q2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjaGlsZHJlbikgIT09ICdbb2JqZWN0IEFycmF5XScpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGNoaWxkcmVuLmV2ZXJ5KGNoaWxkID0+IGlzVmFsaWRFbGVtZW50KGNoaWxkKSk7XG59XG5mdW5jdGlvbiBnZXRBc0FycmF5KGRhdGEpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoZGF0YSkgPyBkYXRhIDogW2RhdGFdO1xufVxuZnVuY3Rpb24gbWVyZ2VQcm9wcyhzb3VyY2UsIHRhcmdldCkge1xuICBjb25zdCBuZXdUYXJnZXQgPSB7XG4gICAgLi4udGFyZ2V0XG4gIH07XG4gIG5ld1RhcmdldC5wcm9wcyA9IE9iamVjdC5hc3NpZ24oc291cmNlLnByb3BzLCB0YXJnZXQucHJvcHMpO1xuICByZXR1cm4gbmV3VGFyZ2V0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIG5vZGVzVG9TdHJpbmcoY2hpbGRyZW4sIGkxOG5PcHRpb25zKSB7XG4gIGlmICghY2hpbGRyZW4pIHJldHVybiAnJztcbiAgbGV0IHN0cmluZ05vZGUgPSAnJztcbiAgY29uc3QgY2hpbGRyZW5BcnJheSA9IGdldEFzQXJyYXkoY2hpbGRyZW4pO1xuICBjb25zdCBrZWVwQXJyYXkgPSBpMThuT3B0aW9ucy50cmFuc1N1cHBvcnRCYXNpY0h0bWxOb2RlcyAmJiBpMThuT3B0aW9ucy50cmFuc0tlZXBCYXNpY0h0bWxOb2Rlc0ZvciA/IGkxOG5PcHRpb25zLnRyYW5zS2VlcEJhc2ljSHRtbE5vZGVzRm9yIDogW107XG4gIGNoaWxkcmVuQXJyYXkuZm9yRWFjaCgoY2hpbGQsIGNoaWxkSW5kZXgpID0+IHtcbiAgICBpZiAodHlwZW9mIGNoaWxkID09PSAnc3RyaW5nJykge1xuICAgICAgc3RyaW5nTm9kZSArPSBgJHtjaGlsZH1gO1xuICAgIH0gZWxzZSBpZiAoaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAgICBjb25zdCBjaGlsZFByb3BzQ291bnQgPSBPYmplY3Qua2V5cyhjaGlsZC5wcm9wcykubGVuZ3RoO1xuICAgICAgY29uc3Qgc2hvdWxkS2VlcENoaWxkID0ga2VlcEFycmF5LmluZGV4T2YoY2hpbGQudHlwZSkgPiAtMTtcbiAgICAgIGNvbnN0IGNoaWxkQ2hpbGRyZW4gPSBjaGlsZC5wcm9wcy5jaGlsZHJlbjtcbiAgICAgIGlmICghY2hpbGRDaGlsZHJlbiAmJiBzaG91bGRLZWVwQ2hpbGQgJiYgY2hpbGRQcm9wc0NvdW50ID09PSAwKSB7XG4gICAgICAgIHN0cmluZ05vZGUgKz0gYDwke2NoaWxkLnR5cGV9Lz5gO1xuICAgICAgfSBlbHNlIGlmICghY2hpbGRDaGlsZHJlbiAmJiAoIXNob3VsZEtlZXBDaGlsZCB8fCBjaGlsZFByb3BzQ291bnQgIT09IDApKSB7XG4gICAgICAgIHN0cmluZ05vZGUgKz0gYDwke2NoaWxkSW5kZXh9PjwvJHtjaGlsZEluZGV4fT5gO1xuICAgICAgfSBlbHNlIGlmIChjaGlsZC5wcm9wcy5pMThuSXNEeW5hbWljTGlzdCkge1xuICAgICAgICBzdHJpbmdOb2RlICs9IGA8JHtjaGlsZEluZGV4fT48LyR7Y2hpbGRJbmRleH0+YDtcbiAgICAgIH0gZWxzZSBpZiAoc2hvdWxkS2VlcENoaWxkICYmIGNoaWxkUHJvcHNDb3VudCA9PT0gMSAmJiB0eXBlb2YgY2hpbGRDaGlsZHJlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgc3RyaW5nTm9kZSArPSBgPCR7Y2hpbGQudHlwZX0+JHtjaGlsZENoaWxkcmVufTwvJHtjaGlsZC50eXBlfT5gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IG5vZGVzVG9TdHJpbmcoY2hpbGRDaGlsZHJlbiwgaTE4bk9wdGlvbnMpO1xuICAgICAgICBzdHJpbmdOb2RlICs9IGA8JHtjaGlsZEluZGV4fT4ke2NvbnRlbnR9PC8ke2NoaWxkSW5kZXh9PmA7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjaGlsZCA9PT0gbnVsbCkge1xuICAgICAgd2FybihgVHJhbnM6IHRoZSBwYXNzZWQgaW4gdmFsdWUgaXMgaW52YWxpZCAtIHNlZW1zIHlvdSBwYXNzZWQgaW4gYSBudWxsIGNoaWxkLmApO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNoaWxkID09PSAnb2JqZWN0Jykge1xuICAgICAgY29uc3Qge1xuICAgICAgICBmb3JtYXQsXG4gICAgICAgIC4uLmNsb25lXG4gICAgICB9ID0gY2hpbGQ7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY2xvbmUpO1xuICAgICAgaWYgKGtleXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZm9ybWF0ID8gYCR7a2V5c1swXX0sICR7Zm9ybWF0fWAgOiBrZXlzWzBdO1xuICAgICAgICBzdHJpbmdOb2RlICs9IGB7eyR7dmFsdWV9fX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FybihgcmVhY3QtaTE4bmV4dDogdGhlIHBhc3NlZCBpbiBvYmplY3QgY29udGFpbmVkIG1vcmUgdGhhbiBvbmUgdmFyaWFibGUgLSB0aGUgb2JqZWN0IHNob3VsZCBsb29rIGxpa2Uge3sgdmFsdWUsIGZvcm1hdCB9fSB3aGVyZSBmb3JtYXQgaXMgb3B0aW9uYWwuYCwgY2hpbGQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB3YXJuKGBUcmFuczogdGhlIHBhc3NlZCBpbiB2YWx1ZSBpcyBpbnZhbGlkIC0gc2VlbXMgeW91IHBhc3NlZCBpbiBhIHZhcmlhYmxlIGxpa2Uge251bWJlcn0gLSBwbGVhc2UgcGFzcyBpbiB2YXJpYWJsZXMgZm9yIGludGVycG9sYXRpb24gYXMgZnVsbCBvYmplY3RzIGxpa2Uge3tudW1iZXJ9fS5gLCBjaGlsZCk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHN0cmluZ05vZGU7XG59XG5mdW5jdGlvbiByZW5kZXJOb2RlcyhjaGlsZHJlbiwgdGFyZ2V0U3RyaW5nLCBpMThuLCBpMThuT3B0aW9ucywgY29tYmluZWRUT3B0cywgc2hvdWxkVW5lc2NhcGUpIHtcbiAgaWYgKHRhcmdldFN0cmluZyA9PT0gJycpIHJldHVybiBbXTtcbiAgY29uc3Qga2VlcEFycmF5ID0gaTE4bk9wdGlvbnMudHJhbnNLZWVwQmFzaWNIdG1sTm9kZXNGb3IgfHwgW107XG4gIGNvbnN0IGVtcHR5Q2hpbGRyZW5CdXROZWVkc0hhbmRsaW5nID0gdGFyZ2V0U3RyaW5nICYmIG5ldyBSZWdFeHAoa2VlcEFycmF5Lm1hcChrZWVwID0+IGA8JHtrZWVwfWApLmpvaW4oJ3wnKSkudGVzdCh0YXJnZXRTdHJpbmcpO1xuICBpZiAoIWNoaWxkcmVuICYmICFlbXB0eUNoaWxkcmVuQnV0TmVlZHNIYW5kbGluZyAmJiAhc2hvdWxkVW5lc2NhcGUpIHJldHVybiBbdGFyZ2V0U3RyaW5nXTtcbiAgY29uc3QgZGF0YSA9IHt9O1xuICBmdW5jdGlvbiBnZXREYXRhKGNoaWxkcykge1xuICAgIGNvbnN0IGNoaWxkcmVuQXJyYXkgPSBnZXRBc0FycmF5KGNoaWxkcyk7XG4gICAgY2hpbGRyZW5BcnJheS5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdzdHJpbmcnKSByZXR1cm47XG4gICAgICBpZiAoaGFzQ2hpbGRyZW4oY2hpbGQpKSBnZXREYXRhKGdldENoaWxkcmVuKGNoaWxkKSk7ZWxzZSBpZiAodHlwZW9mIGNoaWxkID09PSAnb2JqZWN0JyAmJiAhaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSBPYmplY3QuYXNzaWduKGRhdGEsIGNoaWxkKTtcbiAgICB9KTtcbiAgfVxuICBnZXREYXRhKGNoaWxkcmVuKTtcbiAgY29uc3QgYXN0ID0gSFRNTC5wYXJzZShgPDA+JHt0YXJnZXRTdHJpbmd9PC8wPmApO1xuICBjb25zdCBvcHRzID0ge1xuICAgIC4uLmRhdGEsXG4gICAgLi4uY29tYmluZWRUT3B0c1xuICB9O1xuICBmdW5jdGlvbiByZW5kZXJJbm5lcihjaGlsZCwgbm9kZSwgcm9vdFJlYWN0Tm9kZSkge1xuICAgIGNvbnN0IGNoaWxkcyA9IGdldENoaWxkcmVuKGNoaWxkKTtcbiAgICBjb25zdCBtYXBwZWRDaGlsZHJlbiA9IG1hcEFTVChjaGlsZHMsIG5vZGUuY2hpbGRyZW4sIHJvb3RSZWFjdE5vZGUpO1xuICAgIHJldHVybiBoYXNWYWxpZFJlYWN0Q2hpbGRyZW4oY2hpbGRzKSAmJiBtYXBwZWRDaGlsZHJlbi5sZW5ndGggPT09IDAgfHwgY2hpbGQucHJvcHMgJiYgY2hpbGQucHJvcHMuaTE4bklzRHluYW1pY0xpc3QgPyBjaGlsZHMgOiBtYXBwZWRDaGlsZHJlbjtcbiAgfVxuICBmdW5jdGlvbiBwdXNoVHJhbnNsYXRlZEpTWChjaGlsZCwgaW5uZXIsIG1lbSwgaSwgaXNWb2lkKSB7XG4gICAgaWYgKGNoaWxkLmR1bW15KSB7XG4gICAgICBjaGlsZC5jaGlsZHJlbiA9IGlubmVyO1xuICAgICAgbWVtLnB1c2goY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgICAgIGtleTogaVxuICAgICAgfSwgaXNWb2lkID8gdW5kZWZpbmVkIDogaW5uZXIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVtLnB1c2goLi4uQ2hpbGRyZW4ubWFwKFtjaGlsZF0sIGMgPT4ge1xuICAgICAgICBjb25zdCBwcm9wcyA9IHtcbiAgICAgICAgICAuLi5jLnByb3BzXG4gICAgICAgIH07XG4gICAgICAgIGRlbGV0ZSBwcm9wcy5pMThuSXNEeW5hbWljTGlzdDtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoYy50eXBlLCB7XG4gICAgICAgICAgLi4ucHJvcHMsXG4gICAgICAgICAga2V5OiBpLFxuICAgICAgICAgIHJlZjogYy5yZWZcbiAgICAgICAgfSwgaXNWb2lkID8gbnVsbCA6IGlubmVyKTtcbiAgICAgIH0pKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gbWFwQVNUKHJlYWN0Tm9kZSwgYXN0Tm9kZSwgcm9vdFJlYWN0Tm9kZSkge1xuICAgIGNvbnN0IHJlYWN0Tm9kZXMgPSBnZXRBc0FycmF5KHJlYWN0Tm9kZSk7XG4gICAgY29uc3QgYXN0Tm9kZXMgPSBnZXRBc0FycmF5KGFzdE5vZGUpO1xuICAgIHJldHVybiBhc3ROb2Rlcy5yZWR1Y2UoKG1lbSwgbm9kZSwgaSkgPT4ge1xuICAgICAgY29uc3QgdHJhbnNsYXRpb25Db250ZW50ID0gbm9kZS5jaGlsZHJlbiAmJiBub2RlLmNoaWxkcmVuWzBdICYmIG5vZGUuY2hpbGRyZW5bMF0uY29udGVudCAmJiBpMThuLnNlcnZpY2VzLmludGVycG9sYXRvci5pbnRlcnBvbGF0ZShub2RlLmNoaWxkcmVuWzBdLmNvbnRlbnQsIG9wdHMsIGkxOG4ubGFuZ3VhZ2UpO1xuICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ3RhZycpIHtcbiAgICAgICAgbGV0IHRtcCA9IHJlYWN0Tm9kZXNbcGFyc2VJbnQobm9kZS5uYW1lLCAxMCldO1xuICAgICAgICBpZiAocm9vdFJlYWN0Tm9kZS5sZW5ndGggPT09IDEgJiYgIXRtcCkgdG1wID0gcm9vdFJlYWN0Tm9kZVswXVtub2RlLm5hbWVdO1xuICAgICAgICBpZiAoIXRtcCkgdG1wID0ge307XG4gICAgICAgIGNvbnN0IGNoaWxkID0gT2JqZWN0LmtleXMobm9kZS5hdHRycykubGVuZ3RoICE9PSAwID8gbWVyZ2VQcm9wcyh7XG4gICAgICAgICAgcHJvcHM6IG5vZGUuYXR0cnNcbiAgICAgICAgfSwgdG1wKSA6IHRtcDtcbiAgICAgICAgY29uc3QgaXNFbGVtZW50ID0gaXNWYWxpZEVsZW1lbnQoY2hpbGQpO1xuICAgICAgICBjb25zdCBpc1ZhbGlkVHJhbnNsYXRpb25XaXRoQ2hpbGRyZW4gPSBpc0VsZW1lbnQgJiYgaGFzQ2hpbGRyZW4obm9kZSwgdHJ1ZSkgJiYgIW5vZGUudm9pZEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGlzRW1wdHlUcmFuc1dpdGhIVE1MID0gZW1wdHlDaGlsZHJlbkJ1dE5lZWRzSGFuZGxpbmcgJiYgdHlwZW9mIGNoaWxkID09PSAnb2JqZWN0JyAmJiBjaGlsZC5kdW1teSAmJiAhaXNFbGVtZW50O1xuICAgICAgICBjb25zdCBpc0tub3duQ29tcG9uZW50ID0gdHlwZW9mIGNoaWxkcmVuID09PSAnb2JqZWN0JyAmJiBjaGlsZHJlbiAhPT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChjaGlsZHJlbiwgbm9kZS5uYW1lKTtcbiAgICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGkxOG4uc2VydmljZXMuaW50ZXJwb2xhdG9yLmludGVycG9sYXRlKGNoaWxkLCBvcHRzLCBpMThuLmxhbmd1YWdlKTtcbiAgICAgICAgICBtZW0ucHVzaCh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFzQ2hpbGRyZW4oY2hpbGQpIHx8IGlzVmFsaWRUcmFuc2xhdGlvbldpdGhDaGlsZHJlbikge1xuICAgICAgICAgIGNvbnN0IGlubmVyID0gcmVuZGVySW5uZXIoY2hpbGQsIG5vZGUsIHJvb3RSZWFjdE5vZGUpO1xuICAgICAgICAgIHB1c2hUcmFuc2xhdGVkSlNYKGNoaWxkLCBpbm5lciwgbWVtLCBpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0VtcHR5VHJhbnNXaXRoSFRNTCkge1xuICAgICAgICAgIGNvbnN0IGlubmVyID0gbWFwQVNUKHJlYWN0Tm9kZXMsIG5vZGUuY2hpbGRyZW4sIHJvb3RSZWFjdE5vZGUpO1xuICAgICAgICAgIHB1c2hUcmFuc2xhdGVkSlNYKGNoaWxkLCBpbm5lciwgbWVtLCBpKTtcbiAgICAgICAgfSBlbHNlIGlmIChOdW1iZXIuaXNOYU4ocGFyc2VGbG9hdChub2RlLm5hbWUpKSkge1xuICAgICAgICAgIGlmIChpc0tub3duQ29tcG9uZW50KSB7XG4gICAgICAgICAgICBjb25zdCBpbm5lciA9IHJlbmRlcklubmVyKGNoaWxkLCBub2RlLCByb290UmVhY3ROb2RlKTtcbiAgICAgICAgICAgIHB1c2hUcmFuc2xhdGVkSlNYKGNoaWxkLCBpbm5lciwgbWVtLCBpLCBub2RlLnZvaWRFbGVtZW50KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGkxOG5PcHRpb25zLnRyYW5zU3VwcG9ydEJhc2ljSHRtbE5vZGVzICYmIGtlZXBBcnJheS5pbmRleE9mKG5vZGUubmFtZSkgPiAtMSkge1xuICAgICAgICAgICAgaWYgKG5vZGUudm9pZEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgbWVtLnB1c2goY3JlYXRlRWxlbWVudChub2RlLm5hbWUsIHtcbiAgICAgICAgICAgICAgICBrZXk6IGAke25vZGUubmFtZX0tJHtpfWBcbiAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc3QgaW5uZXIgPSBtYXBBU1QocmVhY3ROb2Rlcywgbm9kZS5jaGlsZHJlbiwgcm9vdFJlYWN0Tm9kZSk7XG4gICAgICAgICAgICAgIG1lbS5wdXNoKGNyZWF0ZUVsZW1lbnQobm9kZS5uYW1lLCB7XG4gICAgICAgICAgICAgICAga2V5OiBgJHtub2RlLm5hbWV9LSR7aX1gXG4gICAgICAgICAgICAgIH0sIGlubmVyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChub2RlLnZvaWRFbGVtZW50KSB7XG4gICAgICAgICAgICBtZW0ucHVzaChgPCR7bm9kZS5uYW1lfSAvPmApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBpbm5lciA9IG1hcEFTVChyZWFjdE5vZGVzLCBub2RlLmNoaWxkcmVuLCByb290UmVhY3ROb2RlKTtcbiAgICAgICAgICAgIG1lbS5wdXNoKGA8JHtub2RlLm5hbWV9PiR7aW5uZXJ9PC8ke25vZGUubmFtZX0+YCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ29iamVjdCcgJiYgIWlzRWxlbWVudCkge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBub2RlLmNoaWxkcmVuWzBdID8gdHJhbnNsYXRpb25Db250ZW50IDogbnVsbDtcbiAgICAgICAgICBpZiAoY29udGVudCkgbWVtLnB1c2goY29udGVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHVzaFRyYW5zbGF0ZWRKU1goY2hpbGQsIHRyYW5zbGF0aW9uQ29udGVudCwgbWVtLCBpLCBub2RlLmNoaWxkcmVuLmxlbmd0aCAhPT0gMSB8fCAhdHJhbnNsYXRpb25Db250ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICBjb25zdCB3cmFwVGV4dE5vZGVzID0gaTE4bk9wdGlvbnMudHJhbnNXcmFwVGV4dE5vZGVzO1xuICAgICAgICBjb25zdCBjb250ZW50ID0gc2hvdWxkVW5lc2NhcGUgPyBpMThuT3B0aW9ucy51bmVzY2FwZShpMThuLnNlcnZpY2VzLmludGVycG9sYXRvci5pbnRlcnBvbGF0ZShub2RlLmNvbnRlbnQsIG9wdHMsIGkxOG4ubGFuZ3VhZ2UpKSA6IGkxOG4uc2VydmljZXMuaW50ZXJwb2xhdG9yLmludGVycG9sYXRlKG5vZGUuY29udGVudCwgb3B0cywgaTE4bi5sYW5ndWFnZSk7XG4gICAgICAgIGlmICh3cmFwVGV4dE5vZGVzKSB7XG4gICAgICAgICAgbWVtLnB1c2goY3JlYXRlRWxlbWVudCh3cmFwVGV4dE5vZGVzLCB7XG4gICAgICAgICAgICBrZXk6IGAke25vZGUubmFtZX0tJHtpfWBcbiAgICAgICAgICB9LCBjb250ZW50KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWVtLnB1c2goY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBtZW07XG4gICAgfSwgW10pO1xuICB9XG4gIGNvbnN0IHJlc3VsdCA9IG1hcEFTVChbe1xuICAgIGR1bW15OiB0cnVlLFxuICAgIGNoaWxkcmVuOiBjaGlsZHJlbiB8fCBbXVxuICB9XSwgYXN0LCBnZXRBc0FycmF5KGNoaWxkcmVuIHx8IFtdKSk7XG4gIHJldHVybiBnZXRDaGlsZHJlbihyZXN1bHRbMF0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIFRyYW5zKF9yZWYpIHtcbiAgbGV0IHtcbiAgICBjaGlsZHJlbixcbiAgICBjb3VudCxcbiAgICBwYXJlbnQsXG4gICAgaTE4bktleSxcbiAgICBjb250ZXh0LFxuICAgIHRPcHRpb25zID0ge30sXG4gICAgdmFsdWVzLFxuICAgIGRlZmF1bHRzLFxuICAgIGNvbXBvbmVudHMsXG4gICAgbnMsXG4gICAgaTE4bjogaTE4bkZyb21Qcm9wcyxcbiAgICB0OiB0RnJvbVByb3BzLFxuICAgIHNob3VsZFVuZXNjYXBlLFxuICAgIC4uLmFkZGl0aW9uYWxQcm9wc1xuICB9ID0gX3JlZjtcbiAgY29uc3QgaTE4biA9IGkxOG5Gcm9tUHJvcHMgfHwgZ2V0STE4bigpO1xuICBpZiAoIWkxOG4pIHtcbiAgICB3YXJuT25jZSgnWW91IHdpbGwgbmVlZCB0byBwYXNzIGluIGFuIGkxOG5leHQgaW5zdGFuY2UgYnkgdXNpbmcgaTE4bmV4dFJlYWN0TW9kdWxlJyk7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG4gIGNvbnN0IHQgPSB0RnJvbVByb3BzIHx8IGkxOG4udC5iaW5kKGkxOG4pIHx8IChrID0+IGspO1xuICB0T3B0aW9ucy5jb250ZXh0ID0gY29udGV4dDtcbiAgY29uc3QgcmVhY3RJMThuZXh0T3B0aW9ucyA9IHtcbiAgICAuLi5nZXREZWZhdWx0cygpLFxuICAgIC4uLihpMThuLm9wdGlvbnMgJiYgaTE4bi5vcHRpb25zLnJlYWN0KVxuICB9O1xuICBsZXQgbmFtZXNwYWNlcyA9IG5zIHx8IHQubnMgfHwgaTE4bi5vcHRpb25zICYmIGkxOG4ub3B0aW9ucy5kZWZhdWx0TlM7XG4gIG5hbWVzcGFjZXMgPSB0eXBlb2YgbmFtZXNwYWNlcyA9PT0gJ3N0cmluZycgPyBbbmFtZXNwYWNlc10gOiBuYW1lc3BhY2VzIHx8IFsndHJhbnNsYXRpb24nXTtcbiAgY29uc3Qgbm9kZUFzU3RyaW5nID0gbm9kZXNUb1N0cmluZyhjaGlsZHJlbiwgcmVhY3RJMThuZXh0T3B0aW9ucyk7XG4gIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IGRlZmF1bHRzIHx8IG5vZGVBc1N0cmluZyB8fCByZWFjdEkxOG5leHRPcHRpb25zLnRyYW5zRW1wdHlOb2RlVmFsdWUgfHwgaTE4bktleTtcbiAgY29uc3Qge1xuICAgIGhhc2hUcmFuc0tleVxuICB9ID0gcmVhY3RJMThuZXh0T3B0aW9ucztcbiAgY29uc3Qga2V5ID0gaTE4bktleSB8fCAoaGFzaFRyYW5zS2V5ID8gaGFzaFRyYW5zS2V5KG5vZGVBc1N0cmluZyB8fCBkZWZhdWx0VmFsdWUpIDogbm9kZUFzU3RyaW5nIHx8IGRlZmF1bHRWYWx1ZSk7XG4gIGlmIChpMThuLm9wdGlvbnMgJiYgaTE4bi5vcHRpb25zLmludGVycG9sYXRpb24gJiYgaTE4bi5vcHRpb25zLmludGVycG9sYXRpb24uZGVmYXVsdFZhcmlhYmxlcykge1xuICAgIHZhbHVlcyA9IHZhbHVlcyAmJiBPYmplY3Qua2V5cyh2YWx1ZXMpLmxlbmd0aCA+IDAgPyB7XG4gICAgICAuLi52YWx1ZXMsXG4gICAgICAuLi5pMThuLm9wdGlvbnMuaW50ZXJwb2xhdGlvbi5kZWZhdWx0VmFyaWFibGVzXG4gICAgfSA6IHtcbiAgICAgIC4uLmkxOG4ub3B0aW9ucy5pbnRlcnBvbGF0aW9uLmRlZmF1bHRWYXJpYWJsZXNcbiAgICB9O1xuICB9XG4gIGNvbnN0IGNvbWJpbmVkVE9wdHMgPSB7XG4gICAgLi4udE9wdGlvbnMsXG4gICAgY291bnQsXG4gICAgLi4udmFsdWVzLFxuICAgIGRlZmF1bHRWYWx1ZSxcbiAgICBuczogbmFtZXNwYWNlc1xuICB9O1xuICBjb25zdCB0cmFuc2xhdGlvbiA9IGtleSA/IHQoa2V5LCBjb21iaW5lZFRPcHRzKSA6IGRlZmF1bHRWYWx1ZTtcbiAgaWYgKGNvbXBvbmVudHMpIHtcbiAgICBPYmplY3Qua2V5cyhjb21wb25lbnRzKS5mb3JFYWNoKGMgPT4ge1xuICAgICAgY29uc3QgY29tcCA9IGNvbXBvbmVudHNbY107XG4gICAgICBpZiAodHlwZW9mIGNvbXAudHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fCAhY29tcC5wcm9wcyB8fCAhY29tcC5wcm9wcy5jaGlsZHJlbiB8fCB0cmFuc2xhdGlvbi5pbmRleE9mKGAke2N9Lz5gKSA8IDAgJiYgdHJhbnNsYXRpb24uaW5kZXhPZihgJHtjfSAvPmApIDwgMCkgcmV0dXJuO1xuICAgICAgZnVuY3Rpb24gQ29tcG9uZW50aXplZCgpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoRnJhZ21lbnQsIG51bGwsIGNvbXApO1xuICAgICAgfVxuICAgICAgY29tcG9uZW50c1tjXSA9IGNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50aXplZCk7XG4gICAgfSk7XG4gIH1cbiAgY29uc3QgY29udGVudCA9IHJlbmRlck5vZGVzKGNvbXBvbmVudHMgfHwgY2hpbGRyZW4sIHRyYW5zbGF0aW9uLCBpMThuLCByZWFjdEkxOG5leHRPcHRpb25zLCBjb21iaW5lZFRPcHRzLCBzaG91bGRVbmVzY2FwZSk7XG4gIGNvbnN0IHVzZUFzUGFyZW50ID0gcGFyZW50ICE9PSB1bmRlZmluZWQgPyBwYXJlbnQgOiByZWFjdEkxOG5leHRPcHRpb25zLmRlZmF1bHRUcmFuc1BhcmVudDtcbiAgcmV0dXJuIHVzZUFzUGFyZW50ID8gY3JlYXRlRWxlbWVudCh1c2VBc1BhcmVudCwgYWRkaXRpb25hbFByb3BzLCBjb250ZW50KSA6IGNvbnRlbnQ7XG59IiwiaW1wb3J0IHsgdXNlVHJhbnNsYXRpb24gfSBmcm9tICcuL3VzZVRyYW5zbGF0aW9uLmpzJztcbmV4cG9ydCBmdW5jdGlvbiBUcmFuc2xhdGlvbihwcm9wcykge1xuICBjb25zdCB7XG4gICAgbnMsXG4gICAgY2hpbGRyZW4sXG4gICAgLi4ub3B0aW9uc1xuICB9ID0gcHJvcHM7XG4gIGNvbnN0IFt0LCBpMThuLCByZWFkeV0gPSB1c2VUcmFuc2xhdGlvbihucywgb3B0aW9ucyk7XG4gIHJldHVybiBjaGlsZHJlbih0LCB7XG4gICAgaTE4bixcbiAgICBsbmc6IGkxOG4ubGFuZ3VhZ2VcbiAgfSwgcmVhZHkpO1xufSIsImltcG9ydCB7IGNyZWF0ZUNvbnRleHQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBnZXREZWZhdWx0cywgc2V0RGVmYXVsdHMgfSBmcm9tICcuL2RlZmF1bHRzLmpzJztcbmltcG9ydCB7IGdldEkxOG4sIHNldEkxOG4gfSBmcm9tICcuL2kxOG5JbnN0YW5jZS5qcyc7XG5pbXBvcnQgeyBpbml0UmVhY3RJMThuZXh0IH0gZnJvbSAnLi9pbml0UmVhY3RJMThuZXh0LmpzJztcbmV4cG9ydCB7IGdldERlZmF1bHRzLCBzZXREZWZhdWx0cywgZ2V0STE4biwgc2V0STE4biwgaW5pdFJlYWN0STE4bmV4dCB9O1xuZXhwb3J0IGNvbnN0IEkxOG5Db250ZXh0ID0gY3JlYXRlQ29udGV4dCgpO1xuZXhwb3J0IGNsYXNzIFJlcG9ydE5hbWVzcGFjZXMge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnVzZWROYW1lc3BhY2VzID0ge307XG4gIH1cbiAgYWRkVXNlZE5hbWVzcGFjZXMobmFtZXNwYWNlcykge1xuICAgIG5hbWVzcGFjZXMuZm9yRWFjaChucyA9PiB7XG4gICAgICBpZiAoIXRoaXMudXNlZE5hbWVzcGFjZXNbbnNdKSB0aGlzLnVzZWROYW1lc3BhY2VzW25zXSA9IHRydWU7XG4gICAgfSk7XG4gIH1cbiAgZ2V0VXNlZE5hbWVzcGFjZXMoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMudXNlZE5hbWVzcGFjZXMpO1xuICB9XG59XG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZUluaXRpYWxQcm9wcyhGb3JDb21wb25lbnQpIHtcbiAgcmV0dXJuIGN0eCA9PiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICBjb25zdCBpMThuSW5pdGlhbFByb3BzID0gZ2V0SW5pdGlhbFByb3BzKCk7XG4gICAgaWYgKEZvckNvbXBvbmVudC5nZXRJbml0aWFsUHJvcHMpIHtcbiAgICAgIEZvckNvbXBvbmVudC5nZXRJbml0aWFsUHJvcHMoY3R4KS50aGVuKGNvbXBvbmVudHNJbml0aWFsUHJvcHMgPT4ge1xuICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAuLi5jb21wb25lbnRzSW5pdGlhbFByb3BzLFxuICAgICAgICAgIC4uLmkxOG5Jbml0aWFsUHJvcHNcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzb2x2ZShpMThuSW5pdGlhbFByb3BzKTtcbiAgICB9XG4gIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEluaXRpYWxQcm9wcygpIHtcbiAgY29uc3QgaTE4biA9IGdldEkxOG4oKTtcbiAgY29uc3QgbmFtZXNwYWNlcyA9IGkxOG4ucmVwb3J0TmFtZXNwYWNlcyA/IGkxOG4ucmVwb3J0TmFtZXNwYWNlcy5nZXRVc2VkTmFtZXNwYWNlcygpIDogW107XG4gIGNvbnN0IHJldCA9IHt9O1xuICBjb25zdCBpbml0aWFsSTE4blN0b3JlID0ge307XG4gIGkxOG4ubGFuZ3VhZ2VzLmZvckVhY2gobCA9PiB7XG4gICAgaW5pdGlhbEkxOG5TdG9yZVtsXSA9IHt9O1xuICAgIG5hbWVzcGFjZXMuZm9yRWFjaChucyA9PiB7XG4gICAgICBpbml0aWFsSTE4blN0b3JlW2xdW25zXSA9IGkxOG4uZ2V0UmVzb3VyY2VCdW5kbGUobCwgbnMpIHx8IHt9O1xuICAgIH0pO1xuICB9KTtcbiAgcmV0LmluaXRpYWxJMThuU3RvcmUgPSBpbml0aWFsSTE4blN0b3JlO1xuICByZXQuaW5pdGlhbExhbmd1YWdlID0gaTE4bi5sYW5ndWFnZTtcbiAgcmV0dXJuIHJldDtcbn0iLCJpbXBvcnQgeyB1bmVzY2FwZSB9IGZyb20gJy4vdW5lc2NhcGUuanMnO1xubGV0IGRlZmF1bHRPcHRpb25zID0ge1xuICBiaW5kSTE4bjogJ2xhbmd1YWdlQ2hhbmdlZCcsXG4gIGJpbmRJMThuU3RvcmU6ICcnLFxuICB0cmFuc0VtcHR5Tm9kZVZhbHVlOiAnJyxcbiAgdHJhbnNTdXBwb3J0QmFzaWNIdG1sTm9kZXM6IHRydWUsXG4gIHRyYW5zV3JhcFRleHROb2RlczogJycsXG4gIHRyYW5zS2VlcEJhc2ljSHRtbE5vZGVzRm9yOiBbJ2JyJywgJ3N0cm9uZycsICdpJywgJ3AnXSxcbiAgdXNlU3VzcGVuc2U6IHRydWUsXG4gIHVuZXNjYXBlXG59O1xuZXhwb3J0IGZ1bmN0aW9uIHNldERlZmF1bHRzKCkge1xuICBsZXQgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gIGRlZmF1bHRPcHRpb25zID0ge1xuICAgIC4uLmRlZmF1bHRPcHRpb25zLFxuICAgIC4uLm9wdGlvbnNcbiAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0cygpIHtcbiAgcmV0dXJuIGRlZmF1bHRPcHRpb25zO1xufSIsImxldCBpMThuSW5zdGFuY2U7XG5leHBvcnQgZnVuY3Rpb24gc2V0STE4bihpbnN0YW5jZSkge1xuICBpMThuSW5zdGFuY2UgPSBpbnN0YW5jZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRJMThuKCkge1xuICByZXR1cm4gaTE4bkluc3RhbmNlO1xufSIsImV4cG9ydCB7IFRyYW5zIH0gZnJvbSAnLi9UcmFucy5qcyc7XG5leHBvcnQgeyBUcmFucyBhcyBUcmFuc1dpdGhvdXRDb250ZXh0IH0gZnJvbSAnLi9UcmFuc1dpdGhvdXRDb250ZXh0LmpzJztcbmV4cG9ydCB7IHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnLi91c2VUcmFuc2xhdGlvbi5qcyc7XG5leHBvcnQgeyB3aXRoVHJhbnNsYXRpb24gfSBmcm9tICcuL3dpdGhUcmFuc2xhdGlvbi5qcyc7XG5leHBvcnQgeyBUcmFuc2xhdGlvbiB9IGZyb20gJy4vVHJhbnNsYXRpb24uanMnO1xuZXhwb3J0IHsgSTE4bmV4dFByb3ZpZGVyIH0gZnJvbSAnLi9JMThuZXh0UHJvdmlkZXIuanMnO1xuZXhwb3J0IHsgd2l0aFNTUiB9IGZyb20gJy4vd2l0aFNTUi5qcyc7XG5leHBvcnQgeyB1c2VTU1IgfSBmcm9tICcuL3VzZVNTUi5qcyc7XG5leHBvcnQgeyBpbml0UmVhY3RJMThuZXh0IH0gZnJvbSAnLi9pbml0UmVhY3RJMThuZXh0LmpzJztcbmV4cG9ydCB7IHNldERlZmF1bHRzLCBnZXREZWZhdWx0cyB9IGZyb20gJy4vZGVmYXVsdHMuanMnO1xuZXhwb3J0IHsgc2V0STE4biwgZ2V0STE4biB9IGZyb20gJy4vaTE4bkluc3RhbmNlLmpzJztcbmV4cG9ydCB7IEkxOG5Db250ZXh0LCBjb21wb3NlSW5pdGlhbFByb3BzLCBnZXRJbml0aWFsUHJvcHMgfSBmcm9tICcuL2NvbnRleHQuanMnO1xuZXhwb3J0IGNvbnN0IGRhdGUgPSAoKSA9PiAnJztcbmV4cG9ydCBjb25zdCB0aW1lID0gKCkgPT4gJyc7XG5leHBvcnQgY29uc3QgbnVtYmVyID0gKCkgPT4gJyc7XG5leHBvcnQgY29uc3Qgc2VsZWN0ID0gKCkgPT4gJyc7XG5leHBvcnQgY29uc3QgcGx1cmFsID0gKCkgPT4gJyc7XG5leHBvcnQgY29uc3Qgc2VsZWN0T3JkaW5hbCA9ICgpID0+ICcnOyIsImltcG9ydCB7IHNldERlZmF1bHRzIH0gZnJvbSAnLi9kZWZhdWx0cy5qcyc7XG5pbXBvcnQgeyBzZXRJMThuIH0gZnJvbSAnLi9pMThuSW5zdGFuY2UuanMnO1xuZXhwb3J0IGNvbnN0IGluaXRSZWFjdEkxOG5leHQgPSB7XG4gIHR5cGU6ICczcmRQYXJ0eScsXG4gIGluaXQoaW5zdGFuY2UpIHtcbiAgICBzZXREZWZhdWx0cyhpbnN0YW5jZS5vcHRpb25zLnJlYWN0KTtcbiAgICBzZXRJMThuKGluc3RhbmNlKTtcbiAgfVxufTsiLCJjb25zdCBtYXRjaEh0bWxFbnRpdHkgPSAvJig/OmFtcHwjMzh8bHR8IzYwfGd0fCM2MnxhcG9zfCMzOXxxdW90fCMzNHxuYnNwfCMxNjB8Y29weXwjMTY5fHJlZ3wjMTc0fGhlbGxpcHwjODIzMHwjeDJGfCM0Nyk7L2c7XG5jb25zdCBodG1sRW50aXRpZXMgPSB7XG4gICcmYW1wOyc6ICcmJyxcbiAgJyYjMzg7JzogJyYnLFxuICAnJmx0Oyc6ICc8JyxcbiAgJyYjNjA7JzogJzwnLFxuICAnJmd0Oyc6ICc+JyxcbiAgJyYjNjI7JzogJz4nLFxuICAnJmFwb3M7JzogXCInXCIsXG4gICcmIzM5Oyc6IFwiJ1wiLFxuICAnJnF1b3Q7JzogJ1wiJyxcbiAgJyYjMzQ7JzogJ1wiJyxcbiAgJyZuYnNwOyc6ICcgJyxcbiAgJyYjMTYwOyc6ICcgJyxcbiAgJyZjb3B5Oyc6ICfCqScsXG4gICcmIzE2OTsnOiAnwqknLFxuICAnJnJlZzsnOiAnwq4nLFxuICAnJiMxNzQ7JzogJ8KuJyxcbiAgJyZoZWxsaXA7JzogJ+KApicsXG4gICcmIzgyMzA7JzogJ+KApicsXG4gICcmI3gyRjsnOiAnLycsXG4gICcmIzQ3Oyc6ICcvJ1xufTtcbmNvbnN0IHVuZXNjYXBlSHRtbEVudGl0eSA9IG0gPT4gaHRtbEVudGl0aWVzW21dO1xuZXhwb3J0IGNvbnN0IHVuZXNjYXBlID0gdGV4dCA9PiB0ZXh0LnJlcGxhY2UobWF0Y2hIdG1sRW50aXR5LCB1bmVzY2FwZUh0bWxFbnRpdHkpOyIsImltcG9ydCB7IHVzZUNvbnRleHQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBnZXRJMThuLCBJMThuQ29udGV4dCB9IGZyb20gJy4vY29udGV4dC5qcyc7XG5leHBvcnQgZnVuY3Rpb24gdXNlU1NSKGluaXRpYWxJMThuU3RvcmUsIGluaXRpYWxMYW5ndWFnZSkge1xuICBsZXQgcHJvcHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICBjb25zdCB7XG4gICAgaTE4bjogaTE4bkZyb21Qcm9wc1xuICB9ID0gcHJvcHM7XG4gIGNvbnN0IHtcbiAgICBpMThuOiBpMThuRnJvbUNvbnRleHRcbiAgfSA9IHVzZUNvbnRleHQoSTE4bkNvbnRleHQpIHx8IHt9O1xuICBjb25zdCBpMThuID0gaTE4bkZyb21Qcm9wcyB8fCBpMThuRnJvbUNvbnRleHQgfHwgZ2V0STE4bigpO1xuICBpZiAoaTE4bi5vcHRpb25zICYmIGkxOG4ub3B0aW9ucy5pc0Nsb25lKSByZXR1cm47XG4gIGlmIChpbml0aWFsSTE4blN0b3JlICYmICFpMThuLmluaXRpYWxpemVkU3RvcmVPbmNlKSB7XG4gICAgaTE4bi5zZXJ2aWNlcy5yZXNvdXJjZVN0b3JlLmRhdGEgPSBpbml0aWFsSTE4blN0b3JlO1xuICAgIGkxOG4ub3B0aW9ucy5ucyA9IE9iamVjdC52YWx1ZXMoaW5pdGlhbEkxOG5TdG9yZSkucmVkdWNlKChtZW0sIGxuZ1Jlc291cmNlcykgPT4ge1xuICAgICAgT2JqZWN0LmtleXMobG5nUmVzb3VyY2VzKS5mb3JFYWNoKG5zID0+IHtcbiAgICAgICAgaWYgKG1lbS5pbmRleE9mKG5zKSA8IDApIG1lbS5wdXNoKG5zKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1lbTtcbiAgICB9LCBpMThuLm9wdGlvbnMubnMpO1xuICAgIGkxOG4uaW5pdGlhbGl6ZWRTdG9yZU9uY2UgPSB0cnVlO1xuICAgIGkxOG4uaXNJbml0aWFsaXplZCA9IHRydWU7XG4gIH1cbiAgaWYgKGluaXRpYWxMYW5ndWFnZSAmJiAhaTE4bi5pbml0aWFsaXplZExhbmd1YWdlT25jZSkge1xuICAgIGkxOG4uY2hhbmdlTGFuZ3VhZ2UoaW5pdGlhbExhbmd1YWdlKTtcbiAgICBpMThuLmluaXRpYWxpemVkTGFuZ3VhZ2VPbmNlID0gdHJ1ZTtcbiAgfVxufSIsImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZUNvbnRleHQsIHVzZVJlZiwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBnZXRJMThuLCBnZXREZWZhdWx0cywgUmVwb3J0TmFtZXNwYWNlcywgSTE4bkNvbnRleHQgfSBmcm9tICcuL2NvbnRleHQuanMnO1xuaW1wb3J0IHsgd2Fybk9uY2UsIGxvYWROYW1lc3BhY2VzLCBsb2FkTGFuZ3VhZ2VzLCBoYXNMb2FkZWROYW1lc3BhY2UgfSBmcm9tICcuL3V0aWxzLmpzJztcbmNvbnN0IHVzZVByZXZpb3VzID0gKHZhbHVlLCBpZ25vcmUpID0+IHtcbiAgY29uc3QgcmVmID0gdXNlUmVmKCk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmVmLmN1cnJlbnQgPSBpZ25vcmUgPyByZWYuY3VycmVudCA6IHZhbHVlO1xuICB9LCBbdmFsdWUsIGlnbm9yZV0pO1xuICByZXR1cm4gcmVmLmN1cnJlbnQ7XG59O1xuZnVuY3Rpb24gYWx3YXlzTmV3VChpMThuLCBsYW5ndWFnZSwgbmFtZXNwYWNlLCBrZXlQcmVmaXgpIHtcbiAgcmV0dXJuIGkxOG4uZ2V0Rml4ZWRUKGxhbmd1YWdlLCBuYW1lc3BhY2UsIGtleVByZWZpeCk7XG59XG5mdW5jdGlvbiB1c2VNZW1vaXplZFQoaTE4biwgbGFuZ3VhZ2UsIG5hbWVzcGFjZSwga2V5UHJlZml4KSB7XG4gIHJldHVybiB1c2VDYWxsYmFjayhhbHdheXNOZXdUKGkxOG4sIGxhbmd1YWdlLCBuYW1lc3BhY2UsIGtleVByZWZpeCksIFtpMThuLCBsYW5ndWFnZSwgbmFtZXNwYWNlLCBrZXlQcmVmaXhdKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB1c2VUcmFuc2xhdGlvbihucykge1xuICBsZXQgcHJvcHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICBjb25zdCB7XG4gICAgaTE4bjogaTE4bkZyb21Qcm9wc1xuICB9ID0gcHJvcHM7XG4gIGNvbnN0IHtcbiAgICBpMThuOiBpMThuRnJvbUNvbnRleHQsXG4gICAgZGVmYXVsdE5TOiBkZWZhdWx0TlNGcm9tQ29udGV4dFxuICB9ID0gdXNlQ29udGV4dChJMThuQ29udGV4dCkgfHwge307XG4gIGNvbnN0IGkxOG4gPSBpMThuRnJvbVByb3BzIHx8IGkxOG5Gcm9tQ29udGV4dCB8fCBnZXRJMThuKCk7XG4gIGlmIChpMThuICYmICFpMThuLnJlcG9ydE5hbWVzcGFjZXMpIGkxOG4ucmVwb3J0TmFtZXNwYWNlcyA9IG5ldyBSZXBvcnROYW1lc3BhY2VzKCk7XG4gIGlmICghaTE4bikge1xuICAgIHdhcm5PbmNlKCdZb3Ugd2lsbCBuZWVkIHRvIHBhc3MgaW4gYW4gaTE4bmV4dCBpbnN0YW5jZSBieSB1c2luZyBpbml0UmVhY3RJMThuZXh0Jyk7XG4gICAgY29uc3Qgbm90UmVhZHlUID0gKGssIG9wdHNPckRlZmF1bHRWYWx1ZSkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBvcHRzT3JEZWZhdWx0VmFsdWUgPT09ICdzdHJpbmcnKSByZXR1cm4gb3B0c09yRGVmYXVsdFZhbHVlO1xuICAgICAgaWYgKG9wdHNPckRlZmF1bHRWYWx1ZSAmJiB0eXBlb2Ygb3B0c09yRGVmYXVsdFZhbHVlID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb3B0c09yRGVmYXVsdFZhbHVlLmRlZmF1bHRWYWx1ZSA9PT0gJ3N0cmluZycpIHJldHVybiBvcHRzT3JEZWZhdWx0VmFsdWUuZGVmYXVsdFZhbHVlO1xuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoaykgPyBrW2subGVuZ3RoIC0gMV0gOiBrO1xuICAgIH07XG4gICAgY29uc3QgcmV0Tm90UmVhZHkgPSBbbm90UmVhZHlULCB7fSwgZmFsc2VdO1xuICAgIHJldE5vdFJlYWR5LnQgPSBub3RSZWFkeVQ7XG4gICAgcmV0Tm90UmVhZHkuaTE4biA9IHt9O1xuICAgIHJldE5vdFJlYWR5LnJlYWR5ID0gZmFsc2U7XG4gICAgcmV0dXJuIHJldE5vdFJlYWR5O1xuICB9XG4gIGlmIChpMThuLm9wdGlvbnMucmVhY3QgJiYgaTE4bi5vcHRpb25zLnJlYWN0LndhaXQgIT09IHVuZGVmaW5lZCkgd2Fybk9uY2UoJ0l0IHNlZW1zIHlvdSBhcmUgc3RpbGwgdXNpbmcgdGhlIG9sZCB3YWl0IG9wdGlvbiwgeW91IG1heSBtaWdyYXRlIHRvIHRoZSBuZXcgdXNlU3VzcGVuc2UgYmVoYXZpb3VyLicpO1xuICBjb25zdCBpMThuT3B0aW9ucyA9IHtcbiAgICAuLi5nZXREZWZhdWx0cygpLFxuICAgIC4uLmkxOG4ub3B0aW9ucy5yZWFjdCxcbiAgICAuLi5wcm9wc1xuICB9O1xuICBjb25zdCB7XG4gICAgdXNlU3VzcGVuc2UsXG4gICAga2V5UHJlZml4XG4gIH0gPSBpMThuT3B0aW9ucztcbiAgbGV0IG5hbWVzcGFjZXMgPSBucyB8fCBkZWZhdWx0TlNGcm9tQ29udGV4dCB8fCBpMThuLm9wdGlvbnMgJiYgaTE4bi5vcHRpb25zLmRlZmF1bHROUztcbiAgbmFtZXNwYWNlcyA9IHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IFtuYW1lc3BhY2VzXSA6IG5hbWVzcGFjZXMgfHwgWyd0cmFuc2xhdGlvbiddO1xuICBpZiAoaTE4bi5yZXBvcnROYW1lc3BhY2VzLmFkZFVzZWROYW1lc3BhY2VzKSBpMThuLnJlcG9ydE5hbWVzcGFjZXMuYWRkVXNlZE5hbWVzcGFjZXMobmFtZXNwYWNlcyk7XG4gIGNvbnN0IHJlYWR5ID0gKGkxOG4uaXNJbml0aWFsaXplZCB8fCBpMThuLmluaXRpYWxpemVkU3RvcmVPbmNlKSAmJiBuYW1lc3BhY2VzLmV2ZXJ5KG4gPT4gaGFzTG9hZGVkTmFtZXNwYWNlKG4sIGkxOG4sIGkxOG5PcHRpb25zKSk7XG4gIGNvbnN0IG1lbW9HZXRUID0gdXNlTWVtb2l6ZWRUKGkxOG4sIHByb3BzLmxuZyB8fCBudWxsLCBpMThuT3B0aW9ucy5uc01vZGUgPT09ICdmYWxsYmFjaycgPyBuYW1lc3BhY2VzIDogbmFtZXNwYWNlc1swXSwga2V5UHJlZml4KTtcbiAgY29uc3QgZ2V0VCA9ICgpID0+IG1lbW9HZXRUO1xuICBjb25zdCBnZXROZXdUID0gKCkgPT4gYWx3YXlzTmV3VChpMThuLCBwcm9wcy5sbmcgfHwgbnVsbCwgaTE4bk9wdGlvbnMubnNNb2RlID09PSAnZmFsbGJhY2snID8gbmFtZXNwYWNlcyA6IG5hbWVzcGFjZXNbMF0sIGtleVByZWZpeCk7XG4gIGNvbnN0IFt0LCBzZXRUXSA9IHVzZVN0YXRlKGdldFQpO1xuICBsZXQgam9pbmVkTlMgPSBuYW1lc3BhY2VzLmpvaW4oKTtcbiAgaWYgKHByb3BzLmxuZykgam9pbmVkTlMgPSBgJHtwcm9wcy5sbmd9JHtqb2luZWROU31gO1xuICBjb25zdCBwcmV2aW91c0pvaW5lZE5TID0gdXNlUHJldmlvdXMoam9pbmVkTlMpO1xuICBjb25zdCBpc01vdW50ZWQgPSB1c2VSZWYodHJ1ZSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgYmluZEkxOG4sXG4gICAgICBiaW5kSTE4blN0b3JlXG4gICAgfSA9IGkxOG5PcHRpb25zO1xuICAgIGlzTW91bnRlZC5jdXJyZW50ID0gdHJ1ZTtcbiAgICBpZiAoIXJlYWR5ICYmICF1c2VTdXNwZW5zZSkge1xuICAgICAgaWYgKHByb3BzLmxuZykge1xuICAgICAgICBsb2FkTGFuZ3VhZ2VzKGkxOG4sIHByb3BzLmxuZywgbmFtZXNwYWNlcywgKCkgPT4ge1xuICAgICAgICAgIGlmIChpc01vdW50ZWQuY3VycmVudCkgc2V0VChnZXROZXdUKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2FkTmFtZXNwYWNlcyhpMThuLCBuYW1lc3BhY2VzLCAoKSA9PiB7XG4gICAgICAgICAgaWYgKGlzTW91bnRlZC5jdXJyZW50KSBzZXRUKGdldE5ld1QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJlYWR5ICYmIHByZXZpb3VzSm9pbmVkTlMgJiYgcHJldmlvdXNKb2luZWROUyAhPT0gam9pbmVkTlMgJiYgaXNNb3VudGVkLmN1cnJlbnQpIHtcbiAgICAgIHNldFQoZ2V0TmV3VCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJvdW5kUmVzZXQoKSB7XG4gICAgICBpZiAoaXNNb3VudGVkLmN1cnJlbnQpIHNldFQoZ2V0TmV3VCk7XG4gICAgfVxuICAgIGlmIChiaW5kSTE4biAmJiBpMThuKSBpMThuLm9uKGJpbmRJMThuLCBib3VuZFJlc2V0KTtcbiAgICBpZiAoYmluZEkxOG5TdG9yZSAmJiBpMThuKSBpMThuLnN0b3JlLm9uKGJpbmRJMThuU3RvcmUsIGJvdW5kUmVzZXQpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpc01vdW50ZWQuY3VycmVudCA9IGZhbHNlO1xuICAgICAgaWYgKGJpbmRJMThuICYmIGkxOG4pIGJpbmRJMThuLnNwbGl0KCcgJykuZm9yRWFjaChlID0+IGkxOG4ub2ZmKGUsIGJvdW5kUmVzZXQpKTtcbiAgICAgIGlmIChiaW5kSTE4blN0b3JlICYmIGkxOG4pIGJpbmRJMThuU3RvcmUuc3BsaXQoJyAnKS5mb3JFYWNoKGUgPT4gaTE4bi5zdG9yZS5vZmYoZSwgYm91bmRSZXNldCkpO1xuICAgIH07XG4gIH0sIFtpMThuLCBqb2luZWROU10pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc01vdW50ZWQuY3VycmVudCAmJiByZWFkeSkge1xuICAgICAgc2V0VChnZXRUKTtcbiAgICB9XG4gIH0sIFtpMThuLCBrZXlQcmVmaXgsIHJlYWR5XSk7XG4gIGNvbnN0IHJldCA9IFt0LCBpMThuLCByZWFkeV07XG4gIHJldC50ID0gdDtcbiAgcmV0LmkxOG4gPSBpMThuO1xuICByZXQucmVhZHkgPSByZWFkeTtcbiAgaWYgKHJlYWR5KSByZXR1cm4gcmV0O1xuICBpZiAoIXJlYWR5ICYmICF1c2VTdXNwZW5zZSkgcmV0dXJuIHJldDtcbiAgdGhyb3cgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgaWYgKHByb3BzLmxuZykge1xuICAgICAgbG9hZExhbmd1YWdlcyhpMThuLCBwcm9wcy5sbmcsIG5hbWVzcGFjZXMsICgpID0+IHJlc29sdmUoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvYWROYW1lc3BhY2VzKGkxOG4sIG5hbWVzcGFjZXMsICgpID0+IHJlc29sdmUoKSk7XG4gICAgfVxuICB9KTtcbn0iLCJleHBvcnQgZnVuY3Rpb24gd2FybigpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdzdHJpbmcnKSBhcmdzWzBdID0gYHJlYWN0LWkxOG5leHQ6OiAke2FyZ3NbMF19YDtcbiAgICBjb25zb2xlLndhcm4oLi4uYXJncyk7XG4gIH1cbn1cbmNvbnN0IGFscmVhZHlXYXJuZWQgPSB7fTtcbmV4cG9ydCBmdW5jdGlvbiB3YXJuT25jZSgpIHtcbiAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICB9XG4gIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ3N0cmluZycgJiYgYWxyZWFkeVdhcm5lZFthcmdzWzBdXSkgcmV0dXJuO1xuICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdzdHJpbmcnKSBhbHJlYWR5V2FybmVkW2FyZ3NbMF1dID0gbmV3IERhdGUoKTtcbiAgd2FybiguLi5hcmdzKTtcbn1cbmNvbnN0IGxvYWRlZENsYiA9IChpMThuLCBjYikgPT4gKCkgPT4ge1xuICBpZiAoaTE4bi5pc0luaXRpYWxpemVkKSB7XG4gICAgY2IoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBpbml0aWFsaXplZCA9ICgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpMThuLm9mZignaW5pdGlhbGl6ZWQnLCBpbml0aWFsaXplZCk7XG4gICAgICB9LCAwKTtcbiAgICAgIGNiKCk7XG4gICAgfTtcbiAgICBpMThuLm9uKCdpbml0aWFsaXplZCcsIGluaXRpYWxpemVkKTtcbiAgfVxufTtcbmV4cG9ydCBmdW5jdGlvbiBsb2FkTmFtZXNwYWNlcyhpMThuLCBucywgY2IpIHtcbiAgaTE4bi5sb2FkTmFtZXNwYWNlcyhucywgbG9hZGVkQ2xiKGkxOG4sIGNiKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gbG9hZExhbmd1YWdlcyhpMThuLCBsbmcsIG5zLCBjYikge1xuICBpZiAodHlwZW9mIG5zID09PSAnc3RyaW5nJykgbnMgPSBbbnNdO1xuICBucy5mb3JFYWNoKG4gPT4ge1xuICAgIGlmIChpMThuLm9wdGlvbnMubnMuaW5kZXhPZihuKSA8IDApIGkxOG4ub3B0aW9ucy5ucy5wdXNoKG4pO1xuICB9KTtcbiAgaTE4bi5sb2FkTGFuZ3VhZ2VzKGxuZywgbG9hZGVkQ2xiKGkxOG4sIGNiKSk7XG59XG5mdW5jdGlvbiBvbGRJMThuZXh0SGFzTG9hZGVkTmFtZXNwYWNlKG5zLCBpMThuKSB7XG4gIGxldCBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgY29uc3QgbG5nID0gaTE4bi5sYW5ndWFnZXNbMF07XG4gIGNvbnN0IGZhbGxiYWNrTG5nID0gaTE4bi5vcHRpb25zID8gaTE4bi5vcHRpb25zLmZhbGxiYWNrTG5nIDogZmFsc2U7XG4gIGNvbnN0IGxhc3RMbmcgPSBpMThuLmxhbmd1YWdlc1tpMThuLmxhbmd1YWdlcy5sZW5ndGggLSAxXTtcbiAgaWYgKGxuZy50b0xvd2VyQ2FzZSgpID09PSAnY2ltb2RlJykgcmV0dXJuIHRydWU7XG4gIGNvbnN0IGxvYWROb3RQZW5kaW5nID0gKGwsIG4pID0+IHtcbiAgICBjb25zdCBsb2FkU3RhdGUgPSBpMThuLnNlcnZpY2VzLmJhY2tlbmRDb25uZWN0b3Iuc3RhdGVbYCR7bH18JHtufWBdO1xuICAgIHJldHVybiBsb2FkU3RhdGUgPT09IC0xIHx8IGxvYWRTdGF0ZSA9PT0gMjtcbiAgfTtcbiAgaWYgKG9wdGlvbnMuYmluZEkxOG4gJiYgb3B0aW9ucy5iaW5kSTE4bi5pbmRleE9mKCdsYW5ndWFnZUNoYW5naW5nJykgPiAtMSAmJiBpMThuLnNlcnZpY2VzLmJhY2tlbmRDb25uZWN0b3IuYmFja2VuZCAmJiBpMThuLmlzTGFuZ3VhZ2VDaGFuZ2luZ1RvICYmICFsb2FkTm90UGVuZGluZyhpMThuLmlzTGFuZ3VhZ2VDaGFuZ2luZ1RvLCBucykpIHJldHVybiBmYWxzZTtcbiAgaWYgKGkxOG4uaGFzUmVzb3VyY2VCdW5kbGUobG5nLCBucykpIHJldHVybiB0cnVlO1xuICBpZiAoIWkxOG4uc2VydmljZXMuYmFja2VuZENvbm5lY3Rvci5iYWNrZW5kIHx8IGkxOG4ub3B0aW9ucy5yZXNvdXJjZXMgJiYgIWkxOG4ub3B0aW9ucy5wYXJ0aWFsQnVuZGxlZExhbmd1YWdlcykgcmV0dXJuIHRydWU7XG4gIGlmIChsb2FkTm90UGVuZGluZyhsbmcsIG5zKSAmJiAoIWZhbGxiYWNrTG5nIHx8IGxvYWROb3RQZW5kaW5nKGxhc3RMbmcsIG5zKSkpIHJldHVybiB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59XG5leHBvcnQgZnVuY3Rpb24gaGFzTG9hZGVkTmFtZXNwYWNlKG5zLCBpMThuKSB7XG4gIGxldCBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgaWYgKCFpMThuLmxhbmd1YWdlcyB8fCAhaTE4bi5sYW5ndWFnZXMubGVuZ3RoKSB7XG4gICAgd2Fybk9uY2UoJ2kxOG4ubGFuZ3VhZ2VzIHdlcmUgdW5kZWZpbmVkIG9yIGVtcHR5JywgaTE4bi5sYW5ndWFnZXMpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGNvbnN0IGlzTmV3ZXJJMThuZXh0ID0gaTE4bi5vcHRpb25zLmlnbm9yZUpTT05TdHJ1Y3R1cmUgIT09IHVuZGVmaW5lZDtcbiAgaWYgKCFpc05ld2VySTE4bmV4dCkge1xuICAgIHJldHVybiBvbGRJMThuZXh0SGFzTG9hZGVkTmFtZXNwYWNlKG5zLCBpMThuLCBvcHRpb25zKTtcbiAgfVxuICByZXR1cm4gaTE4bi5oYXNMb2FkZWROYW1lc3BhY2UobnMsIHtcbiAgICBsbmc6IG9wdGlvbnMubG5nLFxuICAgIHByZWNoZWNrOiAoaTE4bkluc3RhbmNlLCBsb2FkTm90UGVuZGluZykgPT4ge1xuICAgICAgaWYgKG9wdGlvbnMuYmluZEkxOG4gJiYgb3B0aW9ucy5iaW5kSTE4bi5pbmRleE9mKCdsYW5ndWFnZUNoYW5naW5nJykgPiAtMSAmJiBpMThuSW5zdGFuY2Uuc2VydmljZXMuYmFja2VuZENvbm5lY3Rvci5iYWNrZW5kICYmIGkxOG5JbnN0YW5jZS5pc0xhbmd1YWdlQ2hhbmdpbmdUbyAmJiAhbG9hZE5vdFBlbmRpbmcoaTE4bkluc3RhbmNlLmlzTGFuZ3VhZ2VDaGFuZ2luZ1RvLCBucykpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldERpc3BsYXlOYW1lKENvbXBvbmVudCkge1xuICByZXR1cm4gQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC5uYW1lIHx8ICh0eXBlb2YgQ29tcG9uZW50ID09PSAnc3RyaW5nJyAmJiBDb21wb25lbnQubGVuZ3RoID4gMCA/IENvbXBvbmVudCA6ICdVbmtub3duJyk7XG59IiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVNTUiB9IGZyb20gJy4vdXNlU1NSLmpzJztcbmltcG9ydCB7IGNvbXBvc2VJbml0aWFsUHJvcHMgfSBmcm9tICcuL2NvbnRleHQuanMnO1xuaW1wb3J0IHsgZ2V0RGlzcGxheU5hbWUgfSBmcm9tICcuL3V0aWxzLmpzJztcbmV4cG9ydCBmdW5jdGlvbiB3aXRoU1NSKCkge1xuICByZXR1cm4gZnVuY3Rpb24gRXh0ZW5kKFdyYXBwZWRDb21wb25lbnQpIHtcbiAgICBmdW5jdGlvbiBJMThuZXh0V2l0aFNTUihfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBpbml0aWFsSTE4blN0b3JlLFxuICAgICAgICBpbml0aWFsTGFuZ3VhZ2UsXG4gICAgICAgIC4uLnJlc3RcbiAgICAgIH0gPSBfcmVmO1xuICAgICAgdXNlU1NSKGluaXRpYWxJMThuU3RvcmUsIGluaXRpYWxMYW5ndWFnZSk7XG4gICAgICByZXR1cm4gY3JlYXRlRWxlbWVudChXcmFwcGVkQ29tcG9uZW50LCB7XG4gICAgICAgIC4uLnJlc3RcbiAgICAgIH0pO1xuICAgIH1cbiAgICBJMThuZXh0V2l0aFNTUi5nZXRJbml0aWFsUHJvcHMgPSBjb21wb3NlSW5pdGlhbFByb3BzKFdyYXBwZWRDb21wb25lbnQpO1xuICAgIEkxOG5leHRXaXRoU1NSLmRpc3BsYXlOYW1lID0gYHdpdGhJMThuZXh0U1NSKCR7Z2V0RGlzcGxheU5hbWUoV3JhcHBlZENvbXBvbmVudCl9KWA7XG4gICAgSTE4bmV4dFdpdGhTU1IuV3JhcHBlZENvbXBvbmVudCA9IFdyYXBwZWRDb21wb25lbnQ7XG4gICAgcmV0dXJuIEkxOG5leHRXaXRoU1NSO1xuICB9O1xufSIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGZvcndhcmRSZWYgYXMgZm9yd2FyZFJlZlJlYWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlVHJhbnNsYXRpb24gfSBmcm9tICcuL3VzZVRyYW5zbGF0aW9uLmpzJztcbmltcG9ydCB7IGdldERpc3BsYXlOYW1lIH0gZnJvbSAnLi91dGlscy5qcyc7XG5leHBvcnQgZnVuY3Rpb24gd2l0aFRyYW5zbGF0aW9uKG5zKSB7XG4gIGxldCBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uIEV4dGVuZChXcmFwcGVkQ29tcG9uZW50KSB7XG4gICAgZnVuY3Rpb24gSTE4bmV4dFdpdGhUcmFuc2xhdGlvbihfcmVmKSB7XG4gICAgICBsZXQge1xuICAgICAgICBmb3J3YXJkZWRSZWYsXG4gICAgICAgIC4uLnJlc3RcbiAgICAgIH0gPSBfcmVmO1xuICAgICAgY29uc3QgW3QsIGkxOG4sIHJlYWR5XSA9IHVzZVRyYW5zbGF0aW9uKG5zLCB7XG4gICAgICAgIC4uLnJlc3QsXG4gICAgICAgIGtleVByZWZpeDogb3B0aW9ucy5rZXlQcmVmaXhcbiAgICAgIH0pO1xuICAgICAgY29uc3QgcGFzc0Rvd25Qcm9wcyA9IHtcbiAgICAgICAgLi4ucmVzdCxcbiAgICAgICAgdCxcbiAgICAgICAgaTE4bixcbiAgICAgICAgdFJlYWR5OiByZWFkeVxuICAgICAgfTtcbiAgICAgIGlmIChvcHRpb25zLndpdGhSZWYgJiYgZm9yd2FyZGVkUmVmKSB7XG4gICAgICAgIHBhc3NEb3duUHJvcHMucmVmID0gZm9yd2FyZGVkUmVmO1xuICAgICAgfSBlbHNlIGlmICghb3B0aW9ucy53aXRoUmVmICYmIGZvcndhcmRlZFJlZikge1xuICAgICAgICBwYXNzRG93blByb3BzLmZvcndhcmRlZFJlZiA9IGZvcndhcmRlZFJlZjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjcmVhdGVFbGVtZW50KFdyYXBwZWRDb21wb25lbnQsIHBhc3NEb3duUHJvcHMpO1xuICAgIH1cbiAgICBJMThuZXh0V2l0aFRyYW5zbGF0aW9uLmRpc3BsYXlOYW1lID0gYHdpdGhJMThuZXh0VHJhbnNsYXRpb24oJHtnZXREaXNwbGF5TmFtZShXcmFwcGVkQ29tcG9uZW50KX0pYDtcbiAgICBJMThuZXh0V2l0aFRyYW5zbGF0aW9uLldyYXBwZWRDb21wb25lbnQgPSBXcmFwcGVkQ29tcG9uZW50O1xuICAgIGNvbnN0IGZvcndhcmRSZWYgPSAocHJvcHMsIHJlZikgPT4gY3JlYXRlRWxlbWVudChJMThuZXh0V2l0aFRyYW5zbGF0aW9uLCBPYmplY3QuYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgZm9yd2FyZGVkUmVmOiByZWZcbiAgICB9KSk7XG4gICAgcmV0dXJuIG9wdGlvbnMud2l0aFJlZiA/IGZvcndhcmRSZWZSZWFjdChmb3J3YXJkUmVmKSA6IEkxOG5leHRXaXRoVHJhbnNsYXRpb247XG4gIH07XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9