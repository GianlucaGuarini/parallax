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

	var _Stage = __webpack_require__(2);

	var _Stage2 = _interopRequireDefault(_Stage);

	var _Canvas = __webpack_require__(4);

	var _Canvas2 = _interopRequireDefault(_Canvas);

	var _riotObservable = __webpack_require__(3);

	var _riotObservable2 = _interopRequireDefault(_riotObservable);

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
	  function Parallax(els) {
	    var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, Parallax);

	    // make this object observable
	    (0, _riotObservable2['default'])(this);
	    // set the options extending the _defaults
	    this.opts = opts;
	    this.canvases = this.createCanvases(typeof els == 'string' ? (0, _helpersHelpers.$$)(els) : els);
	    this.imagesLoaded = 0;

	    if (!this.canvases.length) {
	      console.warn('No images were found with the selector "' + els + '"');
	      return;
	    }
	    this.bind();
	  }

	  /**
	   * Bind the instance events setting all the callbacks
	   * @returns { Object } - Parallax
	   */

	  _createClass(Parallax, [{
	    key: 'bind',
	    value: function bind() {
	      var _this = this;

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
	      this.canvases.forEach(function (canvas) {
	        canvas.one('loaded', function () {
	          return _this.onCanvasLoaded(canvas);
	        });
	      });

	      return this;
	    }

	    /**
	     * Callback triggered once a canvas has loaded its image
	     * @param   { Object } canvas - canvas instance
	     * @returns { Object } - Parallax
	     */
	  }, {
	    key: 'onCanvasLoaded',
	    value: function onCanvasLoaded(canvas) {
	      this.trigger('image:loaded', canvas.img);
	      this.imagesLoaded++;
	      canvas.draw(stage);
	      if (this.imagesLoaded == this.canvases.length) this.trigger('images:loaded');
	      return this;
	    }

	    /**
	     * Callback triggered on scroll
	     * @param   { Number } scrollTop - page offset top
	     * @returns { Object } - Parallax
	     */
	  }, {
	    key: 'onScroll',
	    value: function onScroll(scrollTop) {
	      var i = this.canvases.length;

	      while (i--) {

	        var canvas = this.canvases[i];

	        if (!canvas.isLoaded) return this;

	        if (stage.scrollTop + stage.size.height + this.opts.offsetYBounds >= canvas.offset.top && stage.scrollTop - this.opts.offsetYBounds <= canvas.offset.top + canvas.size.height) canvas.draw(stage);
	      }

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
	      var i = this.canvases.length;

	      while (i--) {
	        var canvas = this.canvases[i];
	        if (!canvas.isLoaded) return;
	        canvas.update().draw(stage);
	      }
	      return this;
	    }

	    /**
	     * Set the canvases instances
	     * @param   { Array } els - list of the images we want to parallax
	     * @returns { Array } - list of canvas instances
	     */
	  }, {
	    key: 'createCanvases',
	    value: function createCanvases(els) {
	      var _this2 = this;

	      return els.map(function (el) {
	        return new _Canvas2['default'](el, {
	          intensity: _this2.opts.intensity
	        });
	      });
	    }

	    /**
	     * The options will be always set extending the script _defaults
	     * @param   { Object } opts - custom options
	     */
	  }, {
	    key: 'opts',
	    set: function set(opts) {
	      this._defaults = {
	        offsetYBounds: 200,
	        intensity: 0.3
	      };
	      (0, _helpersHelpers.extend)(this._defaults, opts);
	    },

	    /**
	     * Get the script options object
	     * @returns { Object } - current options
	     */
	    get: function get() {
	      return this._defaults;
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
	exports["default"] = {
	  /**
	   * Shorter and fast way to select multiple nodes in the DOM
	   * @param   { String } selector - DOM selector
	   * @param   { Object } ctx - DOM node where the targets of our search will is located
	   * @returns { Object } dom nodes found
	   */
	  $$: function $$(selector, ctx) {
	    return Array.prototype.slice.call((ctx || document).querySelectorAll(selector));
	  },

	  /**
	   * Shorter and fast way to select a single node in the DOM
	   * @param   { String } selector - unique dom selector
	   * @param   { Object } ctx - DOM node where the target of our search will is located
	   * @returns { Object } dom node found
	   */
	  $: function $(selector, ctx) {
	    return (ctx || document).querySelector(selector);
	  },
	  /**
	   * Extend any object with other properties
	   * @param   { Object } src - source object
	   * @returns { Object } the resulting extended object
	   *
	   * var obj = { foo: 'baz' }
	   * extend(obj, {bar: 'bar', foo: 'bar'})
	   * console.log(obj) => {bar: 'bar', foo: 'bar'}
	   *
	   */
	  extend: function extend(src) {
	    var obj,
	        args = arguments;
	    for (var i = 1; i < args.length; ++i) {
	      if (obj = args[i]) {
	        for (var key in obj) {
	          // eslint-disable-line guard-for-in
	          src[key] = obj[key];
	        }
	      }
	    }
	    return src;
	  }
	};
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
	    RESIZE_DELAY = 20;

	var Stage = (function () {
	  function Stage() {
	    _classCallCheck(this, Stage);

	    // make this object observable
	    (0, _riotObservable2['default'])(this);
	    this.isScrolling = false;
	    this.resizeTimer = null;
	    this.oldScrollTop = this.scrollTop;
	    this.bind();
	  }

	  /**
	   * Bind the window events
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
	      window.onload = function () {
	        return _this.update(true);
	      }; // force an update event

	      return this;
	    }

	    /**
	     * Handle a smooth scroll event dispatching the scrolling event outside
	     * @returns { Object } - Stage
	     */
	  }, {
	    key: 'scroll',
	    value: function scroll() {
	      if (this.isScrolling) return this;
	      this.isScrolling = true;
	      this.update();
	      return this;
	    }

	    /**
	     * Update function that is called anytime we need to trigger an update
	     * @returns { Object } - Stage
	     */
	  }, {
	    key: 'update',
	    value: function update() {
	      var _this2 = this;

	      var force = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	      if (!this.isScrolling && !force) return this;

	      this.trigger('scroll', this.scrollTop);

	      if (this.scrollTop == this.oldScrollTop) {
	        this.isScrolling = false;
	      }

	      this.oldScrollTop = this.scrollTop;

	      rAF(function () {
	        return _this2.update();
	      });

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

	var Canvas = (function () {
	  function Canvas(img, opts) {
	    _classCallCheck(this, Canvas);

	    // make this object observable
	    (0, _riotObservable2['default'])(this);
	    this.opts = opts;
	    this.img = img;
	    this.el = document.createElement('canvas');
	    this.c = this.el.getContext('2d');
	    this.wrapper = img.parentNode;
	    this.isLoaded = false;
	    this.bind();
	  }

	  /**
	   * Bind the instance events setting all the callbacks
	   * @returns { Object } - Canvas
	   */

	  _createClass(Canvas, [{
	    key: 'bind',
	    value: function bind() {

	      if (!this.img.width || !this.img.width) this.img.onload = this.onImageLoaded.bind(this);else this.onImageLoaded();

	      return this;
	    }

	    /**
	     * Callback triggered when the image gets loaded
	     * @returns { Object } - Canvas
	     */
	  }, {
	    key: 'onImageLoaded',
	    value: function onImageLoaded() {
	      this.isLoaded = true;
	      // replace the image with the canvas
	      this.wrapper.replaceChild(this.el, this.img);
	      this.update();
	      this.trigger('loaded', this.img);
	      return this;
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      this.el.width = this.size.width;
	      this.el.height = this.size.height;
	      return this;
	    }

	    /**
	     * Draw the image on the canvas
	     * @returns { Object } - Canvas
	     */
	  }, {
	    key: 'draw',
	    value: function draw(stage) {
	      var offsetY = (this.offset.top + this.el.height / 2 - stage.scrollTop) / stage.size.height;
	      this.c.clearRect(0, 0, this.el.width, this.el.height);
	      this.drawImageProp(this.c, 0, 0, this.el.width, this.el.height, 0, offsetY * this.opts.intensity);
	      return this;
	    }
	  }, {
	    key: 'drawImageProp',
	    value: function drawImageProp(ctx, x, y, w, h, offsetX, offsetY) {

	      if (arguments.length === 2) {
	        x = y = 0;
	        w = ctx.canvas.width;
	        h = ctx.canvas.height;
	      }

	      /// default offset is center
	      offsetX = offsetX ? offsetX : 0.5;
	      offsetY = offsetY ? offsetY : 0.5;

	      var iw = this.img.naturalWidth || this.img.width,
	          ih = this.img.naturalHeight || this.img.height,
	          r = Math.min(w / iw, h / ih),
	          nw = iw * r,
	          /// new prop. width
	      nh = ih * r,
	          /// new prop. height
	      cx,
	          cy,
	          cw,
	          ch,
	          ar = 1;

	      /// decide which gap to fill
	      if (nw < w) ar = w / nw;
	      if (nh < h) ar = h / nh;
	      nw *= ar;
	      nh *= ar;

	      /// calc source rectangle
	      cw = ~ ~(iw / (nw / w));
	      ch = ~ ~(ih / (nh / h));

	      cx = ~ ~((iw - cw) * offsetX);
	      cy = ~ ~((ih - ch) * offsetY);

	      /// make sure source rectangle is valid
	      if (cx < 0) cx = 0;
	      if (cy < 0) cy = 0;
	      if (cw > iw) cw = iw;
	      if (ch > ih) ch = ih;

	      /// fill image in dest. rectangle
	      ctx.drawImage(this.img, cx, cy, cw, ch, x, y, w, h);
	    }

	    /**
	     * Get the parent wrapper bounds
	     * @returns { Object } - parent tag bounds properties
	     */
	  }, {
	    key: 'bounds',
	    get: function get() {
	      return this.wrapper.getBoundingClientRect();
	    }

	    /**
	     * Get the parent wrapper offset
	     * @returns { Object } - top and left position of the image parent tag
	     */
	  }, {
	    key: 'offset',
	    get: function get() {
	      return {
	        top: this.wrapper.offsetTop,
	        left: this.wrapper.offsetLeft
	      };
	    }

	    /**
	     * Get the parent wrapper size
	     * @returns { Object } - the height and the width of the image parent tag
	     */
	  }, {
	    key: 'size',
	    get: function get() {
	      var props = this.bounds;
	      return {
	        height: props.height,
	        width: props.width
	      };
	    }
	  }]);

	  return Canvas;
	})();

	exports['default'] = Canvas;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;