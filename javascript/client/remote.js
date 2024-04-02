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
	"hasPermission": () => {
		return __webpack_require__.e("src_client_hasPermission_js").then(() => (() => ((__webpack_require__(/*! ./src/client/hasPermission.js */ "./src/client/hasPermission.js")))));
	},
	"index": () => {
		return Promise.resolve().then(() => (() => ((__webpack_require__(/*! ./src/client/index.js */ "./src/client/index.js")))));
	},
	"loginRequest": () => {
		return __webpack_require__.e("src_client_loginRequest_js").then(() => (() => ((__webpack_require__(/*! ./src/client/loginRequest.js */ "./src/client/loginRequest.js")))));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vY2xpZW50L3JlbW90ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUF1QixNQUFNLDRDQUE0Qzs7Ozs7Ozs7Ozs7QUNKekU7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7VUM3Q0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDNUJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7Ozs7O1dDUkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NKQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHVCQUF1Qiw0QkFBNEI7V0FDbkQ7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLG9CQUFvQjtXQUNyQztXQUNBLG1HQUFtRyxZQUFZO1dBQy9HO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsbUVBQW1FLGlDQUFpQztXQUNwRztXQUNBO1dBQ0E7V0FDQTs7Ozs7V0N6Q0E7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxvSkFBb0o7V0FDcEo7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxJQUFJLGFBQWE7V0FDakI7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzlDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NsQkE7V0FDQTtXQUNBLFdBQVcsNkJBQTZCLGlCQUFpQixHQUFHLHFFQUFxRTtXQUNqSTtXQUNBO1dBQ0E7V0FDQSxxQ0FBcUMsYUFBYSxFQUFFLHdEQUF3RCwyQkFBMkIsNEJBQTRCLDJCQUEyQiwrQ0FBK0MsbUNBQW1DO1dBQ2hSO1dBQ0E7V0FDQTtXQUNBLHFCQUFxQiw4QkFBOEIsU0FBUyxzREFBc0QsZ0JBQWdCLGVBQWUsS0FBSyw2REFBNkQsU0FBUyxTQUFTLFFBQVEsZUFBZSxLQUFLLGVBQWUscUdBQXFHLFdBQVcsYUFBYTtXQUM3WTtXQUNBO1dBQ0E7V0FDQSxnQkFBZ0IsOEJBQThCLHFCQUFxQixZQUFZLHNCQUFzQixTQUFTLGlEQUFpRCw2RkFBNkYsV0FBVyx1QkFBdUIsMkJBQTJCLHdCQUF3QixLQUFLLG9DQUFvQyxvQkFBb0Isd0JBQXdCLG9CQUFvQixTQUFTLEtBQUsseUJBQXlCLEtBQUssZ0NBQWdDLHlCQUF5QixRQUFRLGVBQWUsS0FBSyxlQUFlLDREQUE0RDtXQUN0b0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLENBQUM7O1dBRUQ7V0FDQTtXQUNBO1dBQ0EsQ0FBQztXQUNEO1dBQ0E7V0FDQSxDQUFDO1dBQ0Q7V0FDQTtXQUNBO1dBQ0EsQ0FBQztXQUNEO1dBQ0E7V0FDQTtXQUNBLENBQUM7V0FDRDtXQUNBO1dBQ0E7V0FDQSxDQUFDO1dBQ0Q7V0FDQTtXQUNBO1dBQ0EsQ0FBQztXQUNEO1dBQ0E7V0FDQTtXQUNBLENBQUM7V0FDRDtXQUNBO1dBQ0E7V0FDQSxDQUFDO1dBQ0Q7V0FDQTtXQUNBO1dBQ0EsQ0FBQztXQUNEO1dBQ0E7V0FDQTtXQUNBLENBQUM7V0FDRDtXQUNBO1dBQ0E7V0FDQSxDQUFDO1dBQ0Q7V0FDQTtXQUNBO1dBQ0EsQ0FBQztXQUNEO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU07V0FDTixLQUFLLFdBQVc7V0FDaEI7V0FDQSxHQUFHO1dBQ0g7V0FDQTs7Ozs7V0NsTEE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQzs7V0FFakM7V0FDQTtXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNO1dBQ047V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFckZBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vLi9zcmMvY2xpZW50L2luZGV4LmpzIiwid2VicGFjazovL2x1eGUtamFoaWEtZGVtby93ZWJwYWNrL2NvbnRhaW5lci1lbnRyeSIsIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHV4ZS1qYWhpYS1kZW1vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2x1eGUtamFoaWEtZGVtby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHV4ZS1qYWhpYS1kZW1vL3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vbHV4ZS1qYWhpYS1kZW1vL3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vd2VicGFjay9ydW50aW1lL2xvYWQgc2NyaXB0Iiwid2VicGFjazovL2x1eGUtamFoaWEtZGVtby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2x1eGUtamFoaWEtZGVtby93ZWJwYWNrL3J1bnRpbWUvc2hhcmluZyIsIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vbHV4ZS1qYWhpYS1kZW1vL3dlYnBhY2svcnVudGltZS9jb25zdW1lcyIsIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbHV4ZS1qYWhpYS1kZW1vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHV4ZS1qYWhpYS1kZW1vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9sdXhlLWphaGlhLWRlbW8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFB1YmxpY1BhdGggaXMgdXNlZCB0byBtYWtlIHdlYnBhY2sgYWJsZSB0byBkb3dubG9hZCB0aGUgY2h1bmtzIGFuZCBhc3NldHMgZnJvbSB0aGUgY29ycmVjdCBsb2NhdGlvblxuLy8gU2luY2UgSlMgY2FuIGJlIGFnZ3JlZ2F0ZWQgYnkgSmFoaWEgb24gbGl2ZSwgdGhlIHBhdGggb2YgdGhlIG9yaWdpbmFsIGZpbGUgaXMgbG9zdFxuLy8gQWxzbyB0aGUgY29udGV4dCBvZiB0aGUgc2VydmVyIHNob3VsZCBiZSBoYW5kbGVkIHByb3Blcmx5XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlLCBuby11bmRlZlxuX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSBgJHt3aW5kb3cuX19BUFBTSEVMTF9JTklUX0RBVEFfXy5tb2R1bGVCYXNlVXJsfS9sdXhlLWphaGlhLWRlbW8vamF2YXNjcmlwdC9jbGllbnQvYDsiLCJ2YXIgbW9kdWxlTWFwID0ge1xuXHRcIkxvZ2luQ29tcG9uZW50XCI6ICgpID0+IHtcblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoW19fd2VicGFja19yZXF1aXJlX18uZShcIndlYnBhY2tfc2hhcmluZ19jb25zdW1lX2RlZmF1bHRfcmVhY3RfcmVhY3RcIiksIF9fd2VicGFja19yZXF1aXJlX18uZShcIndlYnBhY2tfc2hhcmluZ19jb25zdW1lX2RlZmF1bHRfcmVhY3QtaTE4bmV4dF9yZWFjdC1pMThuZXh0XCIpLCBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoXCJzcmNfY2xpZW50X1dvcmtzcGFjZU5hdmlnYXRpb25fanN4XCIpLCBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoXCJzcmNfY2xpZW50X0xvZ2luQ29tcG9uZW50X2pzeFwiKV0pLnRoZW4oKCkgPT4gKCgpID0+ICgoX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9zcmMvY2xpZW50L0xvZ2luQ29tcG9uZW50LmpzeCAqLyBcIi4vc3JjL2NsaWVudC9Mb2dpbkNvbXBvbmVudC5qc3hcIikpKSkpO1xuXHR9LFxuXHRcIkxvZ2luRm9ybVwiOiAoKSA9PiB7XG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKFtfX3dlYnBhY2tfcmVxdWlyZV9fLmUoXCJ3ZWJwYWNrX3NoYXJpbmdfY29uc3VtZV9kZWZhdWx0X3JlYWN0X3JlYWN0XCIpLCBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoXCJ3ZWJwYWNrX3NoYXJpbmdfY29uc3VtZV9kZWZhdWx0X3JlYWN0LWkxOG5leHRfcmVhY3QtaTE4bmV4dFwiKSwgX193ZWJwYWNrX3JlcXVpcmVfXy5lKFwic3JjX2NsaWVudF9Mb2dpbkZvcm1fanN4XCIpXSkudGhlbigoKSA9PiAoKCkgPT4gKChfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL3NyYy9jbGllbnQvTG9naW5Gb3JtLmpzeCAqLyBcIi4vc3JjL2NsaWVudC9Mb2dpbkZvcm0uanN4XCIpKSkpKTtcblx0fSxcblx0XCJXb3Jrc3BhY2VOYXZpZ2F0aW9uXCI6ICgpID0+IHtcblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoW19fd2VicGFja19yZXF1aXJlX18uZShcIndlYnBhY2tfc2hhcmluZ19jb25zdW1lX2RlZmF1bHRfcmVhY3RfcmVhY3RcIiksIF9fd2VicGFja19yZXF1aXJlX18uZShcIndlYnBhY2tfc2hhcmluZ19jb25zdW1lX2RlZmF1bHRfcmVhY3QtaTE4bmV4dF9yZWFjdC1pMThuZXh0XCIpLCBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoXCJzcmNfY2xpZW50X1dvcmtzcGFjZU5hdmlnYXRpb25fanN4XCIpXSkudGhlbigoKSA9PiAoKCkgPT4gKChfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL3NyYy9jbGllbnQvV29ya3NwYWNlTmF2aWdhdGlvbi5qc3ggKi8gXCIuL3NyYy9jbGllbnQvV29ya3NwYWNlTmF2aWdhdGlvbi5qc3hcIikpKSkpO1xuXHR9LFxuXHRcImhhc1Blcm1pc3Npb25cIjogKCkgPT4ge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoXCJzcmNfY2xpZW50X2hhc1Blcm1pc3Npb25fanNcIikudGhlbigoKSA9PiAoKCkgPT4gKChfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL3NyYy9jbGllbnQvaGFzUGVybWlzc2lvbi5qcyAqLyBcIi4vc3JjL2NsaWVudC9oYXNQZXJtaXNzaW9uLmpzXCIpKSkpKTtcblx0fSxcblx0XCJpbmRleFwiOiAoKSA9PiB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gKCgpID0+ICgoX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9zcmMvY2xpZW50L2luZGV4LmpzICovIFwiLi9zcmMvY2xpZW50L2luZGV4LmpzXCIpKSkpKTtcblx0fSxcblx0XCJsb2dpblJlcXVlc3RcIjogKCkgPT4ge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoXCJzcmNfY2xpZW50X2xvZ2luUmVxdWVzdF9qc1wiKS50aGVuKCgpID0+ICgoKSA9PiAoKF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vc3JjL2NsaWVudC9sb2dpblJlcXVlc3QuanMgKi8gXCIuL3NyYy9jbGllbnQvbG9naW5SZXF1ZXN0LmpzXCIpKSkpKTtcblx0fVxufTtcbnZhciBnZXQgPSAobW9kdWxlLCBnZXRTY29wZSkgPT4ge1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLlIgPSBnZXRTY29wZTtcblx0Z2V0U2NvcGUgPSAoXG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vZHVsZU1hcCwgbW9kdWxlKVxuXHRcdFx0PyBtb2R1bGVNYXBbbW9kdWxlXSgpXG5cdFx0XHQ6IFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01vZHVsZSBcIicgKyBtb2R1bGUgKyAnXCIgZG9lcyBub3QgZXhpc3QgaW4gY29udGFpbmVyLicpO1xuXHRcdFx0fSlcblx0KTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5SID0gdW5kZWZpbmVkO1xuXHRyZXR1cm4gZ2V0U2NvcGU7XG59O1xudmFyIGluaXQgPSAoc2hhcmVTY29wZSwgaW5pdFNjb3BlKSA9PiB7XG5cdGlmICghX193ZWJwYWNrX3JlcXVpcmVfXy5TKSByZXR1cm47XG5cdHZhciBuYW1lID0gXCJkZWZhdWx0XCJcblx0dmFyIG9sZFNjb3BlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5TW25hbWVdO1xuXHRpZihvbGRTY29wZSAmJiBvbGRTY29wZSAhPT0gc2hhcmVTY29wZSkgdGhyb3cgbmV3IEVycm9yKFwiQ29udGFpbmVyIGluaXRpYWxpemF0aW9uIGZhaWxlZCBhcyBpdCBoYXMgYWxyZWFkeSBiZWVuIGluaXRpYWxpemVkIHdpdGggYSBkaWZmZXJlbnQgc2hhcmUgc2NvcGVcIik7XG5cdF9fd2VicGFja19yZXF1aXJlX18uU1tuYW1lXSA9IHNoYXJlU2NvcGU7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLkkobmFtZSwgaW5pdFNjb3BlKTtcbn07XG5cbi8vIFRoaXMgZXhwb3J0cyBnZXR0ZXJzIHRvIGRpc2FsbG93IG1vZGlmaWNhdGlvbnNcbl9fd2VicGFja19yZXF1aXJlX18uZChleHBvcnRzLCB7XG5cdGdldDogKCkgPT4gKGdldCksXG5cdGluaXQ6ICgpID0+IChpbml0KVxufSk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4vLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuX193ZWJwYWNrX3JlcXVpcmVfXy5jID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZiA9IHt9O1xuLy8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoY2h1bmtJZCkgPT4ge1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5mKS5yZWR1Y2UoKHByb21pc2VzLCBrZXkpID0+IHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmZba2V5XShjaHVua0lkLCBwcm9taXNlcyk7XG5cdFx0cmV0dXJuIHByb21pc2VzO1xuXHR9LCBbXSkpO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhc3luYyBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18udSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJcIiArIGNodW5rSWQgKyBcIi5qc1wiO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJ2YXIgaW5Qcm9ncmVzcyA9IHt9O1xudmFyIGRhdGFXZWJwYWNrUHJlZml4ID0gXCJsdXhlLWphaGlhLWRlbW86XCI7XG4vLyBsb2FkU2NyaXB0IGZ1bmN0aW9uIHRvIGxvYWQgYSBzY3JpcHQgdmlhIHNjcmlwdCB0YWdcbl9fd2VicGFja19yZXF1aXJlX18ubCA9ICh1cmwsIGRvbmUsIGtleSwgY2h1bmtJZCkgPT4ge1xuXHRpZihpblByb2dyZXNzW3VybF0pIHsgaW5Qcm9ncmVzc1t1cmxdLnB1c2goZG9uZSk7IHJldHVybjsgfVxuXHR2YXIgc2NyaXB0LCBuZWVkQXR0YWNoO1xuXHRpZihrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBzID0gc2NyaXB0c1tpXTtcblx0XHRcdGlmKHMuZ2V0QXR0cmlidXRlKFwic3JjXCIpID09IHVybCB8fCBzLmdldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiKSA9PSBkYXRhV2VicGFja1ByZWZpeCArIGtleSkgeyBzY3JpcHQgPSBzOyBicmVhazsgfVxuXHRcdH1cblx0fVxuXHRpZighc2NyaXB0KSB7XG5cdFx0bmVlZEF0dGFjaCA9IHRydWU7XG5cdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cblx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG5cdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcblx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcblx0XHR9XG5cdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiLCBkYXRhV2VicGFja1ByZWZpeCArIGtleSk7XG5cblx0XHRzY3JpcHQuc3JjID0gdXJsO1xuXHR9XG5cdGluUHJvZ3Jlc3NbdXJsXSA9IFtkb25lXTtcblx0dmFyIG9uU2NyaXB0Q29tcGxldGUgPSAocHJldiwgZXZlbnQpID0+IHtcblx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG5cdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dmFyIGRvbmVGbnMgPSBpblByb2dyZXNzW3VybF07XG5cdFx0ZGVsZXRlIGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRzY3JpcHQucGFyZW50Tm9kZSAmJiBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuXHRcdGRvbmVGbnMgJiYgZG9uZUZucy5mb3JFYWNoKChmbikgPT4gKGZuKGV2ZW50KSkpO1xuXHRcdGlmKHByZXYpIHJldHVybiBwcmV2KGV2ZW50KTtcblx0fVxuXHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQob25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHVuZGVmaW5lZCwgeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pLCAxMjAwMDApO1xuXHRzY3JpcHQub25lcnJvciA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25lcnJvcik7XG5cdHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9ubG9hZCk7XG5cdG5lZWRBdHRhY2ggJiYgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xufTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLlMgPSB7fTtcbnZhciBpbml0UHJvbWlzZXMgPSB7fTtcbnZhciBpbml0VG9rZW5zID0ge307XG5fX3dlYnBhY2tfcmVxdWlyZV9fLkkgPSAobmFtZSwgaW5pdFNjb3BlKSA9PiB7XG5cdGlmKCFpbml0U2NvcGUpIGluaXRTY29wZSA9IFtdO1xuXHQvLyBoYW5kbGluZyBjaXJjdWxhciBpbml0IGNhbGxzXG5cdHZhciBpbml0VG9rZW4gPSBpbml0VG9rZW5zW25hbWVdO1xuXHRpZighaW5pdFRva2VuKSBpbml0VG9rZW4gPSBpbml0VG9rZW5zW25hbWVdID0ge307XG5cdGlmKGluaXRTY29wZS5pbmRleE9mKGluaXRUb2tlbikgPj0gMCkgcmV0dXJuO1xuXHRpbml0U2NvcGUucHVzaChpbml0VG9rZW4pO1xuXHQvLyBvbmx5IHJ1bnMgb25jZVxuXHRpZihpbml0UHJvbWlzZXNbbmFtZV0pIHJldHVybiBpbml0UHJvbWlzZXNbbmFtZV07XG5cdC8vIGNyZWF0ZXMgYSBuZXcgc2hhcmUgc2NvcGUgaWYgbmVlZGVkXG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oX193ZWJwYWNrX3JlcXVpcmVfXy5TLCBuYW1lKSkgX193ZWJwYWNrX3JlcXVpcmVfXy5TW25hbWVdID0ge307XG5cdC8vIHJ1bnMgYWxsIGluaXQgc25pcHBldHMgZnJvbSBhbGwgbW9kdWxlcyByZWFjaGFibGVcblx0dmFyIHNjb3BlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5TW25hbWVdO1xuXHR2YXIgd2FybiA9IChtc2cpID0+IHtcblx0XHRpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4obXNnKTtcblx0fTtcblx0dmFyIHVuaXF1ZU5hbWUgPSBcImx1eGUtamFoaWEtZGVtb1wiO1xuXHR2YXIgcmVnaXN0ZXIgPSAobmFtZSwgdmVyc2lvbiwgZmFjdG9yeSwgZWFnZXIpID0+IHtcblx0XHR2YXIgdmVyc2lvbnMgPSBzY29wZVtuYW1lXSA9IHNjb3BlW25hbWVdIHx8IHt9O1xuXHRcdHZhciBhY3RpdmVWZXJzaW9uID0gdmVyc2lvbnNbdmVyc2lvbl07XG5cdFx0aWYoIWFjdGl2ZVZlcnNpb24gfHwgKCFhY3RpdmVWZXJzaW9uLmxvYWRlZCAmJiAoIWVhZ2VyICE9ICFhY3RpdmVWZXJzaW9uLmVhZ2VyID8gZWFnZXIgOiB1bmlxdWVOYW1lID4gYWN0aXZlVmVyc2lvbi5mcm9tKSkpIHZlcnNpb25zW3ZlcnNpb25dID0geyBnZXQ6IGZhY3RvcnksIGZyb206IHVuaXF1ZU5hbWUsIGVhZ2VyOiAhIWVhZ2VyIH07XG5cdH07XG5cdHZhciBpbml0RXh0ZXJuYWwgPSAoaWQpID0+IHtcblx0XHR2YXIgaGFuZGxlRXJyb3IgPSAoZXJyKSA9PiAod2FybihcIkluaXRpYWxpemF0aW9uIG9mIHNoYXJpbmcgZXh0ZXJuYWwgZmFpbGVkOiBcIiArIGVycikpO1xuXHRcdHRyeSB7XG5cdFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG5cdFx0XHRpZighbW9kdWxlKSByZXR1cm47XG5cdFx0XHR2YXIgaW5pdEZuID0gKG1vZHVsZSkgPT4gKG1vZHVsZSAmJiBtb2R1bGUuaW5pdCAmJiBtb2R1bGUuaW5pdChfX3dlYnBhY2tfcmVxdWlyZV9fLlNbbmFtZV0sIGluaXRTY29wZSkpXG5cdFx0XHRpZihtb2R1bGUudGhlbikgcmV0dXJuIHByb21pc2VzLnB1c2gobW9kdWxlLnRoZW4oaW5pdEZuLCBoYW5kbGVFcnJvcikpO1xuXHRcdFx0dmFyIGluaXRSZXN1bHQgPSBpbml0Rm4obW9kdWxlKTtcblx0XHRcdGlmKGluaXRSZXN1bHQgJiYgaW5pdFJlc3VsdC50aGVuKSByZXR1cm4gcHJvbWlzZXMucHVzaChpbml0UmVzdWx0WydjYXRjaCddKGhhbmRsZUVycm9yKSk7XG5cdFx0fSBjYXRjaChlcnIpIHsgaGFuZGxlRXJyb3IoZXJyKTsgfVxuXHR9XG5cdHZhciBwcm9taXNlcyA9IFtdO1xuXHRzd2l0Y2gobmFtZSkge1xuXHRcdGNhc2UgXCJkZWZhdWx0XCI6IHtcblx0XHRcdHJlZ2lzdGVyKFwicmVhY3QtaTE4bmV4dFwiLCBcIjE0LjEuMFwiLCAoKSA9PiAoUHJvbWlzZS5hbGwoW19fd2VicGFja19yZXF1aXJlX18uZShcInZlbmRvcnMtX3lhcm5fX192aXJ0dWFsX19fcmVhY3QtaTE4bmV4dC12aXJ0dWFsLTNjODFmYTQ3OTBfM195YXJuX2JlcnJ5X2NhY2hlX3JlYWN0LWkxOG5leHQtbi01NmRmNjdcIiksIF9fd2VicGFja19yZXF1aXJlX18uZShcIndlYnBhY2tfc2hhcmluZ19jb25zdW1lX2RlZmF1bHRfcmVhY3RfcmVhY3RcIildKS50aGVuKCgpID0+ICgoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi8ueWFybi9fX3ZpcnR1YWxfXy9yZWFjdC1pMThuZXh0LXZpcnR1YWwtM2M4MWZhNDc5MC8zLy55YXJuL2JlcnJ5L2NhY2hlL3JlYWN0LWkxOG5leHQtbnBtLTE0LjEuMC0wYjkxMjJmZjMwLTEwYzAuemlwL25vZGVfbW9kdWxlcy9yZWFjdC1pMThuZXh0L2Rpc3QvZXMvaW5kZXguanMgKi8gXCIuLy55YXJuL19fdmlydHVhbF9fL3JlYWN0LWkxOG5leHQtdmlydHVhbC0zYzgxZmE0NzkwLzMvLnlhcm4vYmVycnkvY2FjaGUvcmVhY3QtaTE4bmV4dC1ucG0tMTQuMS4wLTBiOTEyMmZmMzAtMTBjMC56aXAvbm9kZV9tb2R1bGVzL3JlYWN0LWkxOG5leHQvZGlzdC9lcy9pbmRleC5qc1wiKSkpKSkpO1xuXHRcdFx0cmVnaXN0ZXIoXCJyZWFjdFwiLCBcIjE3LjAuMlwiLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5lKFwidmVuZG9ycy1feWFybl9iZXJyeV9jYWNoZV9yZWFjdC1ucG0tMTdfMF8yLTk5YmEzN2Q5MzEtMTBjMF96aXBfbm9kZV9tb2R1bGVzX3JlYWN0X2luZGV4X2pzXCIpLnRoZW4oKCkgPT4gKCgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi8uLi8ueWFybi9iZXJyeS9jYWNoZS9yZWFjdC1ucG0tMTcuMC4yLTk5YmEzN2Q5MzEtMTBjMC56aXAvbm9kZV9tb2R1bGVzL3JlYWN0L2luZGV4LmpzICovIFwiLi4vLi4vLnlhcm4vYmVycnkvY2FjaGUvcmVhY3QtbnBtLTE3LjAuMi05OWJhMzdkOTMxLTEwYzAuemlwL25vZGVfbW9kdWxlcy9yZWFjdC9pbmRleC5qc1wiKSkpKSkpO1xuXHRcdH1cblx0XHRicmVhaztcblx0fVxuXHRpZighcHJvbWlzZXMubGVuZ3RoKSByZXR1cm4gaW5pdFByb21pc2VzW25hbWVdID0gMTtcblx0cmV0dXJuIGluaXRQcm9taXNlc1tuYW1lXSA9IFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IChpbml0UHJvbWlzZXNbbmFtZV0gPSAxKSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsICsgXCIuLi9jbGllbnQvXCI7IiwidmFyIHBhcnNlVmVyc2lvbiA9IChzdHIpID0+IHtcblx0Ly8gc2VlIHdlYnBhY2svbGliL3V0aWwvc2VtdmVyLmpzIGZvciBvcmlnaW5hbCBjb2RlXG5cdHZhciBwPXA9PntyZXR1cm4gcC5zcGxpdChcIi5cIikubWFwKChwPT57cmV0dXJuK3A9PXA/K3A6cH0pKX0sbj0vXihbXi0rXSspPyg/Oi0oW14rXSspKT8oPzpcXCsoLispKT8kLy5leGVjKHN0cikscj1uWzFdP3AoblsxXSk6W107cmV0dXJuIG5bMl0mJihyLmxlbmd0aCsrLHIucHVzaC5hcHBseShyLHAoblsyXSkpKSxuWzNdJiYoci5wdXNoKFtdKSxyLnB1c2guYXBwbHkocixwKG5bM10pKSkscjtcbn1cbnZhciB2ZXJzaW9uTHQgPSAoYSwgYikgPT4ge1xuXHQvLyBzZWUgd2VicGFjay9saWIvdXRpbC9zZW12ZXIuanMgZm9yIG9yaWdpbmFsIGNvZGVcblx0YT1wYXJzZVZlcnNpb24oYSksYj1wYXJzZVZlcnNpb24oYik7Zm9yKHZhciByPTA7Oyl7aWYocj49YS5sZW5ndGgpcmV0dXJuIHI8Yi5sZW5ndGgmJlwidVwiIT0odHlwZW9mIGJbcl0pWzBdO3ZhciBlPWFbcl0sbj0odHlwZW9mIGUpWzBdO2lmKHI+PWIubGVuZ3RoKXJldHVyblwidVwiPT1uO3ZhciB0PWJbcl0sZj0odHlwZW9mIHQpWzBdO2lmKG4hPWYpcmV0dXJuXCJvXCI9PW4mJlwiblwiPT1mfHwoXCJzXCI9PWZ8fFwidVwiPT1uKTtpZihcIm9cIiE9biYmXCJ1XCIhPW4mJmUhPXQpcmV0dXJuIGU8dDtyKyt9XG59XG52YXIgcmFuZ2VUb1N0cmluZyA9IChyYW5nZSkgPT4ge1xuXHQvLyBzZWUgd2VicGFjay9saWIvdXRpbC9zZW12ZXIuanMgZm9yIG9yaWdpbmFsIGNvZGVcblx0dmFyIHI9cmFuZ2VbMF0sbj1cIlwiO2lmKDE9PT1yYW5nZS5sZW5ndGgpcmV0dXJuXCIqXCI7aWYocisuNSl7bis9MD09cj9cIj49XCI6LTE9PXI/XCI8XCI6MT09cj9cIl5cIjoyPT1yP1wiflwiOnI+MD9cIj1cIjpcIiE9XCI7Zm9yKHZhciBlPTEsYT0xO2E8cmFuZ2UubGVuZ3RoO2ErKyl7ZS0tLG4rPVwidVwiPT0odHlwZW9mKHQ9cmFuZ2VbYV0pKVswXT9cIi1cIjooZT4wP1wiLlwiOlwiXCIpKyhlPTIsdCl9cmV0dXJuIG59dmFyIGc9W107Zm9yKGE9MTthPHJhbmdlLmxlbmd0aDthKyspe3ZhciB0PXJhbmdlW2FdO2cucHVzaCgwPT09dD9cIm5vdChcIitvKCkrXCIpXCI6MT09PXQ/XCIoXCIrbygpK1wiIHx8IFwiK28oKStcIilcIjoyPT09dD9nLnBvcCgpK1wiIFwiK2cucG9wKCk6cmFuZ2VUb1N0cmluZyh0KSl9cmV0dXJuIG8oKTtmdW5jdGlvbiBvKCl7cmV0dXJuIGcucG9wKCkucmVwbGFjZSgvXlxcKCguKylcXCkkLyxcIiQxXCIpfVxufVxudmFyIHNhdGlzZnkgPSAocmFuZ2UsIHZlcnNpb24pID0+IHtcblx0Ly8gc2VlIHdlYnBhY2svbGliL3V0aWwvc2VtdmVyLmpzIGZvciBvcmlnaW5hbCBjb2RlXG5cdGlmKDAgaW4gcmFuZ2Upe3ZlcnNpb249cGFyc2VWZXJzaW9uKHZlcnNpb24pO3ZhciBlPXJhbmdlWzBdLHI9ZTwwO3ImJihlPS1lLTEpO2Zvcih2YXIgbj0wLGk9MSxhPSEwOztpKyssbisrKXt2YXIgZixzLGc9aTxyYW5nZS5sZW5ndGg/KHR5cGVvZiByYW5nZVtpXSlbMF06XCJcIjtpZihuPj12ZXJzaW9uLmxlbmd0aHx8XCJvXCI9PShzPSh0eXBlb2YoZj12ZXJzaW9uW25dKSlbMF0pKXJldHVybiFhfHwoXCJ1XCI9PWc/aT5lJiYhcjpcIlwiPT1nIT1yKTtpZihcInVcIj09cyl7aWYoIWF8fFwidVwiIT1nKXJldHVybiExfWVsc2UgaWYoYSlpZihnPT1zKWlmKGk8PWUpe2lmKGYhPXJhbmdlW2ldKXJldHVybiExfWVsc2V7aWYocj9mPnJhbmdlW2ldOmY8cmFuZ2VbaV0pcmV0dXJuITE7ZiE9cmFuZ2VbaV0mJihhPSExKX1lbHNlIGlmKFwic1wiIT1nJiZcIm5cIiE9Zyl7aWYocnx8aTw9ZSlyZXR1cm4hMTthPSExLGktLX1lbHNle2lmKGk8PWV8fHM8ZyE9cilyZXR1cm4hMTthPSExfWVsc2VcInNcIiE9ZyYmXCJuXCIhPWcmJihhPSExLGktLSl9fXZhciB0PVtdLG89dC5wb3AuYmluZCh0KTtmb3Iobj0xO248cmFuZ2UubGVuZ3RoO24rKyl7dmFyIHU9cmFuZ2Vbbl07dC5wdXNoKDE9PXU/bygpfG8oKToyPT11P28oKSZvKCk6dT9zYXRpc2Z5KHUsdmVyc2lvbik6IW8oKSl9cmV0dXJuISFvKCk7XG59XG52YXIgZW5zdXJlRXhpc3RlbmNlID0gKHNjb3BlTmFtZSwga2V5KSA9PiB7XG5cdHZhciBzY29wZSA9IF9fd2VicGFja19yZXF1aXJlX18uU1tzY29wZU5hbWVdO1xuXHRpZighc2NvcGUgfHwgIV9fd2VicGFja19yZXF1aXJlX18ubyhzY29wZSwga2V5KSkgdGhyb3cgbmV3IEVycm9yKFwiU2hhcmVkIG1vZHVsZSBcIiArIGtleSArIFwiIGRvZXNuJ3QgZXhpc3QgaW4gc2hhcmVkIHNjb3BlIFwiICsgc2NvcGVOYW1lKTtcblx0cmV0dXJuIHNjb3BlO1xufTtcbnZhciBmaW5kVmVyc2lvbiA9IChzY29wZSwga2V5KSA9PiB7XG5cdHZhciB2ZXJzaW9ucyA9IHNjb3BlW2tleV07XG5cdHZhciBrZXkgPSBPYmplY3Qua2V5cyh2ZXJzaW9ucykucmVkdWNlKChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuICFhIHx8IHZlcnNpb25MdChhLCBiKSA/IGIgOiBhO1xuXHR9LCAwKTtcblx0cmV0dXJuIGtleSAmJiB2ZXJzaW9uc1trZXldXG59O1xudmFyIGZpbmRTaW5nbGV0b25WZXJzaW9uS2V5ID0gKHNjb3BlLCBrZXkpID0+IHtcblx0dmFyIHZlcnNpb25zID0gc2NvcGVba2V5XTtcblx0cmV0dXJuIE9iamVjdC5rZXlzKHZlcnNpb25zKS5yZWR1Y2UoKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gIWEgfHwgKCF2ZXJzaW9uc1thXS5sb2FkZWQgJiYgdmVyc2lvbkx0KGEsIGIpKSA/IGIgOiBhO1xuXHR9LCAwKTtcbn07XG52YXIgZ2V0SW52YWxpZFNpbmdsZXRvblZlcnNpb25NZXNzYWdlID0gKHNjb3BlLCBrZXksIHZlcnNpb24sIHJlcXVpcmVkVmVyc2lvbikgPT4ge1xuXHRyZXR1cm4gXCJVbnNhdGlzZmllZCB2ZXJzaW9uIFwiICsgdmVyc2lvbiArIFwiIGZyb20gXCIgKyAodmVyc2lvbiAmJiBzY29wZVtrZXldW3ZlcnNpb25dLmZyb20pICsgXCIgb2Ygc2hhcmVkIHNpbmdsZXRvbiBtb2R1bGUgXCIgKyBrZXkgKyBcIiAocmVxdWlyZWQgXCIgKyByYW5nZVRvU3RyaW5nKHJlcXVpcmVkVmVyc2lvbikgKyBcIilcIlxufTtcbnZhciBnZXRTaW5nbGV0b24gPSAoc2NvcGUsIHNjb3BlTmFtZSwga2V5LCByZXF1aXJlZFZlcnNpb24pID0+IHtcblx0dmFyIHZlcnNpb24gPSBmaW5kU2luZ2xldG9uVmVyc2lvbktleShzY29wZSwga2V5KTtcblx0cmV0dXJuIGdldChzY29wZVtrZXldW3ZlcnNpb25dKTtcbn07XG52YXIgZ2V0U2luZ2xldG9uVmVyc2lvbiA9IChzY29wZSwgc2NvcGVOYW1lLCBrZXksIHJlcXVpcmVkVmVyc2lvbikgPT4ge1xuXHR2YXIgdmVyc2lvbiA9IGZpbmRTaW5nbGV0b25WZXJzaW9uS2V5KHNjb3BlLCBrZXkpO1xuXHRpZiAoIXNhdGlzZnkocmVxdWlyZWRWZXJzaW9uLCB2ZXJzaW9uKSkgd2FybihnZXRJbnZhbGlkU2luZ2xldG9uVmVyc2lvbk1lc3NhZ2Uoc2NvcGUsIGtleSwgdmVyc2lvbiwgcmVxdWlyZWRWZXJzaW9uKSk7XG5cdHJldHVybiBnZXQoc2NvcGVba2V5XVt2ZXJzaW9uXSk7XG59O1xudmFyIGdldFN0cmljdFNpbmdsZXRvblZlcnNpb24gPSAoc2NvcGUsIHNjb3BlTmFtZSwga2V5LCByZXF1aXJlZFZlcnNpb24pID0+IHtcblx0dmFyIHZlcnNpb24gPSBmaW5kU2luZ2xldG9uVmVyc2lvbktleShzY29wZSwga2V5KTtcblx0aWYgKCFzYXRpc2Z5KHJlcXVpcmVkVmVyc2lvbiwgdmVyc2lvbikpIHRocm93IG5ldyBFcnJvcihnZXRJbnZhbGlkU2luZ2xldG9uVmVyc2lvbk1lc3NhZ2Uoc2NvcGUsIGtleSwgdmVyc2lvbiwgcmVxdWlyZWRWZXJzaW9uKSk7XG5cdHJldHVybiBnZXQoc2NvcGVba2V5XVt2ZXJzaW9uXSk7XG59O1xudmFyIGZpbmRWYWxpZFZlcnNpb24gPSAoc2NvcGUsIGtleSwgcmVxdWlyZWRWZXJzaW9uKSA9PiB7XG5cdHZhciB2ZXJzaW9ucyA9IHNjb3BlW2tleV07XG5cdHZhciBrZXkgPSBPYmplY3Qua2V5cyh2ZXJzaW9ucykucmVkdWNlKChhLCBiKSA9PiB7XG5cdFx0aWYgKCFzYXRpc2Z5KHJlcXVpcmVkVmVyc2lvbiwgYikpIHJldHVybiBhO1xuXHRcdHJldHVybiAhYSB8fCB2ZXJzaW9uTHQoYSwgYikgPyBiIDogYTtcblx0fSwgMCk7XG5cdHJldHVybiBrZXkgJiYgdmVyc2lvbnNba2V5XVxufTtcbnZhciBnZXRJbnZhbGlkVmVyc2lvbk1lc3NhZ2UgPSAoc2NvcGUsIHNjb3BlTmFtZSwga2V5LCByZXF1aXJlZFZlcnNpb24pID0+IHtcblx0dmFyIHZlcnNpb25zID0gc2NvcGVba2V5XTtcblx0cmV0dXJuIFwiTm8gc2F0aXNmeWluZyB2ZXJzaW9uIChcIiArIHJhbmdlVG9TdHJpbmcocmVxdWlyZWRWZXJzaW9uKSArIFwiKSBvZiBzaGFyZWQgbW9kdWxlIFwiICsga2V5ICsgXCIgZm91bmQgaW4gc2hhcmVkIHNjb3BlIFwiICsgc2NvcGVOYW1lICsgXCIuXFxuXCIgK1xuXHRcdFwiQXZhaWxhYmxlIHZlcnNpb25zOiBcIiArIE9iamVjdC5rZXlzKHZlcnNpb25zKS5tYXAoKGtleSkgPT4ge1xuXHRcdHJldHVybiBrZXkgKyBcIiBmcm9tIFwiICsgdmVyc2lvbnNba2V5XS5mcm9tO1xuXHR9KS5qb2luKFwiLCBcIik7XG59O1xudmFyIGdldFZhbGlkVmVyc2lvbiA9IChzY29wZSwgc2NvcGVOYW1lLCBrZXksIHJlcXVpcmVkVmVyc2lvbikgPT4ge1xuXHR2YXIgZW50cnkgPSBmaW5kVmFsaWRWZXJzaW9uKHNjb3BlLCBrZXksIHJlcXVpcmVkVmVyc2lvbik7XG5cdGlmKGVudHJ5KSByZXR1cm4gZ2V0KGVudHJ5KTtcblx0dGhyb3cgbmV3IEVycm9yKGdldEludmFsaWRWZXJzaW9uTWVzc2FnZShzY29wZSwgc2NvcGVOYW1lLCBrZXksIHJlcXVpcmVkVmVyc2lvbikpO1xufTtcbnZhciB3YXJuID0gKG1zZykgPT4ge1xuXHRpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4obXNnKTtcbn07XG52YXIgd2FybkludmFsaWRWZXJzaW9uID0gKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgcmVxdWlyZWRWZXJzaW9uKSA9PiB7XG5cdHdhcm4oZ2V0SW52YWxpZFZlcnNpb25NZXNzYWdlKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgcmVxdWlyZWRWZXJzaW9uKSk7XG59O1xudmFyIGdldCA9IChlbnRyeSkgPT4ge1xuXHRlbnRyeS5sb2FkZWQgPSAxO1xuXHRyZXR1cm4gZW50cnkuZ2V0KClcbn07XG52YXIgaW5pdCA9IChmbikgPT4gKGZ1bmN0aW9uKHNjb3BlTmFtZSwgYSwgYiwgYykge1xuXHR2YXIgcHJvbWlzZSA9IF9fd2VicGFja19yZXF1aXJlX18uSShzY29wZU5hbWUpO1xuXHRpZiAocHJvbWlzZSAmJiBwcm9taXNlLnRoZW4pIHJldHVybiBwcm9taXNlLnRoZW4oZm4uYmluZChmbiwgc2NvcGVOYW1lLCBfX3dlYnBhY2tfcmVxdWlyZV9fLlNbc2NvcGVOYW1lXSwgYSwgYiwgYykpO1xuXHRyZXR1cm4gZm4oc2NvcGVOYW1lLCBfX3dlYnBhY2tfcmVxdWlyZV9fLlNbc2NvcGVOYW1lXSwgYSwgYiwgYyk7XG59KTtcblxudmFyIGxvYWQgPSAvKiNfX1BVUkVfXyovIGluaXQoKHNjb3BlTmFtZSwgc2NvcGUsIGtleSkgPT4ge1xuXHRlbnN1cmVFeGlzdGVuY2Uoc2NvcGVOYW1lLCBrZXkpO1xuXHRyZXR1cm4gZ2V0KGZpbmRWZXJzaW9uKHNjb3BlLCBrZXkpKTtcbn0pO1xudmFyIGxvYWRGYWxsYmFjayA9IC8qI19fUFVSRV9fKi8gaW5pdCgoc2NvcGVOYW1lLCBzY29wZSwga2V5LCBmYWxsYmFjaykgPT4ge1xuXHRyZXR1cm4gc2NvcGUgJiYgX193ZWJwYWNrX3JlcXVpcmVfXy5vKHNjb3BlLCBrZXkpID8gZ2V0KGZpbmRWZXJzaW9uKHNjb3BlLCBrZXkpKSA6IGZhbGxiYWNrKCk7XG59KTtcbnZhciBsb2FkVmVyc2lvbkNoZWNrID0gLyojX19QVVJFX18qLyBpbml0KChzY29wZU5hbWUsIHNjb3BlLCBrZXksIHZlcnNpb24pID0+IHtcblx0ZW5zdXJlRXhpc3RlbmNlKHNjb3BlTmFtZSwga2V5KTtcblx0cmV0dXJuIGdldChmaW5kVmFsaWRWZXJzaW9uKHNjb3BlLCBrZXksIHZlcnNpb24pIHx8IHdhcm5JbnZhbGlkVmVyc2lvbihzY29wZSwgc2NvcGVOYW1lLCBrZXksIHZlcnNpb24pIHx8IGZpbmRWZXJzaW9uKHNjb3BlLCBrZXkpKTtcbn0pO1xudmFyIGxvYWRTaW5nbGV0b24gPSAvKiNfX1BVUkVfXyovIGluaXQoKHNjb3BlTmFtZSwgc2NvcGUsIGtleSkgPT4ge1xuXHRlbnN1cmVFeGlzdGVuY2Uoc2NvcGVOYW1lLCBrZXkpO1xuXHRyZXR1cm4gZ2V0U2luZ2xldG9uKHNjb3BlLCBzY29wZU5hbWUsIGtleSk7XG59KTtcbnZhciBsb2FkU2luZ2xldG9uVmVyc2lvbkNoZWNrID0gLyojX19QVVJFX18qLyBpbml0KChzY29wZU5hbWUsIHNjb3BlLCBrZXksIHZlcnNpb24pID0+IHtcblx0ZW5zdXJlRXhpc3RlbmNlKHNjb3BlTmFtZSwga2V5KTtcblx0cmV0dXJuIGdldFNpbmdsZXRvblZlcnNpb24oc2NvcGUsIHNjb3BlTmFtZSwga2V5LCB2ZXJzaW9uKTtcbn0pO1xudmFyIGxvYWRTdHJpY3RWZXJzaW9uQ2hlY2sgPSAvKiNfX1BVUkVfXyovIGluaXQoKHNjb3BlTmFtZSwgc2NvcGUsIGtleSwgdmVyc2lvbikgPT4ge1xuXHRlbnN1cmVFeGlzdGVuY2Uoc2NvcGVOYW1lLCBrZXkpO1xuXHRyZXR1cm4gZ2V0VmFsaWRWZXJzaW9uKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgdmVyc2lvbik7XG59KTtcbnZhciBsb2FkU3RyaWN0U2luZ2xldG9uVmVyc2lvbkNoZWNrID0gLyojX19QVVJFX18qLyBpbml0KChzY29wZU5hbWUsIHNjb3BlLCBrZXksIHZlcnNpb24pID0+IHtcblx0ZW5zdXJlRXhpc3RlbmNlKHNjb3BlTmFtZSwga2V5KTtcblx0cmV0dXJuIGdldFN0cmljdFNpbmdsZXRvblZlcnNpb24oc2NvcGUsIHNjb3BlTmFtZSwga2V5LCB2ZXJzaW9uKTtcbn0pO1xudmFyIGxvYWRWZXJzaW9uQ2hlY2tGYWxsYmFjayA9IC8qI19fUFVSRV9fKi8gaW5pdCgoc2NvcGVOYW1lLCBzY29wZSwga2V5LCB2ZXJzaW9uLCBmYWxsYmFjaykgPT4ge1xuXHRpZighc2NvcGUgfHwgIV9fd2VicGFja19yZXF1aXJlX18ubyhzY29wZSwga2V5KSkgcmV0dXJuIGZhbGxiYWNrKCk7XG5cdHJldHVybiBnZXQoZmluZFZhbGlkVmVyc2lvbihzY29wZSwga2V5LCB2ZXJzaW9uKSB8fCB3YXJuSW52YWxpZFZlcnNpb24oc2NvcGUsIHNjb3BlTmFtZSwga2V5LCB2ZXJzaW9uKSB8fCBmaW5kVmVyc2lvbihzY29wZSwga2V5KSk7XG59KTtcbnZhciBsb2FkU2luZ2xldG9uRmFsbGJhY2sgPSAvKiNfX1BVUkVfXyovIGluaXQoKHNjb3BlTmFtZSwgc2NvcGUsIGtleSwgZmFsbGJhY2spID0+IHtcblx0aWYoIXNjb3BlIHx8ICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oc2NvcGUsIGtleSkpIHJldHVybiBmYWxsYmFjaygpO1xuXHRyZXR1cm4gZ2V0U2luZ2xldG9uKHNjb3BlLCBzY29wZU5hbWUsIGtleSk7XG59KTtcbnZhciBsb2FkU2luZ2xldG9uVmVyc2lvbkNoZWNrRmFsbGJhY2sgPSAvKiNfX1BVUkVfXyovIGluaXQoKHNjb3BlTmFtZSwgc2NvcGUsIGtleSwgdmVyc2lvbiwgZmFsbGJhY2spID0+IHtcblx0aWYoIXNjb3BlIHx8ICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oc2NvcGUsIGtleSkpIHJldHVybiBmYWxsYmFjaygpO1xuXHRyZXR1cm4gZ2V0U2luZ2xldG9uVmVyc2lvbihzY29wZSwgc2NvcGVOYW1lLCBrZXksIHZlcnNpb24pO1xufSk7XG52YXIgbG9hZFN0cmljdFZlcnNpb25DaGVja0ZhbGxiYWNrID0gLyojX19QVVJFX18qLyBpbml0KChzY29wZU5hbWUsIHNjb3BlLCBrZXksIHZlcnNpb24sIGZhbGxiYWNrKSA9PiB7XG5cdHZhciBlbnRyeSA9IHNjb3BlICYmIF9fd2VicGFja19yZXF1aXJlX18ubyhzY29wZSwga2V5KSAmJiBmaW5kVmFsaWRWZXJzaW9uKHNjb3BlLCBrZXksIHZlcnNpb24pO1xuXHRyZXR1cm4gZW50cnkgPyBnZXQoZW50cnkpIDogZmFsbGJhY2soKTtcbn0pO1xudmFyIGxvYWRTdHJpY3RTaW5nbGV0b25WZXJzaW9uQ2hlY2tGYWxsYmFjayA9IC8qI19fUFVSRV9fKi8gaW5pdCgoc2NvcGVOYW1lLCBzY29wZSwga2V5LCB2ZXJzaW9uLCBmYWxsYmFjaykgPT4ge1xuXHRpZighc2NvcGUgfHwgIV9fd2VicGFja19yZXF1aXJlX18ubyhzY29wZSwga2V5KSkgcmV0dXJuIGZhbGxiYWNrKCk7XG5cdHJldHVybiBnZXRTdHJpY3RTaW5nbGV0b25WZXJzaW9uKHNjb3BlLCBzY29wZU5hbWUsIGtleSwgdmVyc2lvbik7XG59KTtcbnZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG52YXIgbW9kdWxlVG9IYW5kbGVyTWFwcGluZyA9IHtcblx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L3JlYWN0L3JlYWN0XCI6ICgpID0+IChsb2FkU2luZ2xldG9uVmVyc2lvbkNoZWNrRmFsbGJhY2soXCJkZWZhdWx0XCIsIFwicmVhY3RcIiwgWzEsMTgsMiwwXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uZShcInZlbmRvcnMtX3lhcm5fYmVycnlfY2FjaGVfcmVhY3QtbnBtLTE3XzBfMi05OWJhMzdkOTMxLTEwYzBfemlwX25vZGVfbW9kdWxlc19yZWFjdF9pbmRleF9qc1wiKS50aGVuKCgpID0+ICgoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgcmVhY3QgKi8gXCIuLi8uLi8ueWFybi9iZXJyeS9jYWNoZS9yZWFjdC1ucG0tMTcuMC4yLTk5YmEzN2Q5MzEtMTBjMC56aXAvbm9kZV9tb2R1bGVzL3JlYWN0L2luZGV4LmpzXCIpKSkpKSkpLFxuXHRcIndlYnBhY2svc2hhcmluZy9jb25zdW1lL2RlZmF1bHQvcmVhY3QtaTE4bmV4dC9yZWFjdC1pMThuZXh0XCI6ICgpID0+IChsb2FkU3RyaWN0VmVyc2lvbkNoZWNrRmFsbGJhY2soXCJkZWZhdWx0XCIsIFwicmVhY3QtaTE4bmV4dFwiLCBbMSwxNCwxLDBdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5lKFwidmVuZG9ycy1feWFybl9fX3ZpcnR1YWxfX19yZWFjdC1pMThuZXh0LXZpcnR1YWwtM2M4MWZhNDc5MF8zX3lhcm5fYmVycnlfY2FjaGVfcmVhY3QtaTE4bmV4dC1uLTU2ZGY2N1wiKS50aGVuKCgpID0+ICgoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgcmVhY3QtaTE4bmV4dCAqLyBcIi4vLnlhcm4vX192aXJ0dWFsX18vcmVhY3QtaTE4bmV4dC12aXJ0dWFsLTNjODFmYTQ3OTAvMy8ueWFybi9iZXJyeS9jYWNoZS9yZWFjdC1pMThuZXh0LW5wbS0xNC4xLjAtMGI5MTIyZmYzMC0xMGMwLnppcC9ub2RlX21vZHVsZXMvcmVhY3QtaTE4bmV4dC9kaXN0L2VzL2luZGV4LmpzXCIpKSkpKSkpXG59O1xuLy8gbm8gY29uc3VtZXMgaW4gaW5pdGlhbCBjaHVua3NcbnZhciBjaHVua01hcHBpbmcgPSB7XG5cdFwid2VicGFja19zaGFyaW5nX2NvbnN1bWVfZGVmYXVsdF9yZWFjdF9yZWFjdFwiOiBbXG5cdFx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L3JlYWN0L3JlYWN0XCJcblx0XSxcblx0XCJ3ZWJwYWNrX3NoYXJpbmdfY29uc3VtZV9kZWZhdWx0X3JlYWN0LWkxOG5leHRfcmVhY3QtaTE4bmV4dFwiOiBbXG5cdFx0XCJ3ZWJwYWNrL3NoYXJpbmcvY29uc3VtZS9kZWZhdWx0L3JlYWN0LWkxOG5leHQvcmVhY3QtaTE4bmV4dFwiXG5cdF1cbn07XG52YXIgc3RhcnRlZEluc3RhbGxNb2R1bGVzID0ge307XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmYuY29uc3VtZXMgPSAoY2h1bmtJZCwgcHJvbWlzZXMpID0+IHtcblx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGNodW5rTWFwcGluZywgY2h1bmtJZCkpIHtcblx0XHRjaHVua01hcHBpbmdbY2h1bmtJZF0uZm9yRWFjaCgoaWQpID0+IHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRNb2R1bGVzLCBpZCkpIHJldHVybiBwcm9taXNlcy5wdXNoKGluc3RhbGxlZE1vZHVsZXNbaWRdKTtcblx0XHRcdGlmKCFzdGFydGVkSW5zdGFsbE1vZHVsZXNbaWRdKSB7XG5cdFx0XHR2YXIgb25GYWN0b3J5ID0gKGZhY3RvcnkpID0+IHtcblx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tpZF0gPSAwO1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1baWRdID0gKG1vZHVsZSkgPT4ge1xuXHRcdFx0XHRcdGRlbGV0ZSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbaWRdO1xuXHRcdFx0XHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0c3RhcnRlZEluc3RhbGxNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0XHR2YXIgb25FcnJvciA9IChlcnJvcikgPT4ge1xuXHRcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1tpZF07XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVtpZF0gPSAobW9kdWxlKSA9PiB7XG5cdFx0XHRcdFx0ZGVsZXRlIF9fd2VicGFja19yZXF1aXJlX18uY1tpZF07XG5cdFx0XHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG1vZHVsZVRvSGFuZGxlck1hcHBpbmdbaWRdKCk7XG5cdFx0XHRcdGlmKHByb21pc2UudGhlbikge1xuXHRcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkTW9kdWxlc1tpZF0gPSBwcm9taXNlLnRoZW4ob25GYWN0b3J5KVsnY2F0Y2gnXShvbkVycm9yKSk7XG5cdFx0XHRcdH0gZWxzZSBvbkZhY3RvcnkocHJvbWlzZSk7XG5cdFx0XHR9IGNhdGNoKGUpIHsgb25FcnJvcihlKTsgfVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibHV4ZS1qYWhpYS1kZW1vXCI6IDBcbn07XG5cbl9fd2VicGFja19yZXF1aXJlX18uZi5qID0gKGNodW5rSWQsIHByb21pc2VzKSA9PiB7XG5cdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSA/IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA6IHVuZGVmaW5lZDtcblx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cblx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG5cdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcblx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYoIS9ed2VicGFja19zaGFyaW5nX2NvbnN1bWVfZGVmYXVsdF9yZWFjdChcXC1pMThuZXh0X3JlYWN0XFwtaTE4bmV4fF9yZWFjKXQkLy50ZXN0KGNodW5rSWQpKSB7XG5cdFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuXHRcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gKGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdKSk7XG5cdFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuXHRcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcblx0XHRcdFx0XHR2YXIgdXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy51KGNodW5rSWQpO1xuXHRcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcblx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcblx0XHRcdFx0XHR2YXIgbG9hZGluZ0VuZGVkID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSkge1xuXHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG5cdFx0XHRcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuXHRcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuXHRcdFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YVsxXShlcnJvcik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubCh1cmwsIGxvYWRpbmdFbmRlZCwgXCJjaHVuay1cIiArIGNodW5rSWQsIGNodW5rSWQpO1xuXHRcdFx0XHR9IGVsc2UgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0XHRcdH1cblx0XHR9XG59O1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbHV4ZV9qYWhpYV9kZW1vXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2x1eGVfamFoaWFfZGVtb1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gbW9kdWxlIGNhY2hlIGFyZSB1c2VkIHNvIGVudHJ5IGlubGluaW5nIGlzIGRpc2FibGVkXG4vLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9jbGllbnQvaW5kZXguanNcIik7XG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCJ3ZWJwYWNrL2NvbnRhaW5lci9lbnRyeS9sdXhlLWphaGlhLWRlbW9cIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=