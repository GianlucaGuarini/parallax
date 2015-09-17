(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Parallax"] = factory();
	else
		root["Parallax"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _helpersHelpers = __webpack_require__(1);

	var _helpersHelpers2 = _interopRequireDefault(_helpersHelpers);

	var _Stage = __webpack_require__(2);

	var _Stage2 = _interopRequireDefault(_Stage);

	var _Wrapper = __webpack_require__(4);

	var _Wrapper2 = _interopRequireDefault(_Wrapper);

	/**
	 * There is no need to listen several times all the window events
	 * with this class we listen them once and we subscribe/unsubscribe all the Parallax instances to the main events dispatcher
	 * @type {Stage}
	 */
	var stage = new _Stage2['default']();

	/**
	 * @class
	 * An awesome script
	 */

	var Parallax = (function () {
	  function Parallax(el, opts) {
	    var _this = this;

	    _classCallCheck(this, Parallax);

	    this.wrapper = new _Wrapper2['default'](el);
	    stage.on('resize', function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return _this.onResize.apply(_this, args);
	    });
	    stage.on('scroll', function () {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      return _this.onScroll.apply(_this, args);
	    });
	  }

	  /**
	   * Callback triggered on scroll
	   * @param   { Number } scrollTop - page offset top
	   * @returns { Object } - Parallax
	   */

	  _createClass(Parallax, [{
	    key: 'onScroll',
	    value: function onScroll(scrollTop) {
	      console.log(scrollTop);
	      return this;
	    }

	    /**
	     * Callback triggered on window resize
	     * @param   { Object } size - object containing the window width and height
	     * @returns { Object } - Parallax
	     */
	  }, {
	    key: 'onResize',
	    value: function onResize(size) {
	      return this;
	    }
	  }]);

	  return Parallax;
	})();

	exports['default'] = Parallax;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * @module hepers
	 * All the helper functions needed in this project
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {};
	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * This class listens all the window events that could be reused by the Parallax instance
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _riotObservable = __webpack_require__(3);

	var _riotObservable2 = _interopRequireDefault(_riotObservable);

	var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (cb) {
	  setTimeout(cb, 1000 / 60);
	},
	    RESIZE_DELAY = 200;

	var Stage = (function () {
	  function Stage() {
	    _classCallCheck(this, Stage);

	    // make this object observable
	    observable(this);
	    this.tick = false;
	    this.resizeTimer = null;
	    this.bind();
	  }

	  /**
	   * Bind the window on scroll
	   * @returns { Object } - Stage
	   */

	  _createClass(Stage, [{
	    key: 'bind',
	    value: function bind() {
	      var _this = this;

	      window.addEventListener('mousewheel', function (e) {
	        return _this.scroll(e);
	      }, true);
	      window.addEventListener('scroll', function (e) {
	        return _this.scroll(e);
	      }, true);
	      window.addEventListener('resize', function () {
	        return _this.resize();
	      }, true);
	      window.addEventListener('orientationchange', function () {
	        return _this.resize();
	      }, true);

	      return this;
	    }

	    /**
	     * Handle a smooth scroll event dispatching the scrolling event outside
	     * @returns { Object } - Stage
	     */
	  }, {
	    key: 'scroll',
	    value: function scroll() {
	      var _this2 = this;

	      if (!this.tick) {
	        this.tick = !this.tick;
	        rAF(function () {
	          _this2.trigger('scroll', _this2.scrollTop);
	          _this2.tick = !_this2.tick;
	        });
	      }
	      return this;
	    }

	    /**
	     * Handle the resize event debouncing it
	     * @returns { Object } - Stage
	     */
	  }, {
	    key: 'resize',
	    value: function resize() {
	      var _this3 = this;

	      if (this.resizeTimer) clearTimeout(this.resizeTimer);
	      this.resizeTimer = setTimeout(function () {
	        return _this3.trigger('resize', _this3.size);
	      }, RESIZE_DELAY);
	      return this;
	    }

	    /**
	     * It returns the window scroll top position
	     * @returns { Number } - window offset top
	     */
	  }, {
	    key: 'scrollTop',
	    get: function get() {
	      var top = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
	      return window.isNaN(top) ? 0 : top;
	    }

	    /**
	     * It returns the window size
	     * @returns { Object } - width and height of the viewport
	     */
	  }, {
	    key: 'size',
	    get: function get() {
	      return {
	        width: window.innerWidth,
	        height: window.innerHeight
	      };
	    }
	  }]);

	  return Stage;
	})();

	exports['default'] = Stage;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	;(function(window, undefined) {var observable = function(el) {

	  /**
	   * Extend the original object or create a new empty one
	   * @type { Object }
	   */

	  el = el || {}

	  /**
	   * Private variables and methods
	   */

	  var callbacks = {},
	    onEachEvent = function(e, fn) { e.replace(/\S+/g, fn) }

	  /**
	   * Listen to the given space separated list of `events` and execute the `callback` each time an event is triggered.
	   * @param  { String } events - events ids
	   * @param  { Function } fn - callback function
	   * @returns { Object } el
	   */

	  el.on = function(events, fn) {
	    if (typeof fn != 'function')  return el

	    onEachEvent(events, function(name, pos) {
	      (callbacks[name] = callbacks[name] || []).push(fn)
	      fn.typed = pos > 0
	    })

	    return el
	  }

	  /**
	   * Removes the given space separated list of `events` listeners
	   * @param   { String } events - events ids
	   * @param   { Function } fn - callback function
	   * @returns { Object } el
	   */

	  el.off = function(events, fn) {
	    if (events == '*') callbacks = {}
	    else {
	      onEachEvent(events, function(name) {
	        if (fn) {
	          var arr = callbacks[name]
	          for (var i = 0, cb; cb = arr && arr[i]; ++i) {
	            if (cb == fn) arr.splice(i--, 1)
	          }
	        } else delete callbacks[name]
	      })
	    }
	    return el
	  }

	  /**
	   * Listen to the given space separated list of `events` and execute the `callback` at most once
	   * @param   { String } events - events ids
	   * @param   { Function } fn - callback function
	   * @returns { Object } el
	   */

	  el.one = function(events, fn) {
	    function on() {
	      el.off(events, on)
	      fn.apply(el, arguments)
	    }
	    return el.on(events, on)
	  }

	  /**
	   * Execute all callback functions that listen to the given space separated list of `events`
	   * @param   { String } events - events ids
	   * @returns { Object } el
	   */

	  el.trigger = function(events) {
	    var args = [].slice.call(arguments, 1)

	    onEachEvent(events, function(name) {

	      var fns = (callbacks[name] || []).slice(0)

	      for (var i = 0, fn; fn = fns[i]; ++i) {
	        if (fn.busy) return
	        fn.busy = 1
	        // avoid that this fn.busy gets stuck in case of errors it fixes #3
	        try {
	          fn.apply(el, fn.typed ? [name].concat(args) : args)
	        } catch (e) { /* error */}
	        if (fns[i] !== fn) { i-- }
	        fn.busy = 0
	      }

	      if (callbacks.all && name != 'all')
	        el.trigger.apply(el, ['all', name].concat(args))

	    })

	    return el
	  }

	  return el

	}  /* istanbul ignore next */
	  // support CommonJS, AMD & browser
	  if (true)
	    module.exports = observable
	  else if (typeof define === 'function' && define.amd)
	    define(function() { return observable })
	  else
	    window.observable = observable

	})(typeof window != 'undefined' ? window : undefined);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * This class will manage the parallax container
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _riotObservable = __webpack_require__(3);

	var _riotObservable2 = _interopRequireDefault(_riotObservable);

	var Wrapper = (function () {
	  function Wrapper(el) {
	    _classCallCheck(this, Wrapper);

	    this.el = el;
	    (0, _riotObservable2['default'])(this);
	  }

	  _createClass(Wrapper, [{
	    key: 'el',
	    set: function set(el) {
	      return typeof el == 'string' ? document.querySelectorAll(el) : el;
	    }
	  }]);

	  return Wrapper;
	})();

	exports['default'] = Wrapper;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;