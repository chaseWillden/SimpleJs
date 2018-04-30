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
})({18:[function(require,module,exports) {
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
},{}],10:[function(require,module,exports) {
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
    SimpleElement.prototype.setValue = function (val) {
        if (Types_1["default"].IsInputEle(this.ele)) {
            this.ele.value = val;
        } else {
            this.ele.innerText = val;
        }
    };
    /**
     * Get value if an input
     */
    SimpleElement.prototype.getValue = function () {
        if (Types_1["default"].IsInputEle(this.ele)) {
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
            try {
                this.ele.appendChild(child.ele);
                this.children.push(child);
            } catch (e) {
                console.error(e);
            }
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
},{"../Utils/Types":9,"../Utils/Logging":18}],9:[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var Simple_1 = __importDefault(require("../Simple"));
var SimpleElement_1 = __importDefault(require("../Dom/SimpleElement"));
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
    /**
     * Check if value is a simple
     * @param val
     */
    Types.IsSimple = function (val) {
        return val instanceof Simple_1["default"];
    };
    /**
     * Check if value is a SimpleElement
     * @param val
     */
    Types.IsSimpleElement = function (val) {
        return val instanceof SimpleElement_1["default"];
    };
    /**
     * Is number
     * @param val
     */
    Types.IsNumber = function (val) {
        return typeof val === 'number';
    };
    /**
     * Is input element
     * @param val
     */
    Types.IsInputEle = function (val) {
        return val instanceof HTMLInputElement;
    };
    return Types;
}();
exports["default"] = Types;
},{"../Simple":6,"../Dom/SimpleElement":10}],11:[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
exports.__esModule = true;
var Simple_1 = __importDefault(require("../Simple"));
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
        this.checkIfNumberAndRender();
    };
    Render.prototype.checkIfNumberAndRender = function () {
        if (Types_1["default"].IsNumber(this.data)) {
            this.simple.setValue(this.data);
        }
    };
    /**
     * Check if its an object and render
     */
    Render.prototype.checkIfObjectAndRender = function () {
        if (Types_1["default"].IsObject(this.data)) {
            var keys = Object.keys(this.data);
            for (var i = 0; i < keys.length; i++) {
                var child = this.data[keys[i]];
                var simple = new Simple_1["default"]({ data: child, root: this.simple.el });
            }
        }
    };
    /**
     * Check if the data is an array and render each
     * child
     */
    Render.prototype.checkIfArrayAndRender = function () {
        if (Types_1["default"].IsArray(this.data)) {
            var ul = new Simple_1["default"]({ type: 'ul', root: this.simple });
            for (var i = 0; i < this.data.length; i++) {
                var li = new Simple_1["default"]({ type: 'li', root: ul });
                var child = new Simple_1["default"]({ data: this.data[i], root: li });
            }
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
            this.simple.appendString(this.data);
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
        if (Types_1["default"].IsSimple(this.data)) {
            var children = this.data.render();
            this.simple.addChild(this.data);
        }
    };
    return Render;
}();
exports["default"] = Render;
},{"../Simple":6,"../Utils/Types":9}],6:[function(require,module,exports) {
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
    Simple.prototype.setValue = function (val) {
        if (!this.el) {
            throw new Error('Issues');
        } else {
            this.el.setValue(val);
        }
    };
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
        if (this.el && simple.el) {
            this.children.push(simple);
            this.el.appendChild(simple.el);
        }
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
        } else if (Types_1["default"].IsSimpleElement(root)) {
            this.el = root;
        } else if (Types_1["default"].IsSimple(root)) {
            var sim = root;
            this.el = sim.el;
            sim.children.push(this);
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
},{"./Utils/Types":9,"./Dom/SimpleElement":10,"./Render/Render":11}],4:[function(require,module,exports) {
'use strict';

var _Simple = require('./Simple');

var _Simple2 = _interopRequireDefault(_Simple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var input = new _Simple2.default({
	type: 'input',
	data: 3
});

new _Simple2.default({
	root: 'root',
	// data: input,
	// data: 'This is a test ' + input
	data: ['This is a test', 'And another one', 'And another one']
	// data: {
	// 	1: [
	// 		'This is a test',
	// 		'And another one',
	//     'And another one'
	// 	]
	// }
	// data: {
	// 	1: [
	// 		'This is a test',
	// 		'This is another test',
	// 		'And another one ' + input
	// 	],
	// 	2: input
	// }
	// data: {
	//   1: 'This is a test',
	//   table: [
	//     ['Row'],
	//     ['Column']
	//   ]
	// }
});

console.log(_Simple2.default.__getCache());
},{"./Simple":6}]},{},[4])
//# sourceMappingURL=/src.c6c93497.map