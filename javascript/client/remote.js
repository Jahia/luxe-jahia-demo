/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/index.js":
/*!*****************************!*\
  !*** ./src/client/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// PublicPath is used to make webpack able to download the chunks and assets from the correct location
// Since JS can be aggregated by Jahia on live, the path of the original file is lost
// Also the context of the server should be handled properly
// eslint-disable-next-line camelcase, no-undef
__webpack_require__.p = `${window.__APPSHELL_INIT_DATA__.moduleBaseUrl}/luxe-jahia-demo/javascript/client/`;

/***/ }),

/***/ "webpack/container/entry/luxe-jahia-demo":
/*!***********************!*\
  !*** container entry ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var moduleMap = {
	"LoginComponent": () => {
		return Promise.all([__webpack_require__.e("webpack_sharing_consume_default_react_react"), __webpack_require__.e("webpack_sharing_consume_default_react-i18next_react-i18next"), __webpack_require__.e("src_client_WorkspaceNavigation_jsx"), __webpack_require__.e("src_client_LoginComponent_jsx")]).then(() => (() => ((__webpack_require__(/*! ./src/client/LoginComponent.jsx */ "./src/client/LoginComponent.jsx")))));
	},
	"LoginForm": () => {
		return Promise.all([__webpack_require__.e("webpack_sharing_consume_default_react_react"), __webpack_require__.e("webpack_sharing_consume_default_react-i18next_react-i18next"), __webpack_require__.e("src_client_LoginForm_jsx")]).then(() => (() => ((__webpack_require__(/*! ./src/client/LoginForm.jsx */ "./src/client/LoginForm.jsx")))));
	},
	"WorkspaceNavigation": () => {
		return Promise.all([__webpack_require__.e("webpack_sharing_consume_default_react_react"), __webpack_require__.e("webpack_sharing_consume_default_react-i18next_react-i18next"), __webpack_require__.e("src_client_WorkspaceNavigation_jsx")]).then(() => (() => ((__webpack_require__(/*! ./src/client/WorkspaceNavigation.jsx */ "./src/client/WorkspaceNavigation.jsx")))));
	},
	"index": () => {
		return Promise.resolve().then(() => (() => ((__webpack_require__(/*! ./src/client/index.js */ "./src/client/index.js")))));
	}
};
var get = (module, getScope) => {
	__webpack_require__.R = getScope;
	getScope = (
		__webpack_require__.o(moduleMap, module)
			? moduleMap[module]()
			: Promise.resolve().then(() => {
				throw new Error('Module "' + module + '" does not exist in container.');
			})
	);
	__webpack_require__.R = undefined;
	return getScope;
};
var init = (shareScope, initScope) => {
	if (!__webpack_require__.S) return;
	var name = "default"
	var oldScope = __webpack_require__.S[name];
	if(oldScope && oldScope !== shareScope) throw new Error("Container initialization failed as it has already been initialized with a different share scope");
	__webpack_require__.S[name] = shareScope;
	return __webpack_require__.I(name, initScope);
};

// This exports getters to disallow modifications
__webpack_require__.d(exports, {
	get: () => (get),
	init: () => (init)
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "luxe-jahia-demo:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/sharing */
/******/ 	(() => {
/******/ 		__webpack_require__.S = {};
/******/ 		var initPromises = {};
/******/ 		var initTokens = {};
/******/ 		__webpack_require__.I = (name, initScope) => {
/******/ 			if(!initScope) initScope = [];
/******/ 			// handling circular init calls
/******/ 			var initToken = initTokens[name];
/******/ 			if(!initToken) initToken = initTokens[name] = {};
/******/ 			if(initScope.indexOf(initToken) >= 0) return;
/******/ 			initScope.push(initToken);
/******/ 			// only runs once
/******/ 			if(initPromises[name]) return initPromises[name];
/******/ 			// creates a new share scope if needed
/******/ 			if(!__webpack_require__.o(__webpack_require__.S, name)) __webpack_require__.S[name] = {};
/******/ 			// runs all init snippets from all modules reachable
/******/ 			var scope = __webpack_require__.S[name];
/******/ 			var warn = (msg) => {
/******/ 				if (typeof console !== "undefined" && console.warn) console.warn(msg);
/******/ 			};
/******/ 			var uniqueName = "luxe-jahia-demo";
/******/ 			var register = (name, version, factory, eager) => {
/******/ 				var versions = scope[name] = scope[name] || {};
/******/ 				var activeVersion = versions[version];
/******/ 				if(!activeVersion || (!activeVersion.loaded && (!eager != !activeVersion.eager ? eager : uniqueName > activeVersion.from))) versions[version] = { get: factory, from: uniqueName, eager: !!eager };
/******/ 			};
/******/ 			var initExternal = (id) => {
/******/ 				var handleError = (err) => (warn("Initialization of sharing external failed: " + err));
/******/ 				try {
/******/ 					var module = __webpack_require__(id);
/******/ 					if(!module) return;
/******/ 					var initFn = (module) => (module && module.init && module.init(__webpack_require__.S[name], initScope))
/******/ 					if(module.then) return promises.push(module.then(initFn, handleError));
/******/ 					var initResult = initFn(module);
/******/ 					if(initResult && initResult.then) return promises.push(initResult['catch'](handleError));
/******/ 				} catch(err) { handleError(err); }
/******/ 			}
/******/ 			var promises = [];
/******/ 			switch(name) {
/******/ 				case "default": {
/******/ 					register("react-i18next", "14.1.0", () => (Promise.all([__webpack_require__.e("vendors-_yarn___virtual___react-i18next-virtual-3c81fa4790_3_yarn_berry_cache_react-i18next-n-56df67"), __webpack_require__.e("webpack_sharing_consume_default_react_react")]).then(() => (() => (__webpack_require__(/*! ./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/index.js */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/index.js"))))));
/******/ 					register("react", "17.0.2", () => (__webpack_require__.e("vendors-_yarn_berry_cache_react-npm-17_0_2-99ba37d931-10c0_zip_node_modules_react_index_js").then(() => (() => (__webpack_require__(/*! ../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js */ "../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js"))))));
/******/ 				}
/******/ 				break;
/******/ 			}
/******/ 			if(!promises.length) return initPromises[name] = 1;
/******/ 			return initPromises[name] = Promise.all(promises).then(() => (initPromises[name] = 1));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../client/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/consumes */
/******/ 	(() => {
/******/ 		var parseVersion = (str) => {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			var p=p=>{return p.split(".").map((p=>{return+p==p?+p:p}))},n=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(str),r=n[1]?p(n[1]):[];return n[2]&&(r.length++,r.push.apply(r,p(n[2]))),n[3]&&(r.push([]),r.push.apply(r,p(n[3]))),r;
/******/ 		}
/******/ 		var versionLt = (a, b) => {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			a=parseVersion(a),b=parseVersion(b);for(var r=0;;){if(r>=a.length)return r<b.length&&"u"!=(typeof b[r])[0];var e=a[r],n=(typeof e)[0];if(r>=b.length)return"u"==n;var t=b[r],f=(typeof t)[0];if(n!=f)return"o"==n&&"n"==f||("s"==f||"u"==n);if("o"!=n&&"u"!=n&&e!=t)return e<t;r++}
/******/ 		}
/******/ 		var rangeToString = (range) => {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			var r=range[0],n="";if(1===range.length)return"*";if(r+.5){n+=0==r?">=":-1==r?"<":1==r?"^":2==r?"~":r>0?"=":"!=";for(var e=1,a=1;a<range.length;a++){e--,n+="u"==(typeof(t=range[a]))[0]?"-":(e>0?".":"")+(e=2,t)}return n}var g=[];for(a=1;a<range.length;a++){var t=range[a];g.push(0===t?"not("+o()+")":1===t?"("+o()+" || "+o()+")":2===t?g.pop()+" "+g.pop():rangeToString(t))}return o();function o(){return g.pop().replace(/^\((.+)\)$/,"$1")}
/******/ 		}
/******/ 		var satisfy = (range, version) => {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			if(0 in range){version=parseVersion(version);var e=range[0],r=e<0;r&&(e=-e-1);for(var n=0,i=1,a=!0;;i++,n++){var f,s,g=i<range.length?(typeof range[i])[0]:"";if(n>=version.length||"o"==(s=(typeof(f=version[n]))[0]))return!a||("u"==g?i>e&&!r:""==g!=r);if("u"==s){if(!a||"u"!=g)return!1}else if(a)if(g==s)if(i<=e){if(f!=range[i])return!1}else{if(r?f>range[i]:f<range[i])return!1;f!=range[i]&&(a=!1)}else if("s"!=g&&"n"!=g){if(r||i<=e)return!1;a=!1,i--}else{if(i<=e||s<g!=r)return!1;a=!1}else"s"!=g&&"n"!=g&&(a=!1,i--)}}var t=[],o=t.pop.bind(t);for(n=1;n<range.length;n++){var u=range[n];t.push(1==u?o()|o():2==u?o()&o():u?satisfy(u,version):!o())}return!!o();
/******/ 		}
/******/ 		var ensureExistence = (scopeName, key) => {
/******/ 			var scope = __webpack_require__.S[scopeName];
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) throw new Error("Shared module " + key + " doesn't exist in shared scope " + scopeName);
/******/ 			return scope;
/******/ 		};
/******/ 		var findVersion = (scope, key) => {
/******/ 			var versions = scope[key];
/******/ 			var key = Object.keys(versions).reduce((a, b) => {
/******/ 				return !a || versionLt(a, b) ? b : a;
/******/ 			}, 0);
/******/ 			return key && versions[key]
/******/ 		};
/******/ 		var findSingletonVersionKey = (scope, key) => {
/******/ 			var versions = scope[key];
/******/ 			return Object.keys(versions).reduce((a, b) => {
/******/ 				return !a || (!versions[a].loaded && versionLt(a, b)) ? b : a;
/******/ 			}, 0);
/******/ 		};
/******/ 		var getInvalidSingletonVersionMessage = (scope, key, version, requiredVersion) => {
/******/ 			return "Unsatisfied version " + version + " from " + (version && scope[key][version].from) + " of shared singleton module " + key + " (required " + rangeToString(requiredVersion) + ")"
/******/ 		};
/******/ 		var getSingleton = (scope, scopeName, key, requiredVersion) => {
/******/ 			var version = findSingletonVersionKey(scope, key);
/******/ 			return get(scope[key][version]);
/******/ 		};
/******/ 		var getSingletonVersion = (scope, scopeName, key, requiredVersion) => {
/******/ 			var version = findSingletonVersionKey(scope, key);
/******/ 			if (!satisfy(requiredVersion, version)) warn(getInvalidSingletonVersionMessage(scope, key, version, requiredVersion));
/******/ 			return get(scope[key][version]);
/******/ 		};
/******/ 		var getStrictSingletonVersion = (scope, scopeName, key, requiredVersion) => {
/******/ 			var version = findSingletonVersionKey(scope, key);
/******/ 			if (!satisfy(requiredVersion, version)) throw new Error(getInvalidSingletonVersionMessage(scope, key, version, requiredVersion));
/******/ 			return get(scope[key][version]);
/******/ 		};
/******/ 		var findValidVersion = (scope, key, requiredVersion) => {
/******/ 			var versions = scope[key];
/******/ 			var key = Object.keys(versions).reduce((a, b) => {
/******/ 				if (!satisfy(requiredVersion, b)) return a;
/******/ 				return !a || versionLt(a, b) ? b : a;
/******/ 			}, 0);
/******/ 			return key && versions[key]
/******/ 		};
/******/ 		var getInvalidVersionMessage = (scope, scopeName, key, requiredVersion) => {
/******/ 			var versions = scope[key];
/******/ 			return "No satisfying version (" + rangeToString(requiredVersion) + ") of shared module " + key + " found in shared scope " + scopeName + ".\n" +
/******/ 				"Available versions: " + Object.keys(versions).map((key) => {
/******/ 				return key + " from " + versions[key].from;
/******/ 			}).join(", ");
/******/ 		};
/******/ 		var getValidVersion = (scope, scopeName, key, requiredVersion) => {
/******/ 			var entry = findValidVersion(scope, key, requiredVersion);
/******/ 			if(entry) return get(entry);
/******/ 			throw new Error(getInvalidVersionMessage(scope, scopeName, key, requiredVersion));
/******/ 		};
/******/ 		var warn = (msg) => {
/******/ 			if (typeof console !== "undefined" && console.warn) console.warn(msg);
/******/ 		};
/******/ 		var warnInvalidVersion = (scope, scopeName, key, requiredVersion) => {
/******/ 			warn(getInvalidVersionMessage(scope, scopeName, key, requiredVersion));
/******/ 		};
/******/ 		var get = (entry) => {
/******/ 			entry.loaded = 1;
/******/ 			return entry.get()
/******/ 		};
/******/ 		var init = (fn) => (function(scopeName, a, b, c) {
/******/ 			var promise = __webpack_require__.I(scopeName);
/******/ 			if (promise && promise.then) return promise.then(fn.bind(fn, scopeName, __webpack_require__.S[scopeName], a, b, c));
/******/ 			return fn(scopeName, __webpack_require__.S[scopeName], a, b, c);
/******/ 		});
/******/ 		
/******/ 		var load = /*#__PURE__*/ init((scopeName, scope, key) => {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return get(findVersion(scope, key));
/******/ 		});
/******/ 		var loadFallback = /*#__PURE__*/ init((scopeName, scope, key, fallback) => {
/******/ 			return scope && __webpack_require__.o(scope, key) ? get(findVersion(scope, key)) : fallback();
/******/ 		});
/******/ 		var loadVersionCheck = /*#__PURE__*/ init((scopeName, scope, key, version) => {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return get(findValidVersion(scope, key, version) || warnInvalidVersion(scope, scopeName, key, version) || findVersion(scope, key));
/******/ 		});
/******/ 		var loadSingleton = /*#__PURE__*/ init((scopeName, scope, key) => {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return getSingleton(scope, scopeName, key);
/******/ 		});
/******/ 		var loadSingletonVersionCheck = /*#__PURE__*/ init((scopeName, scope, key, version) => {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return getSingletonVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var loadStrictVersionCheck = /*#__PURE__*/ init((scopeName, scope, key, version) => {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return getValidVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var loadStrictSingletonVersionCheck = /*#__PURE__*/ init((scopeName, scope, key, version) => {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return getStrictSingletonVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var loadVersionCheckFallback = /*#__PURE__*/ init((scopeName, scope, key, version, fallback) => {
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) return fallback();
/******/ 			return get(findValidVersion(scope, key, version) || warnInvalidVersion(scope, scopeName, key, version) || findVersion(scope, key));
/******/ 		});
/******/ 		var loadSingletonFallback = /*#__PURE__*/ init((scopeName, scope, key, fallback) => {
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) return fallback();
/******/ 			return getSingleton(scope, scopeName, key);
/******/ 		});
/******/ 		var loadSingletonVersionCheckFallback = /*#__PURE__*/ init((scopeName, scope, key, version, fallback) => {
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) return fallback();
/******/ 			return getSingletonVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var loadStrictVersionCheckFallback = /*#__PURE__*/ init((scopeName, scope, key, version, fallback) => {
/******/ 			var entry = scope && __webpack_require__.o(scope, key) && findValidVersion(scope, key, version);
/******/ 			return entry ? get(entry) : fallback();
/******/ 		});
/******/ 		var loadStrictSingletonVersionCheckFallback = /*#__PURE__*/ init((scopeName, scope, key, version, fallback) => {
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) return fallback();
/******/ 			return getStrictSingletonVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var installedModules = {};
/******/ 		var moduleToHandlerMapping = {
/******/ 			"webpack/sharing/consume/default/react/react": () => (loadSingletonVersionCheckFallback("default", "react", [1,18,2,0], () => (__webpack_require__.e("vendors-_yarn_berry_cache_react-npm-17_0_2-99ba37d931-10c0_zip_node_modules_react_index_js").then(() => (() => (__webpack_require__(/*! react */ "../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js"))))))),
/******/ 			"webpack/sharing/consume/default/react-i18next/react-i18next": () => (loadStrictVersionCheckFallback("default", "react-i18next", [1,14,1,0], () => (__webpack_require__.e("vendors-_yarn___virtual___react-i18next-virtual-3c81fa4790_3_yarn_berry_cache_react-i18next-n-56df67").then(() => (() => (__webpack_require__(/*! react-i18next */ "./.yarn/__virtual__/react-i18next-virtual-3c81fa4790/3/.yarn/berry/cache/react-i18next-npm-14.1.0-0b9122ff30-10c0.zip/node_modules/react-i18next/dist/es/index.js")))))))
/******/ 		};
/******/ 		// no consumes in initial chunks
/******/ 		var chunkMapping = {
/******/ 			"webpack_sharing_consume_default_react_react": [
/******/ 				"webpack/sharing/consume/default/react/react"
/******/ 			],
/******/ 			"webpack_sharing_consume_default_react-i18next_react-i18next": [
/******/ 				"webpack/sharing/consume/default/react-i18next/react-i18next"
/******/ 			]
/******/ 		};
/******/ 		var startedInstallModules = {};
/******/ 		__webpack_require__.f.consumes = (chunkId, promises) => {
/******/ 			if(__webpack_require__.o(chunkMapping, chunkId)) {
/******/ 				chunkMapping[chunkId].forEach((id) => {
/******/ 					if(__webpack_require__.o(installedModules, id)) return promises.push(installedModules[id]);
/******/ 					if(!startedInstallModules[id]) {
/******/ 					var onFactory = (factory) => {
/******/ 						installedModules[id] = 0;
/******/ 						__webpack_require__.m[id] = (module) => {
/******/ 							delete __webpack_require__.c[id];
/******/ 							module.exports = factory();
/******/ 						}
/******/ 					};
/******/ 					startedInstallModules[id] = true;
/******/ 					var onError = (error) => {
/******/ 						delete installedModules[id];
/******/ 						__webpack_require__.m[id] = (module) => {
/******/ 							delete __webpack_require__.c[id];
/******/ 							throw error;
/******/ 						}
/******/ 					};
/******/ 					try {
/******/ 						var promise = moduleToHandlerMapping[id]();
/******/ 						if(promise.then) {
/******/ 							promises.push(installedModules[id] = promise.then(onFactory)['catch'](onError));
/******/ 						} else onFactory(promise);
/******/ 					} catch(e) { onError(e); }
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"luxe-jahia-demo": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(!/^webpack_sharing_consume_default_react(\-i18next_react\-i18nex|_reac)t$/.test(chunkId)) {
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkluxe_jahia_demo"] = self["webpackChunkluxe_jahia_demo"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./src/client/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("webpack/container/entry/luxe-jahia-demo");
/******/ 	window.appShell = (typeof appShell === "undefined" ? {} : appShell); window.appShell['luxe-jahia-demo'] = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTTtXQUNOLEtBQUssV0FBVztXQUNoQjtXQUNBLEdBQUc7V0FDSDtXQUNBOzs7OztXQ2xMQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDOztXQUVqQztXQUNBO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU07V0FDTjtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVyRkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x1eGUtamFoaWEtZGVtby8uL3NyYy9jbGllbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbHV4ZS1qYWhpYS1kZW1vL3dlYnBhY2svY29udGFpbmVyLWVudHJ5Iiwid2VicGFjazovL2x1eGUtamFoaWEtZGVtby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbHV4ZS1qYWhpYS1kZW1vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL2x1eGUtamFoaWEtZGVtby93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2x1eGUtamFoaWEtZGVtby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2x1eGUtamFoaWEtZGVtby93ZWJwYWNrL3J1bnRpbWUvbG9hZCBzY3JpcHQiLCJ3ZWJwYWNrOi8vbHV4ZS1qYWhpYS1kZW1vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHV4ZS1qYWhpYS1kZW1vL3dlYnBhY2svcnVudGltZS9zaGFyaW5nIiwid2VicGFjazovL2x1eGUtamFoaWEtZGVtby93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vd2VicGFjay9ydW50aW1lL2NvbnN1bWVzIiwid2VicGFjazovL2x1eGUtamFoaWEtZGVtby93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2x1eGUtamFoaWEtZGVtby93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gUHVibGljUGF0aCBpcyB1c2VkIHRvIG1ha2Ugd2VicGFjayBhYmxlIHRvIGRvd25sb2FkIHRoZSBjaHVua3MgYW5kIGFzc2V0cyBmcm9tIHRoZSBjb3JyZWN0IGxvY2F0aW9uXG4vLyBTaW5jZSBKUyBjYW4gYmUgYWdncmVnYXRlZCBieSBKYWhpYSBvbiBsaXZlLCB0aGUgcGF0aCBvZiB0aGUgb3JpZ2luYWwgZmlsZSBpcyBsb3N0XG4vLyBBbHNvIHRoZSBjb250ZXh0IG9mIHRoZSBzZXJ2ZXIgc2hvdWxkIGJlIGhhbmRsZWQgcHJvcGVybHlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2UsIG5vLXVuZGVmXG5fX3dlYnBhY2tfcHVibGljX3BhdGhfXyA9IGAke3dpbmRvdy5fX0FQUFNIRUxMX0lOSVRfREFUQV9fLm1vZHVsZUJhc2VVcmx9L2x1eGUtamFoaWEtZGVtby9qYXZhc2NyaXB0L2NsaWVudC9gOyIsInZhciBtb2R1bGVNYXAgPSB7XG5cdFwiTG9naW5Db21wb25lbnRcIjogKCkgPT4ge1xuXHRcdHJldHVybiBQcm9taXNlLmFsbChbX193ZWJwYWNrX3JlcXVpcmVfXy5lKFwid2VicGFja19zaGFyaW5nX2NvbnN1bWVfZGVmYXVsdF9yZWFjdF9yZWFjdFwiKSwgX193ZWJwYWNrX3JlcXVpcmVfXy5lKFwid2VicGFja19zaGFyaW5nX2NvbnN1bWVfZGVmYXVsdF9yZWFjdC1pMThuZXh0X3JlYWN0LWkxOG5leHRcIiksIF9fd2VicGFja19yZXF1aXJlX18uZShcInNyY19jbGllbnRfV29ya3NwYWNlTmF2aWdhdGlvbl9qc3hcIiksIF9fd2VicGFja19yZXF1aXJlX18uZShcInNyY19jbGllbnRfTG9naW5Db21wb25lbnRfanN4XCIpXSkudGhlbigoKSA9PiAoKCkgPT4gKChfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL3NyYy9jbGllbnQvTG9naW5Db21wb25lbnQuanN4ICovIFwiLi9zcmMvY2xpZW50L0xvZ2luQ29tcG9uZW50LmpzeFwiKSkpKSk7XG5cdH0sXG5cdFwiTG9naW5Gb3JtXCI6ICgpID0+IHtcblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoW19fd2VicGFja19yZXF1aXJlX18uZShcIndlYnBhY2tfc2hhcmluZ19jb25zdW1lX2RlZmF1bHRfcmVhY3RfcmVhY3RcIiksIF9fd2VicGFja19yZXF1aXJlX18uZShcIndlYnBhY2tfc2hhcmluZ19jb25zdW1lX2RlZmF1bHRfcmVhY3QtaTE4bmV4dF9yZWFjdC1pMThuZXh0XCIpLCBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoXCJzcmNfY2xpZW50X0xvZ2luRm9ybV9qc3hcIildKS50aGVuKCgpID0+ICgoKSA9PiAoKF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vc3JjL2NsaWVudC9Mb2dpbkZvcm0uanN4ICovIFwiLi9zcmMvY2xpZW50L0xvZ2luRm9ybS5qc3hcIikpKSkpO1xuXHR9LFxuXHRcIldvcmtzcGFjZU5hdmlnYXRpb25cIjogKCkgPT4ge1xuXHRcdHJldHVybiBQcm9taXNlLmFsbChbX193ZWJwYWNrX3JlcXVpcmVfXy5lKFwid2VicGFja19zaGFyaW5nX2NvbnN1bWVfZGVmYXVsdF9yZWFjdF9yZWFjdFwiKSwgX193ZWJwYWNrX3JlcXVpcmVfXy5lKFwid2VicGFja19zaGFyaW5nX2NvbnN1bWVfZGVmYXVsdF9yZWFjdC1pMThuZXh0X3JlYWN0LWkxOG5leHRcIiksIF9fd2VicGFja19yZXF1aXJlX18uZShcInNyY19jbGllbnRfV29ya3NwYWNlTmF2aWdhdGlvbl9qc3hcIildKS50aGVuKCgpID0+ICgoKSA9PiAoKF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vc3JjL2NsaWVudC9Xb3Jrc3BhY2VOYXZpZ2F0aW9uLmpzeCAqLyBcIi4vc3JjL2NsaWVudC9Xb3Jrc3BhY2VOYXZpZ2F0aW9uLmpzeFwiKSkpKSk7XG5cdH0sXG5cdFwiaW5kZXhcIjogKCkgPT4ge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+ICgoKSA9PiAoKF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vc3JjL2NsaWVudC9pbmRleC5qcyAqLyBcIi4vc3JjL2NsaWVudC9pbmRleC5qc1wiKSkpKSk7XG5cdH1cbn07XG52YXIgZ2V0ID0gKG1vZHVsZSwgZ2V0U2NvcGUpID0+IHtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5SID0gZ2V0U2NvcGU7XG5cdGdldFNjb3BlID0gKFxuXHRcdF9fd2VicGFja19yZXF1aXJlX18ubyhtb2R1bGVNYXAsIG1vZHVsZSlcblx0XHRcdD8gbW9kdWxlTWFwW21vZHVsZV0oKVxuXHRcdFx0OiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNb2R1bGUgXCInICsgbW9kdWxlICsgJ1wiIGRvZXMgbm90IGV4aXN0IGluIGNvbnRhaW5lci4nKTtcblx0XHRcdH0pXG5cdCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uUiA9IHVuZGVmaW5lZDtcblx0cmV0dXJuIGdldFNjb3BlO1xufTtcbnZhciBpbml0ID0gKHNoYXJlU2NvcGUsIGluaXRTY29wZSkgPT4ge1xuXHRpZiAoIV9fd2VicGFja19yZXF1aXJlX18uUykgcmV0dXJuO1xuXHR2YXIgbmFtZSA9IFwiZGVmYXVsdFwiXG5cdHZhciBvbGRTY29wZSA9IF9fd2VicGFja19yZXF1aXJlX18uU1tuYW1lXTtcblx0aWYob2xkU2NvcGUgJiYgb2xkU2NvcGUgIT09IHNoYXJlU2NvcGUpIHRocm93IG5ldyBFcnJvcihcIkNvbnRhaW5lciBpbml0aWFsaXphdGlvbiBmYWlsZWQgYXMgaXQgaGFzIGFscmVhZHkgYmVlbiBpbml0aWFsaXplZCB3aXRoIGEgZGlmZmVyZW50IHNoYXJlIHNjb3BlXCIpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLlNbbmFtZV0gPSBzaGFyZVNjb3BlO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5JKG5hbWUsIGluaXRTY29wZSk7XG59O1xuXG4vLyBUaGlzIGV4cG9ydHMgZ2V0dGVycyB0byBkaXNhbGxvdyBtb2RpZmljYXRpb25zXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQoZXhwb3J0cywge1xuXHRnZXQ6ICgpID0+IChnZXQpLFxuXHRpbml0OiAoKSA9PiAoaW5pdClcbn0pOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuLy8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbl9fd2VicGFja19yZXF1aXJlX18uYyA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmYgPSB7fTtcbi8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKGNodW5rSWQpID0+IHtcblx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uZikucmVkdWNlKChwcm9taXNlcywga2V5KSA9PiB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mW2tleV0oY2h1bmtJZCwgcHJvbWlzZXMpO1xuXHRcdHJldHVybiBwcm9taXNlcztcblx0fSwgW10pKTtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwiXCIgKyBjaHVua0lkICsgXCIuanNcIjtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwidmFyIGluUHJvZ3Jlc3MgPSB7fTtcbnZhciBkYXRhV2VicGFja1ByZWZpeCA9IFwibHV4ZS1qYWhpYS1kZW1vOlwiO1xuLy8gbG9hZFNjcmlwdCBmdW5jdGlvbiB0byBsb2FkIGEgc2NyaXB0IHZpYSBzY3JpcHQgdGFnXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmwgPSAodXJsLCBkb25lLCBrZXksIGNodW5rSWQpID0+IHtcblx0aWYoaW5Qcm9ncmVzc1t1cmxdKSB7IGluUHJvZ3Jlc3NbdXJsXS5wdXNoKGRvbmUpOyByZXR1cm47IH1cblx0dmFyIHNjcmlwdCwgbmVlZEF0dGFjaDtcblx0aWYoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgcyA9IHNjcmlwdHNbaV07XG5cdFx0XHRpZihzLmdldEF0dHJpYnV0ZShcInNyY1wiKSA9PSB1cmwgfHwgcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIikgPT0gZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpIHsgc2NyaXB0ID0gczsgYnJlYWs7IH1cblx0XHR9XG5cdH1cblx0aWYoIXNjcmlwdCkge1xuXHRcdG5lZWRBdHRhY2ggPSB0cnVlO1xuXHRcdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG5cdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuXHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG5cdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG5cdFx0fVxuXHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIiwgZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpO1xuXG5cdFx0c2NyaXB0LnNyYyA9IHVybDtcblx0fVxuXHRpblByb2dyZXNzW3VybF0gPSBbZG9uZV07XG5cdHZhciBvblNjcmlwdENvbXBsZXRlID0gKHByZXYsIGV2ZW50KSA9PiB7XG5cdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuXHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHZhciBkb25lRm5zID0gaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdGRlbGV0ZSBpblByb2dyZXNzW3VybF07XG5cdFx0c2NyaXB0LnBhcmVudE5vZGUgJiYgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblx0XHRkb25lRm5zICYmIGRvbmVGbnMuZm9yRWFjaCgoZm4pID0+IChmbihldmVudCkpKTtcblx0XHRpZihwcmV2KSByZXR1cm4gcHJldihldmVudCk7XG5cdH1cblx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCB1bmRlZmluZWQsIHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KSwgMTIwMDAwKTtcblx0c2NyaXB0Lm9uZXJyb3IgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9uZXJyb3IpO1xuXHRzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmxvYWQpO1xuXHRuZWVkQXR0YWNoICYmIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbn07IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5TID0ge307XG52YXIgaW5pdFByb21pc2VzID0ge307XG52YXIgaW5pdFRva2VucyA9IHt9O1xuX193ZWJwYWNrX3JlcXVpcmVfXy5JID0gKG5hbWUsIGluaXRTY29wZSkgPT4ge1xuXHRpZighaW5pdFNjb3BlKSBpbml0U2NvcGUgPSBbXTtcblx0Ly8gaGFuZGxpbmcgY2lyY3VsYXIgaW5pdCBjYWxsc1xuXHR2YXIgaW5pdFRva2VuID0gaW5pdFRva2Vuc1tuYW1lXTtcblx0aWYoIWluaXRUb2tlbikgaW5pdFRva2VuID0gaW5pdFRva2Vuc1tuYW1lXSA9IHt9O1xuXHRpZihpbml0U2NvcGUuaW5kZXhPZihpbml0VG9rZW4pID49IDApIHJldHVybjtcblx0aW5pdFNjb3BlLnB1c2goaW5pdFRva2VuKTtcblx0Ly8gb25seSBydW5zIG9uY2Vcblx0aWYoaW5pdFByb21pc2VzW25hbWVdKSByZXR1cm4gaW5pdFByb21pc2VzW25hbWVdO1xuXHQvLyBjcmVhdGVzIGEgbmV3IHNoYXJlIHNjb3BlIGlmIG5lZWRlZFxuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKF9fd2VicGFja19yZXF1aXJlX18uUywgbmFtZSkpIF9fd2VicGFja19yZXF1aXJlX18uU1tuYW1lXSA9IHt9O1xuXHQvLyBydW5zIGFsbCBpbml0IHNuaXBwZXRzIGZyb20gYWxsIG1vZHVsZXMgcmVhY2hhYmxlXG5cdHZhciBzY29wZSA9IF9fd2VicGFja19yZXF1aXJlX18uU1tuYW1lXTtcblx0dmFyIHdhcm4gPSAobXNnKSA9PiB7XG5cdFx0aWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKG1zZyk7XG5cdH07XG5cdHZhciB1bmlxdWVOYW1lID0gXCJsdXhlLWphaGlhLWRlbW9cIjtcblx0dmFyIHJlZ2lzdGVyID0gKG5hbWUsIHZlcnNpb24sIGZhY3RvcnksIGVhZ2VyKSA9PiB7XG5cdFx0dmFyIHZlcnNpb25zID0gc2NvcGVbbmFtZV0gPSBzY29wZVtuYW1lXSB8fCB7fTtcblx0XHR2YXIgYWN0aXZlVmVyc2lvbiA9IHZlcnNpb25zW3ZlcnNpb25dO1xuXHRcdGlmKCFhY3RpdmVWZXJzaW9uIHx8ICghYWN0aXZlVmVyc2lvbi5sb2FkZWQgJiYgKCFlYWdlciAhPSAhYWN0aXZlVmVyc2lvbi5lYWdlciA/IGVhZ2VyIDogdW5pcXVlTmFtZSA+IGFjdGl2ZVZlcnNpb24uZnJvbSkpKSB2ZXJzaW9uc1t2ZXJzaW9uXSA9IHsgZ2V0OiBmYWN0b3J5LCBmcm9tOiB1bmlxdWVOYW1lLCBlYWdlcjogISFlYWdlciB9O1xuXHR9O1xuXHR2YXIgaW5pdEV4dGVybmFsID0gKGlkKSA9PiB7XG5cdFx0dmFyIGhhbmRsZUVycm9yID0gKGVycikgPT4gKHdhcm4oXCJJbml0aWFsaXphdGlvbiBvZiBzaGFyaW5nIGV4dGVybmFsIGZhaWxlZDogXCIgKyBlcnIpKTtcblx0XHR0cnkge1xuXHRcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xuXHRcdFx0aWYoIW1vZHVsZSkgcmV0dXJuO1xuXHRcdFx0dmFyIGluaXRGbiA9IChtb2R1bGUpID0+IChtb2R1bGUgJiYgbW9kdWxlLmluaXQgJiYgbW9kdWxlLmluaXQoX193ZWJwYWNrX3JlcXVpcmVfXy5TW25hbWVdLCBpbml0U2NvcGUpKVxuXHRcdFx0aWYobW9kdWxlLnRoZW4pIHJldHVybiBwcm9taXNlcy5wdXNoKG1vZHVsZS50aGVuKGluaXRGbiwgaGFuZGxlRXJyb3IpKTtcblx0XHRcdHZhciBpbml0UmVzdWx0ID0gaW5pdEZuKG1vZHVsZSk7XG5cdFx0XHRpZihpbml0UmVzdWx0ICYmIGluaXRSZXN1bHQudGhlbikgcmV0dXJuIHByb21pc2VzLnB1c2goaW5pdFJlc3VsdFsnY2F0Y2gnXShoYW5kbGVFcnJvcikpO1xuXHRcdH0gY2F0Y2goZXJyKSB7IGhhbmRsZUVycm9yKGVycik7IH1cblx0fVxuXHR2YXIgcHJvbWlzZXMgPSBbXTtcblx0c3dpdGNoKG5hbWUpIHtcblx0XHRjYXNlIFwiZGVmYXVsdFwiOiB7XG5cdFx0XHRyZWdpc3RlcihcInJlYWN0LWkxOG5leHRcIiwgXCIxNC4xLjBcIiwgKCkgPT4gKFByb21pc2UuYWxsKFtfX3dlYnBhY2tfcmVxdWlyZV9fLmUoXCJ2ZW5kb3JzLV95YXJuX19fdmlydHVhbF9fX3JlYWN0LWkxOG5leHQtdmlydHVhbC0zYzgxZmE0NzkwXzNfeWFybl9iZXJyeV9jYWNoZV9yZWFjdC1pMThuZXh0LW4tNTZkZjY3XCIpLCBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoXCJ3ZWJwYWNrX3NoYXJpbmdfY29uc3VtZV9kZWZhdWx0X3JlYWN0X3JlYWN0XCIpXSkudGhlbigoKSA9PiAoKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vLnlhcm4vX192aXJ0dWFsX18vcmVhY3QtaTE4bmV4dC12aXJ0dWFsLTNjODFmYTQ3OTAvMy8ueWFybi9iZXJyeS9jYWNoZS9yZWFjdC1pMThuZXh0LW5wbS0xNC4xLjAtMGI5MTIyZmYzMC0xMGMwLnppcC9ub2RlX21vZHVsZXMvcmVhY3QtaTE4bmV4dC9kaXN0L2VzL2luZGV4LmpzICovIFwiLi8ueWFybi9fX3ZpcnR1YWxfXy9yZWFjdC1pMThuZXh0LXZpcnR1YWwtM2M4MWZhNDc5MC8zLy55YXJuL2JlcnJ5L2NhY2hlL3JlYWN0LWkxOG5leHQtbnBtLTE0LjEuMC0wYjkxMjJmZjMwLTEwYzAuemlwL25vZGVfbW9kdWxlcy9yZWFjdC1pMThuZXh0L2Rpc3QvZXMvaW5kZXguanNcIikpKSkpKTtcblx0XHRcdHJlZ2lzdGVyKFwicmVhY3RcIiwgXCIxNy4wLjJcIiwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uZShcInZlbmRvcnMtX3lhcm5fYmVycnlfY2FjaGVfcmVhY3QtbnBtLTE3XzBfMi05OWJhMzdkOTMxLTEwYzBfemlwX25vZGVfbW9kdWxlc19yZWFjdF9pbmRleF9qc1wiKS50aGVuKCgpID0+ICgoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vLi4vLnlhcm4vYmVycnkvY2FjaGUvcmVhY3QtbnBtLTE3LjAuMi05OWJhMzdkOTMxLTEwYzAuemlwL25vZGVfbW9kdWxlcy9yZWFjdC9pbmRleC5qcyAqLyBcIi4uLy4uLy55YXJuL2JlcnJ5L2NhY2hlL3JlYWN0LW5wbS0xNy4wLjItOTliYTM3ZDkzMS0xMGMwLnppcC9ub2RlX21vZHVsZXMvcmVhY3QvaW5kZXguanNcIikpKSkpKTtcblx0XHR9XG5cdFx0YnJlYWs7XG5cdH1cblx0aWYoIXByb21pc2VzLmxlbmd0aCkgcmV0dXJuIGluaXRQcm9taXNlc1tuYW1lXSA9IDE7XG5cdHJldHVybiBpbml0UHJvbWlzZXNbbmFtZV0gPSBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiAoaW5pdFByb21pc2VzW25hbWVdID0gMSkpO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybCArIFwiLi4vY2xpZW50L1wiOyIsInZhciBwYXJzZVZlcnNpb24gPSAoc3RyKSA9PiB7XG5cdC8vIHNlZSB3ZWJwYWNrL2xpYi91dGlsL3NlbXZlci5qcyBmb3Igb3JpZ2luYWwgY29kZVxuXHR2YXIgcD1wPT57cmV0dXJuIHAuc3BsaXQoXCIuXCIpLm1hcCgocD0+e3JldHVybitwPT1wPytwOnB9KSl9LG49L14oW14tK10rKT8oPzotKFteK10rKSk/KD86XFwrKC4rKSk/JC8uZXhlYyhzdHIpLHI9blsxXT9wKG5bMV0pOltdO3JldHVybiBuWzJdJiYoci5sZW5ndGgrKyxyLnB1c2guYXBwbHkocixwKG5bMl0pKSksblszXSYmKHIucHVzaChbXSksci5wdXNoLmFwcGx5KHIscChuWzNdKSkpLHI7XG59XG52YXIgdmVyc2lvbkx0ID0gKGEsIGIpID0+IHtcblx0Ly8gc2VlIHdlYnBhY2svbGliL3V0aWwvc2VtdmVyLmpzIGZvciBvcmlnaW5hbCBjb2RlXG5cdGE9cGFyc2VWZXJzaW9uKGEpLGI9cGFyc2VWZXJzaW9uKGIpO2Zvcih2YXIgcj0wOzspe2lmKHI+PWEubGVuZ3RoKXJldHVybiByPGIubGVuZ3RoJiZcInVcIiE9KHR5cGVvZiBiW3JdKVswXTt2YXIgZT1hW3JdLG49KHR5cGVvZiBlKVswXTtpZihyPj1iLmxlbmd0aClyZXR1cm5cInVcIj09bjt2YXIgdD1iW3JdLGY9KHR5cGVvZiB0KVswXTtpZihuIT1mKXJldHVyblwib1wiPT1uJiZcIm5cIj09Znx8KFwic1wiPT1mfHxcInVcIj09bik7aWYoXCJvXCIhPW4mJlwidVwiIT1uJiZlIT10KXJldHVybiBlPHQ7cisrfVxufVxudmFyIHJhbmdlVG9TdHJpbmcgPSAocmFuZ2UpID0+IHtcblx0Ly8gc2VlIHdlYnBhY2svbGliL3V0aWwvc2VtdmVyLmpzIGZvciBvcmlnaW5hbCBjb2RlXG5cdHZhciByPXJhbmdlWzBdLG49XCJcIjtpZigxPT09cmFuZ2UubGVuZ3RoKXJldHVyblwiKlwiO2lmKHIrLjUpe24rPTA9PXI/XCI+PVwiOi0xPT1yP1wiPFwiOjE9PXI/XCJeXCI6Mj09cj9cIn5cIjpyPjA/XCI9XCI6XCIhPVwiO2Zvcih2YXIgZT0xLGE9MTthPHJhbmdlLmxlbmd0aDthKyspe2UtLSxuKz1cInVcIj09KHR5cGVvZih0PXJhbmdlW2FdKSlbMF0/XCItXCI6KGU+MD9cIi5cIjpcIlwiKSsoZT0yLHQpfXJldHVybiBufXZhciBnPVtdO2ZvcihhPTE7YTxyYW5nZS5sZW5ndGg7YSsrKXt2YXIgdD1yYW5nZVthXTtnLnB1c2goMD09PXQ/XCJub3QoXCIrbygpK1wiKVwiOjE9PT10P1wiKFwiK28oKStcIiB8fCBcIitvKCkrXCIpXCI6Mj09PXQ/Zy5wb3AoKStcIiBcIitnLnBvcCgpOnJhbmdlVG9TdHJpbmcodCkpfXJldHVybiBvKCk7ZnVuY3Rpb24gbygpe3JldHVybiBnLnBvcCgpLnJlcGxhY2UoL15cXCgoLispXFwpJC8sXCIkMVwiKX1cbn1cbnZhciBzYXRpc2Z5ID0gKHJhbmdlLCB2ZXJzaW9uKSA9PiB7XG5cdC8vIHNlZSB3ZWJwYWNrL2xpYi91dGlsL3NlbXZlci5qcyBmb3Igb3JpZ2luYWwgY29kZVxuXHRpZigwIGluIHJhbmdlKXt2ZXJzaW9uPXBhcnNlVmVyc2lvbih2ZXJzaW9uKTt2YXIgZT1yYW5nZVswXSxyPWU8MDtyJiYoZT0tZS0xKTtmb3IodmFyIG49MCxpPTEsYT0hMDs7aSsrLG4rKyl7dmFyIGYscyxnPWk8cmFuZ2UubGVuZ3RoPyh0eXBlb2YgcmFuZ2VbaV0pWzBdOlwiXCI7aWYobj49dmVyc2lvbi5sZW5ndGh8fFwib1wiPT0ocz0odHlwZW9mKGY9dmVyc2lvbltuXSkpWzBdKSlyZXR1cm4hYXx8KFwidVwiPT1nP2k+ZSYmIXI6XCJcIj09ZyE9cik7aWYoXCJ1XCI9PXMpe2lmKCFhfHxcInVcIiE9ZylyZXR1cm4hMX1lbHNlIGlmKGEpaWYoZz09cylpZihpPD1lKXtpZihmIT1yYW5nZVtpXSlyZXR1cm4hMX1lbHNle2lmKHI/Zj5yYW5nZVtpXTpmPHJhbmdlW2ldKXJldHVybiExO2YhPXJhbmdlW2ldJiYoYT0hMSl9ZWxzZSBpZihcInNcIiE9ZyYmXCJuXCIhPWcpe2lmKHJ8fGk8PWUpcmV0dXJuITE7YT0hMSxpLS19ZWxzZXtpZihpPD1lfHxzPGchPXIpcmV0dXJuITE7YT0hMX1lbHNlXCJzXCIhPWcmJlwiblwiIT1nJiYoYT0hMSxpLS0pfX12YXIgdD1bXSxvPXQucG9wLmJpbmQodCk7Zm9yKG49MTtuPHJhbmdlLmxlbmd0aDtuKyspe3ZhciB1PXJhbmdlW25dO3QucHVzaCgxPT11P28oKXxvKCk6Mj09dT9vKCkmbygpOnU/c2F0aXNmeSh1LHZlcnNpb24pOiFvKCkpfXJldHVybiEhbygpO1xufVxudmFyIGVuc3VyZUV4aXN0ZW5jZSA9IChzY29wZU5hbWUsIGtleSkgPT4ge1xuXHR2YXIgc2NvcGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLlNbc2NvcGVOYW1lXTtcblx0aWYoIXNjb3BlIHx8ICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oc2NvcGUsIGtleSkpIHRocm93IG5ldyBFcnJvcihcIlNoYXJlZCBtb2R1bGUgXCIgKyBrZXkgKyBcIiBkb2Vzbid0IGV4aXN0IGluIHNoYXJlZCBzY29wZSBcIiArIHNjb3BlTmFtZSk7XG5cdHJldHVybiBzY29wZTtcbn07XG52YXIgZmluZFZlcnNpb24gPSAoc2NvcGUsIGtleSkgPT4ge1xuXHR2YXIgdmVyc2lvbnMgPSBzY29wZVtrZXldO1xuXHR2YXIga2V5ID0gT2JqZWN0LmtleXModmVyc2lvbnMpLnJlZHVjZSgoYSwgYikgPT4ge1xuXHRcdHJldHVybiAhYSB8fCB2ZXJzaW9uTHQoYSwgYikgPyBiIDogYTtcblx0fSwgMCk7XG5cdHJldHVybiBrZXkgJiYgdmVyc2lvbnNba2V5XVxufTtcbnZhciBmaW5kU2luZ2xldG9uVmVyc2lvbktleSA9IChzY29wZSwga2V5KSA9PiB7XG5cdHZhciB2ZXJzaW9ucyA9IHNjb3BlW2tleV07XG5cdHJldHVybiBPYmplY3Qua2V5cyh2ZXJzaW9ucykucmVkdWNlKChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuICFhIHx8ICghdmVyc2lvbnNbYV0ubG9hZGVkICYmIHZlcnNpb25MdChhLCBiKSkgPyBiIDogYTtcblx0fSwgMCk7XG59O1xudmFyIGdldEludmFsaWRTaW5nbGV0b25WZXJzaW9uTWVzc2FnZSA9IChzY29wZSwga2V5LCB2ZXJzaW9uLCByZXF1aXJlZFZlcnNpb24pID0+IHtcblx0cmV0dXJuIFwiVW5zYXRpc2ZpZWQgdmVyc2lvbiBcIiArIHZlcnNpb24gKyBcIiBmcm9tIFwiICsgKHZlcnNpb24gJiYgc2NvcGVba2V5XVt2ZXJzaW9uXS5mcm9tKSArIFwiIG9mIHNoYXJlZCBzaW5nbGV0b24gbW9kdWxlIFwiICsga2V5ICsgXCIgKHJlcXVpcmVkIFwiICsgcmFuZ2VUb1N0cmluZyhyZXF1aXJlZFZlcnNpb24pICsgXCIpXCJcbn07XG52YXIgZ2V0U2luZ2xldG9uID0gKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgcmVxdWlyZWRWZXJzaW9uKSA9PiB7XG5cdHZhciB2ZXJzaW9uID0gZmluZFNpbmdsZXRvblZlcnNpb25LZXkoc2NvcGUsIGtleSk7XG5cdHJldHVybiBnZXQoc2NvcGVba2V5XVt2ZXJzaW9uXSk7XG59O1xudmFyIGdldFNpbmdsZXRvblZlcnNpb24gPSAoc2NvcGUsIHNjb3BlTmFtZSwga2V5LCByZXF1aXJlZFZlcnNpb24pID0+IHtcblx0dmFyIHZlcnNpb24gPSBmaW5kU2luZ2xldG9uVmVyc2lvbktleShzY29wZSwga2V5KTtcblx0aWYgKCFzYXRpc2Z5KHJlcXVpcmVkVmVyc2lvbiwgdmVyc2lvbikpIHdhcm4oZ2V0SW52YWxpZFNpbmdsZXRvblZlcnNpb25NZXNzYWdlKHNjb3BlLCBrZXksIHZlcnNpb24sIHJlcXVpcmVkVmVyc2lvbikpO1xuXHRyZXR1cm4gZ2V0KHNjb3BlW2tleV1bdmVyc2lvbl0pO1xufTtcbnZhciBnZXRTdHJpY3RTaW5nbGV0b25WZXJzaW9uID0gKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgcmVxdWlyZWRWZXJzaW9uKSA9PiB7XG5cdHZhciB2ZXJzaW9uID0gZmluZFNpbmdsZXRvblZlcnNpb25LZXkoc2NvcGUsIGtleSk7XG5cdGlmICghc2F0aXNmeShyZXF1aXJlZFZlcnNpb24sIHZlcnNpb24pKSB0aHJvdyBuZXcgRXJyb3IoZ2V0SW52YWxpZFNpbmdsZXRvblZlcnNpb25NZXNzYWdlKHNjb3BlLCBrZXksIHZlcnNpb24sIHJlcXVpcmVkVmVyc2lvbikpO1xuXHRyZXR1cm4gZ2V0KHNjb3BlW2tleV1bdmVyc2lvbl0pO1xufTtcbnZhciBmaW5kVmFsaWRWZXJzaW9uID0gKHNjb3BlLCBrZXksIHJlcXVpcmVkVmVyc2lvbikgPT4ge1xuXHR2YXIgdmVyc2lvbnMgPSBzY29wZVtrZXldO1xuXHR2YXIga2V5ID0gT2JqZWN0LmtleXModmVyc2lvbnMpLnJlZHVjZSgoYSwgYikgPT4ge1xuXHRcdGlmICghc2F0aXNmeShyZXF1aXJlZFZlcnNpb24sIGIpKSByZXR1cm4gYTtcblx0XHRyZXR1cm4gIWEgfHwgdmVyc2lvbkx0KGEsIGIpID8gYiA6IGE7XG5cdH0sIDApO1xuXHRyZXR1cm4ga2V5ICYmIHZlcnNpb25zW2tleV1cbn07XG52YXIgZ2V0SW52YWxpZFZlcnNpb25NZXNzYWdlID0gKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgcmVxdWlyZWRWZXJzaW9uKSA9PiB7XG5cdHZhciB2ZXJzaW9ucyA9IHNjb3BlW2tleV07XG5cdHJldHVybiBcIk5vIHNhdGlzZnlpbmcgdmVyc2lvbiAoXCIgKyByYW5nZVRvU3RyaW5nKHJlcXVpcmVkVmVyc2lvbikgKyBcIikgb2Ygc2hhcmVkIG1vZHVsZSBcIiArIGtleSArIFwiIGZvdW5kIGluIHNoYXJlZCBzY29wZSBcIiArIHNjb3BlTmFtZSArIFwiLlxcblwiICtcblx0XHRcIkF2YWlsYWJsZSB2ZXJzaW9uczogXCIgKyBPYmplY3Qua2V5cyh2ZXJzaW9ucykubWFwKChrZXkpID0+IHtcblx0XHRyZXR1cm4ga2V5ICsgXCIgZnJvbSBcIiArIHZlcnNpb25zW2tleV0uZnJvbTtcblx0fSkuam9pbihcIiwgXCIpO1xufTtcbnZhciBnZXRWYWxpZFZlcnNpb24gPSAoc2NvcGUsIHNjb3BlTmFtZSwga2V5LCByZXF1aXJlZFZlcnNpb24pID0+IHtcblx0dmFyIGVudHJ5ID0gZmluZFZhbGlkVmVyc2lvbihzY29wZSwga2V5LCByZXF1aXJlZFZlcnNpb24pO1xuXHRpZihlbnRyeSkgcmV0dXJuIGdldChlbnRyeSk7XG5cdHRocm93IG5ldyBFcnJvcihnZXRJbnZhbGlkVmVyc2lvbk1lc3NhZ2Uoc2NvcGUsIHNjb3BlTmFtZSwga2V5LCByZXF1aXJlZFZlcnNpb24pKTtcbn07XG52YXIgd2FybiA9IChtc2cpID0+IHtcblx0aWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKG1zZyk7XG59O1xudmFyIHdhcm5JbnZhbGlkVmVyc2lvbiA9IChzY29wZSwgc2NvcGVOYW1lLCBrZXksIHJlcXVpcmVkVmVyc2lvbikgPT4ge1xuXHR3YXJuKGdldEludmFsaWRWZXJzaW9uTWVzc2FnZShzY29wZSwgc2NvcGVOYW1lLCBrZXksIHJlcXVpcmVkVmVyc2lvbikpO1xufTtcbnZhciBnZXQgPSAoZW50cnkpID0+IHtcblx0ZW50cnkubG9hZGVkID0gMTtcblx0cmV0dXJuIGVudHJ5LmdldCgpXG59O1xudmFyIGluaXQgPSAoZm4pID0+IChmdW5jdGlvbihzY29wZU5hbWUsIGEsIGIsIGMpIHtcblx0dmFyIHByb21pc2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLkkoc2NvcGVOYW1lKTtcblx0aWYgKHByb21pc2UgJiYgcHJvbWlzZS50aGVuKSByZXR1cm4gcHJvbWlzZS50aGVuKGZuLmJpbmQoZm4sIHNjb3BlTmFtZSwgX193ZWJwYWNrX3JlcXVpcmVfXy5TW3Njb3BlTmFtZV0sIGEsIGIsIGMpKTtcblx0cmV0dXJuIGZuKHNjb3BlTmFtZSwgX193ZWJwYWNrX3JlcXVpcmVfXy5TW3Njb3BlTmFtZV0sIGEsIGIsIGMpO1xufSk7XG5cbnZhciBsb2FkID0gLyojX19QVVJFX18qLyBpbml0KChzY29wZU5hbWUsIHNjb3BlLCBrZXkpID0+IHtcblx0ZW5zdXJlRXhpc3RlbmNlKHNjb3BlTmFtZSwga2V5KTtcblx0cmV0dXJuIGdldChmaW5kVmVyc2lvbihzY29wZSwga2V5KSk7XG59KTtcbnZhciBsb2FkRmFsbGJhY2sgPSAvKiNfX1BVUkVfXyovIGluaXQoKHNjb3BlTmFtZSwgc2NvcGUsIGtleSwgZmFsbGJhY2spID0+IHtcblx0cmV0dXJuIHNjb3BlICYmIF9fd2VicGFja19yZXF1aXJlX18ubyhzY29wZSwga2V5KSA/IGdldChmaW5kVmVyc2lvbihzY29wZSwga2V5KSkgOiBmYWxsYmFjaygpO1xufSk7XG52YXIgbG9hZFZlcnNpb25DaGVjayA9IC8qI19fUFVSRV9fKi8gaW5pdCgoc2NvcGVOYW1lLCBzY29wZSwga2V5LCB2ZXJzaW9uKSA9PiB7XG5cdGVuc3VyZUV4aXN0ZW5jZShzY29wZU5hbWUsIGtleSk7XG5cdHJldHVybiBnZXQoZmluZFZhbGlkVmVyc2lvbihzY29wZSwga2V5LCB2ZXJzaW9uKSB8fCB3YXJuSW52YWxpZFZlcnNpb24oc2NvcGUsIHNjb3BlTmFtZSwga2V5LCB2ZXJzaW9uKSB8fCBmaW5kVmVyc2lvbihzY29wZSwga2V5KSk7XG59KTtcbnZhciBsb2FkU2luZ2xldG9uID0gLyojX19QVVJFX18qLyBpbml0KChzY29wZU5hbWUsIHNjb3BlLCBrZXkpID0+IHtcblx0ZW5zdXJlRXhpc3RlbmNlKHNjb3BlTmFtZSwga2V5KTtcblx0cmV0dXJuIGdldFNpbmdsZXRvbihzY29wZSwgc2NvcGVOYW1lLCBrZXkpO1xufSk7XG52YXIgbG9hZFNpbmdsZXRvblZlcnNpb25DaGVjayA9IC8qI19fUFVSRV9fKi8gaW5pdCgoc2NvcGVOYW1lLCBzY29wZSwga2V5LCB2ZXJzaW9uKSA9PiB7XG5cdGVuc3VyZUV4aXN0ZW5jZShzY29wZU5hbWUsIGtleSk7XG5cdHJldHVybiBnZXRTaW5nbGV0b25WZXJzaW9uKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgdmVyc2lvbik7XG59KTtcbnZhciBsb2FkU3RyaWN0VmVyc2lvbkNoZWNrID0gLyojX19QVVJFX18qLyBpbml0KChzY29wZU5hbWUsIHNjb3BlLCBrZXksIHZlcnNpb24pID0+IHtcblx0ZW5zdXJlRXhpc3RlbmNlKHNjb3BlTmFtZSwga2V5KTtcblx0cmV0dXJuIGdldFZhbGlkVmVyc2lvbihzY29wZSwgc2NvcGVOYW1lLCBrZXksIHZlcnNpb24pO1xufSk7XG52YXIgbG9hZFN0cmljdFNpbmdsZXRvblZlcnNpb25DaGVjayA9IC8qI19fUFVSRV9fKi8gaW5pdCgoc2NvcGVOYW1lLCBzY29wZSwga2V5LCB2ZXJzaW9uKSA9PiB7XG5cdGVuc3VyZUV4aXN0ZW5jZShzY29wZU5hbWUsIGtleSk7XG5cdHJldHVybiBnZXRTdHJpY3RTaW5nbGV0b25WZXJzaW9uKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgdmVyc2lvbik7XG59KTtcbnZhciBsb2FkVmVyc2lvbkNoZWNrRmFsbGJhY2sgPSAvKiNfX1BVUkVfXyovIGluaXQoKHNjb3BlTmFtZSwgc2NvcGUsIGtleSwgdmVyc2lvbiwgZmFsbGJhY2spID0+IHtcblx0aWYoIXNjb3BlIHx8ICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oc2NvcGUsIGtleSkpIHJldHVybiBmYWxsYmFjaygpO1xuXHRyZXR1cm4gZ2V0KGZpbmRWYWxpZFZlcnNpb24oc2NvcGUsIGtleSwgdmVyc2lvbikgfHwgd2FybkludmFsaWRWZXJzaW9uKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgdmVyc2lvbikgfHwgZmluZFZlcnNpb24oc2NvcGUsIGtleSkpO1xufSk7XG52YXIgbG9hZFNpbmdsZXRvbkZhbGxiYWNrID0gLyojX19QVVJFX18qLyBpbml0KChzY29wZU5hbWUsIHNjb3BlLCBrZXksIGZhbGxiYWNrKSA9PiB7XG5cdGlmKCFzY29wZSB8fCAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKHNjb3BlLCBrZXkpKSByZXR1cm4gZmFsbGJhY2soKTtcblx0cmV0dXJuIGdldFNpbmdsZXRvbihzY29wZSwgc2NvcGVOYW1lLCBrZXkpO1xufSk7XG52YXIgbG9hZFNpbmdsZXRvblZlcnNpb25DaGVja0ZhbGxiYWNrID0gLyojX19QVVJFX18qLyBpbml0KChzY29wZU5hbWUsIHNjb3BlLCBrZXksIHZlcnNpb24sIGZhbGxiYWNrKSA9PiB7XG5cdGlmKCFzY29wZSB8fCAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKHNjb3BlLCBrZXkpKSByZXR1cm4gZmFsbGJhY2soKTtcblx0cmV0dXJuIGdldFNpbmdsZXRvblZlcnNpb24oc2NvcGUsIHNjb3BlTmFtZSwga2V5LCB2ZXJzaW9uKTtcbn0pO1xudmFyIGxvYWRTdHJpY3RWZXJzaW9uQ2hlY2tGYWxsYmFjayA9IC8qI19fUFVSRV9fKi8gaW5pdCgoc2NvcGVOYW1lLCBzY29wZSwga2V5LCB2ZXJzaW9uLCBmYWxsYmFjaykgPT4ge1xuXHR2YXIgZW50cnkgPSBzY29wZSAmJiBfX3dlYnBhY2tfcmVxdWlyZV9fLm8oc2NvcGUsIGtleSkgJiYgZmluZFZhbGlkVmVyc2lvbihzY29wZSwga2V5LCB2ZXJzaW9uKTtcblx0cmV0dXJuIGVudHJ5ID8gZ2V0KGVudHJ5KSA6IGZhbGxiYWNrKCk7XG59KTtcbnZhciBsb2FkU3RyaWN0U2luZ2xldG9uVmVyc2lvbkNoZWNrRmFsbGJhY2sgPSAvKiNfX1BVUkVfXyovIGluaXQoKHNjb3BlTmFtZSwgc2NvcGUsIGtleSwgdmVyc2lvbiwgZmFsbGJhY2spID0+IHtcblx0aWYoIXNjb3BlIHx8ICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oc2NvcGUsIGtleSkpIHJldHVybiBmYWxsYmFjaygpO1xuXHRyZXR1cm4gZ2V0U3RyaWN0U2luZ2xldG9uVmVyc2lvbihzY29wZSwgc2NvcGVOYW1lLCBrZXksIHZlcnNpb24pO1xufSk7XG52YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xudmFyIG1vZHVsZVRvSGFuZGxlck1hcHBpbmcgPSB7XG5cdFwid2VicGFjay9zaGFyaW5nL2NvbnN1bWUvZGVmYXVsdC9yZWFjdC9yZWFjdFwiOiAoKSA9PiAobG9hZFNpbmdsZXRvblZlcnNpb25DaGVja0ZhbGxiYWNrKFwiZGVmYXVsdFwiLCBcInJlYWN0XCIsIFsxLDE4LDIsMF0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLmUoXCJ2ZW5kb3JzLV95YXJuX2JlcnJ5X2NhY2hlX3JlYWN0LW5wbS0xN18wXzItOTliYTM3ZDkzMS0xMGMwX3ppcF9ub2RlX21vZHVsZXNfcmVhY3RfaW5kZXhfanNcIikudGhlbigoKSA9PiAoKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oLyohIHJlYWN0ICovIFwiLi4vLi4vLnlhcm4vYmVycnkvY2FjaGUvcmVhY3QtbnBtLTE3LjAuMi05OWJhMzdkOTMxLTEwYzAuemlwL25vZGVfbW9kdWxlcy9yZWFjdC9pbmRleC5qc1wiKSkpKSkpKSxcblx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L3JlYWN0LWkxOG5leHQvcmVhY3QtaTE4bmV4dFwiOiAoKSA9PiAobG9hZFN0cmljdFZlcnNpb25DaGVja0ZhbGxiYWNrKFwiZGVmYXVsdFwiLCBcInJlYWN0LWkxOG5leHRcIiwgWzEsMTQsMSwwXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uZShcInZlbmRvcnMtX3lhcm5fX192aXJ0dWFsX19fcmVhY3QtaTE4bmV4dC12aXJ0dWFsLTNjODFmYTQ3OTBfM195YXJuX2JlcnJ5X2NhY2hlX3JlYWN0LWkxOG5leHQtbi01NmRmNjdcIikudGhlbigoKSA9PiAoKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oLyohIHJlYWN0LWkxOG5leHQgKi8gXCIuLy55YXJuL19fdmlydHVhbF9fL3JlYWN0LWkxOG5leHQtdmlydHVhbC0zYzgxZmE0NzkwLzMvLnlhcm4vYmVycnkvY2FjaGUvcmVhY3QtaTE4bmV4dC1ucG0tMTQuMS4wLTBiOTEyMmZmMzAtMTBjMC56aXAvbm9kZV9tb2R1bGVzL3JlYWN0LWkxOG5leHQvZGlzdC9lcy9pbmRleC5qc1wiKSkpKSkpKVxufTtcbi8vIG5vIGNvbnN1bWVzIGluIGluaXRpYWwgY2h1bmtzXG52YXIgY2h1bmtNYXBwaW5nID0ge1xuXHRcIndlYnBhY2tfc2hhcmluZ19jb25zdW1lX2RlZmF1bHRfcmVhY3RfcmVhY3RcIjogW1xuXHRcdFwid2VicGFjay9zaGFyaW5nL2NvbnN1bWUvZGVmYXVsdC9yZWFjdC9yZWFjdFwiXG5cdF0sXG5cdFwid2VicGFja19zaGFyaW5nX2NvbnN1bWVfZGVmYXVsdF9yZWFjdC1pMThuZXh0X3JlYWN0LWkxOG5leHRcIjogW1xuXHRcdFwid2VicGFjay9zaGFyaW5nL2NvbnN1bWUvZGVmYXVsdC9yZWFjdC1pMThuZXh0L3JlYWN0LWkxOG5leHRcIlxuXHRdXG59O1xudmFyIHN0YXJ0ZWRJbnN0YWxsTW9kdWxlcyA9IHt9O1xuX193ZWJwYWNrX3JlcXVpcmVfXy5mLmNvbnN1bWVzID0gKGNodW5rSWQsIHByb21pc2VzKSA9PiB7XG5cdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhjaHVua01hcHBpbmcsIGNodW5rSWQpKSB7XG5cdFx0Y2h1bmtNYXBwaW5nW2NodW5rSWRdLmZvckVhY2goKGlkKSA9PiB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkTW9kdWxlcywgaWQpKSByZXR1cm4gcHJvbWlzZXMucHVzaChpbnN0YWxsZWRNb2R1bGVzW2lkXSk7XG5cdFx0XHRpZighc3RhcnRlZEluc3RhbGxNb2R1bGVzW2lkXSkge1xuXHRcdFx0dmFyIG9uRmFjdG9yeSA9IChmYWN0b3J5KSA9PiB7XG5cdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbaWRdID0gMDtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW2lkXSA9IChtb2R1bGUpID0+IHtcblx0XHRcdFx0XHRkZWxldGUgX193ZWJwYWNrX3JlcXVpcmVfXy5jW2lkXTtcblx0XHRcdFx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHN0YXJ0ZWRJbnN0YWxsTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdFx0dmFyIG9uRXJyb3IgPSAoZXJyb3IpID0+IHtcblx0XHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbaWRdO1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1baWRdID0gKG1vZHVsZSkgPT4ge1xuXHRcdFx0XHRcdGRlbGV0ZSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbaWRdO1xuXHRcdFx0XHRcdHRocm93IGVycm9yO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dmFyIHByb21pc2UgPSBtb2R1bGVUb0hhbmRsZXJNYXBwaW5nW2lkXSgpO1xuXHRcdFx0XHRpZihwcm9taXNlLnRoZW4pIHtcblx0XHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZE1vZHVsZXNbaWRdID0gcHJvbWlzZS50aGVuKG9uRmFjdG9yeSlbJ2NhdGNoJ10ob25FcnJvcikpO1xuXHRcdFx0XHR9IGVsc2Ugb25GYWN0b3J5KHByb21pc2UpO1xuXHRcdFx0fSBjYXRjaChlKSB7IG9uRXJyb3IoZSk7IH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxufSIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImx1eGUtamFoaWEtZGVtb1wiOiAwXG59O1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmYuaiA9IChjaHVua0lkLCBwcm9taXNlcykgPT4ge1xuXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgPyBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gOiB1bmRlZmluZWQ7XG5cdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG5cdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmKCEvXndlYnBhY2tfc2hhcmluZ19jb25zdW1lX2RlZmF1bHRfcmVhY3QoXFwtaTE4bmV4dF9yZWFjdFxcLWkxOG5leHxfcmVhYyl0JC8udGVzdChjaHVua0lkKSkge1xuXHRcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcblx0XHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IChpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XSkpO1xuXHRcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cblx0XHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG5cdFx0XHRcdFx0dmFyIHVybCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18udShjaHVua0lkKTtcblx0XHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG5cdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG5cdFx0XHRcdFx0dmFyIGxvYWRpbmdFbmRlZCA9IChldmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkpIHtcblx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcblx0XHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGFbMV0oZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmwodXJsLCBsb2FkaW5nRW5kZWQsIFwiY2h1bmstXCIgKyBjaHVua0lkLCBjaHVua0lkKTtcblx0XHRcdFx0fSBlbHNlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdFx0XHR9XG5cdFx0fVxufTtcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblxufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2x1eGVfamFoaWFfZGVtb1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdXhlX2phaGlhX2RlbW9cIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIG1vZHVsZSBjYWNoZSBhcmUgdXNlZCBzbyBlbnRyeSBpbmxpbmluZyBpcyBkaXNhYmxlZFxuLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvY2xpZW50L2luZGV4LmpzXCIpO1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwid2VicGFjay9jb250YWluZXIvZW50cnkvbHV4ZS1qYWhpYS1kZW1vXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9