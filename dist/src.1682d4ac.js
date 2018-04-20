// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({7:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var objectConstructor = {}.constructor;
var Types = /** @class */function () {
    function Types() {}
    /**
     * Check if an object is a string
     * @param {any} val [description]
     */
    Types.IsString = function (val) {
        return typeof val === 'string';
    };
    /**
     * Check if an object is an array
     * @param {any} val [description]
     */
    Types.IsArray = function (val) {
        return Array.isArray(val);
    };
    /**
     * Check if an object is an object
     * @param {any} val [description]
     */
    Types.IsObject = function (val) {
        return val && val.constructor === objectConstructor;
    };
    /**
     * Check if it's an html element
     * @param {any} val [description]
     */
    Types.IsHtmlElement = function (val) {
        return val instanceof HTMLElement;
    };
    return Types;
}();
exports["default"] = Types;
},{}],16:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var Logging = /** @class */function () {
    function Logging() {}
    /**
     * Send a warning log message
     * @param {string} msg [description]
     */
    Logging.Warn = function (msg) {
        console.warn(msg);
    };
    /**
     * Throw an error
     * @param {string} msg [description]
     */
    Logging.Error = function (msg) {
        throw new Error(msg);
    };
    return Logging;
}();
exports["default"] = Logging;
},{}],8:[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var Types_1 = __importDefault(require("../Utils/Types"));
var Logging_1 = __importDefault(require("../Utils/Logging"));
var SimpleElement = /** @class */function () {
    function SimpleElement(options) {
        this.children = [];
        if (options instanceof SimpleElement) {
            this.ele = options.ele;
        } else if (Types_1["default"].IsHtmlElement(options)) {
            this.ele = options;
        } else {
            Logging_1["default"].Error('Unexpected type');
        }
    }
    /**
     * Get value if an input
     */
    SimpleElement.prototype.getValue = function () {
        if (this.ele instanceof HTMLInputElement) {
            return this.ele.value;
        }
        return '';
    };
    /**
     * Append string as text
     * @param {string} val [description]
     */
    SimpleElement.prototype.appendString = function (val) {
        this.ele.innerText += val;
    };
    /**
     * Append a child to the DOM
     * @param {SimpleElement} child [description]
     */
    SimpleElement.prototype.appendChild = function (child) {
        if (Types_1["default"].IsArray(child)) {
            for (var i = 0; i < child.length; i++) {
                this.ele.appendChild(child[i].ele);
                this.children.push(child[i]);
            }
        } else if (Types_1["default"].IsHtmlElement(child.ele)) {
            this.ele.appendChild(child.ele);
            this.children.push(child);
        }
    };
    /**
     * Create a new SimpleElement from a tag
     * @param {string} name [description]
     */
    SimpleElement.FromTag = function (name) {
        if (Types_1["default"].IsString(name)) {
            var eles = document.querySelectorAll(name);
            if (eles.length > 1) {
                Logging_1["default"].Warn('Found multiple elements with the tag "' + name + '", using the first');
            }
            return new SimpleElement(eles[0]);
        } else {
            Logging_1["default"].Error('Expected a tag name');
        }
    };
    /**
     * Create new simple element from tag name
     * @param  {string}        tagName [description]
     * @return {SimpleElement}         [description]
     */
    SimpleElement.Create = function (tagName) {
        var ele = document.createElement(tagName);
        return new SimpleElement(ele);
    };
    return SimpleElement;
}();
exports["default"] = SimpleElement;
},{"../Utils/Types":7,"../Utils/Logging":16}],9:[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var Simple_1 = __importDefault(require("../Simple"));
var SimpleElement_1 = __importDefault(require("../Dom/SimpleElement"));
var Types_1 = __importDefault(require("../Utils/Types"));
/**
 * A renderer is only in charge of its node and all children nodes
 */
var Render = /** @class */function () {
    function Render(simple) {
        this.simple = simple;
    }
    /**
     * Construct tree from children nodes
     * @return {SimpleElement} [description]
     */
    Render.prototype.constructTree = function () {
        var children = this.simple.render();
        var el = this.simple.el;
        el.appendChild(children);
        return el;
    };
    /**
     * Render the tree
     */
    Render.prototype.init = function () {
        this.data = this.simple.getData();
        this.checkIfSimpleAndRender();
        this.checkIfStringAndRender();
        this.checkIfObjectAndRender();
        this.checkIfArrayAndRender();
    };
    /**
     * Check if its an object and render
     */
    Render.prototype.checkIfObjectAndRender = function () {
        if (Types_1["default"].IsObject(this.data)) {
            this.simple.el = SimpleElement_1["default"].Create('div');
            var keys = Object.keys(this.data);
            for (var i = 0; i < keys.length; i++) {
                var child = this.data[keys[i]];
                var simple = new Simple_1["default"]({ data: child });
                this.simple.addChild(simple);
            }
        }
    };
    /**
     * Check if the data is an array and render each
     * child
     */
    Render.prototype.checkIfArrayAndRender = function () {
        if (Types_1["default"].IsArray(this.data)) {
            var ul = new Simple_1["default"]({ type: 'ul' });
            for (var i = 0; i < this.data.length; i++) {
                var li = new Simple_1["default"]({ type: 'li' });
                var child = new Simple_1["default"]({ data: this.data[i] });
                li.addChild(child);
                ul.addChild(li);
            }
            this.simple.addChild(ul);
        }
    };
    /**
     * Check if data is a string and set the values
     */
    Render.prototype.checkIfStringAndRender = function () {
        if (Types_1["default"].IsString(this.data)) {
            var matched = this.data.match(/__SIMPLE__::([0-9]+)/g);
            if (!matched) {
                return this.simple.appendString(this.data);
            }
            this.replaceKeyWithValue(matched);
            this.simple.el.appendString(this.data);
        }
    };
    /**
     * Replace key with value
     * @param {string[]} matched [description]
     */
    Render.prototype.replaceKeyWithValue = function (matched) {
        for (var i = 0; i < matched.length; i++) {
            var match = matched[i];
            var simple = Simple_1["default"].__getFromCache(match);
            if (!simple) continue;
            var value = simple.el.getValue();
            var regex = new RegExp(match, 'g');
            this.data = this.data.replace(regex, value);
        }
    };
    /**
     * Check if a simple object and render
     */
    Render.prototype.checkIfSimpleAndRender = function () {
        if (this.data instanceof Simple_1["default"]) {
            var children = this.data.render();
            this.simple.addChild(this.data);
        }
    };
    return Render;
}();
exports["default"] = Render;
},{"../Simple":4,"../Dom/SimpleElement":8,"../Utils/Types":7}],4:[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var Types_1 = __importDefault(require("./Utils/Types"));
var SimpleElement_1 = __importDefault(require("./Dom/SimpleElement"));
var Render_1 = __importDefault(require("./Render/Render"));
var _cache = {};
var totalObjects = 0;
var Simple = /** @class */function () {
    function Simple(options) {
        this.el = null;
        this.children = [];
        this.isRendered = false;
        this.options = options || {};
        this.setRoot();
        this.setType();
        this.setKey();
        this.renderer = new Render_1["default"](this);
        _cache[this.key] = this;
        this.renderer.init();
        this.isRendered = true;
    }
    /**
     * Append a string
     * @param val
     */
    Simple.prototype.appendString = function (val) {
        if (this.el) {
            this.el.appendString(val);
        } else {
            this.el = SimpleElement_1["default"].Create('text');
            this.appendString(val);
        }
    };
    /**
     * Add children
     * @param simples
     */
    Simple.prototype.addChildren = function (simples) {
        this.children = this.children.concat(simples);
        for (var i = 0; i < simples.length; i++) {
            this.el.appendChild(simples[i].el);
        }
    };
    /**
     * Add child to tree
     * @param simple
     */
    Simple.prototype.addChild = function (simple) {
        this.children.push(simple);
        this.el.appendChild(simple.el);
    };
    /**
     * Render the simple object
     */
    Simple.prototype.render = function () {
        if (this.isRendered) {
            return this.renderedResults || this.el;
        }
        this.renderedResults = this.renderer.constructTree();
        return this.renderedResults;
    };
    /**
     * Shortcut method
     */
    Simple.prototype.getData = function () {
        return this.options.data;
    };
    /**
     * Override tostring
     */
    Simple.prototype.toString = function () {
        return this.key;
    };
    /**
     * Set generated key
     */
    Simple.prototype.setKey = function () {
        this.key = '__SIMPLE__::' + totalObjects++;
    };
    /**
     * Set type by node name
     */
    Simple.prototype.setType = function () {
        var type = this.options.type;
        if (Types_1["default"].IsString(type)) {
            this.el = SimpleElement_1["default"].Create(type);
        }
    };
    /**
     * Set the root element
     */
    Simple.prototype.setRoot = function () {
        var root = this.options.root;
        if (Types_1["default"].IsString(root)) {
            this.el = SimpleElement_1["default"].FromTag(root);
        } else if (Types_1["default"].IsHtmlElement(root)) {
            this.el = new SimpleElement_1["default"](root);
        }
    };
    /**
     * Really an exposed private method for debugging
     */
    Simple.__getCache = function () {
        return _cache;
    };
    /**
     * Get simple from cache
     * @param {string} name [description]
     */
    Simple.__getFromCache = function (name) {
        return _cache[name];
    };
    return Simple;
}();
exports["default"] = Simple;
},{"./Utils/Types":7,"./Dom/SimpleElement":8,"./Render/Render":9}],2:[function(require,module,exports) {
'use strict';

var _Simple = require('./Simple');

var _Simple2 = _interopRequireDefault(_Simple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var input = new _Simple2.default({
	type: 'input'
});

new _Simple2.default({
	root: 'root',
	// data: input,
	// data: 'This is a test ' + input
	// data: [
	// 	'This is a test',
	// 	'And another one',
	// 	'And another one'
	// ]
	data: {
		1: ['This is a test', 'And another one', 'And another one']
		// data: {
		// 	1: [
		// 		'This is a test',
		// 		'This is another test',
		// 		'And another one ' + input
		// 	],
		// 	2: input
		// }
	} });

console.log(_Simple2.default.__getCache());
},{"./Simple":4}],26:[function(require,module,exports) {

var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '62483' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[26,2])
//# sourceMappingURL=/src.1682d4ac.map