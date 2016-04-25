(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('Parallax', ['module'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.Parallax = mod.exports;
  }
})(this, function (module) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function $$(selector, ctx) {
    var els;
    if (typeof selector == 'string') els = (ctx || document).querySelectorAll(selector);else els = selector;
    return Array.prototype.slice.call(els);
  }

  function extend(src) {
    var obj,
        args = arguments;
    for (var i = 1; i < args.length; ++i) {
      if (obj = args[i]) {
        for (var key in obj) {
          src[key] = obj[key];
        }
      }
    }
    return src;
  }

  function isUndefined(val) {
    return typeof val == 'undefined';
  }

  function toCamel(string) {
    return string.replace(/-(\w)/g, function (_, c) {
      return c.toUpperCase();
    });
  }

  function elementData(el, attr) {
    if (attr) return el.dataset[attr] || el.getAttribute('data-' + attr);else return el.dataset || Array.prototype.slice.call(el.attributes).reduce(function (ret, attribute) {
      if (/data-/.test(attribute.name)) ret[toCamel(attribute.name)] = attribute.value;
      return ret;
    }, {});
  }

  function prefix(obj, prop, value) {
    var prefixes = ['ms', 'o', 'Moz', 'webkit', ''],
        i = prefixes.length;
    while (i--) {
      var prefix = prefixes[i],
          p = prefix ? prefix + prop[0].toUpperCase() + prop.substr(1) : prop.toLowerCase() + prop.substr(1);
      if (p in obj) {
        obj[p] = value;
        return true;
      }
    }
    return false;
  }

  var observable = function observable(el) {

    el = el || {};

    var callbacks = {},
        slice = Array.prototype.slice;

    function onEachEvent(e, fn) {
      var es = e.split(' '),
          l = es.length,
          i = 0,
          name,
          indx;
      for (; i < l; i++) {
        name = es[i];
        indx = name.indexOf('.');
        if (name) fn(~indx ? name.substring(0, indx) : name, i, ~indx ? name.slice(indx + 1) : null);
      }
    }

    Object.defineProperties(el, {
      on: {
        value: function value(events, fn) {
          if (typeof fn != 'function') return el;

          onEachEvent(events, function (name, pos, ns) {
            (callbacks[name] = callbacks[name] || []).push(fn);
            fn.typed = pos > 0;
            fn.ns = ns;
          });

          return el;
        },
        enumerable: false,
        writable: false,
        configurable: false
      },

      off: {
        value: function value(events, fn) {
          if (events == '*' && !fn) callbacks = {};else {
            onEachEvent(events, function (name, pos, ns) {
              if (fn || ns) {
                var arr = callbacks[name];
                for (var i = 0, cb; cb = arr && arr[i]; ++i) {
                  if (cb == fn || ns && cb.ns == ns) arr.splice(i--, 1);
                }
              } else delete callbacks[name];
            });
          }
          return el;
        },
        enumerable: false,
        writable: false,
        configurable: false
      },

      one: {
        value: function value(events, fn) {
          function on() {
            el.off(events, on);
            fn.apply(el, arguments);
          }
          return el.on(events, on);
        },
        enumerable: false,
        writable: false,
        configurable: false
      },

      trigger: {
        value: function value(events) {
          var arglen = arguments.length - 1,
              args = new Array(arglen),
              fns;

          for (var i = 0; i < arglen; i++) {
            args[i] = arguments[i + 1];
          }

          onEachEvent(events, function (name, pos, ns) {

            fns = slice.call(callbacks[name] || [], 0);

            for (var i = 0, fn; fn = fns[i]; ++i) {
              if (fn.busy) continue;
              fn.busy = 1;
              if (!ns || fn.ns == ns) fn.apply(el, fn.typed ? [name].concat(args) : args);
              if (fns[i] !== fn) {
                i--;
              }
              fn.busy = 0;
            }

            if (callbacks['*'] && name != '*') el.trigger.apply(el, ['*', name].concat(args));
          });

          return el;
        },
        enumerable: false,
        writable: false,
        configurable: false
      }
    });

    return el;
  };

  var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (cb) {
    setTimeout(cb, 1000 / 60);
  };
  var RESIZE_DELAY = 20;

  var Stage = function () {
    function Stage() {
      _classCallCheck(this, Stage);

      observable(this);
      this.resizeTimer = null;
      this.tick = false;
      this.bind();
    }

    _createClass(Stage, [{
      key: 'bind',
      value: function bind() {
        var _this = this;

        window.addEventListener('scroll', function () {
          return _this.scroll();
        }, true);
        window.addEventListener('mousewheel', function () {
          return _this.scroll();
        }, true);
        window.addEventListener('touchmove', function () {
          return _this.scroll();
        }, true);
        window.addEventListener('resize', function () {
          return _this.resize();
        }, true);
        window.addEventListener('orientationchange', function () {
          return _this.resize();
        }, true);
        window.onload = function () {
          return _this.scroll();
        };

        return this;
      }
    }, {
      key: 'scroll',
      value: function scroll() {
        var _this2 = this;

        if (this.tick) return this;
        this.tick = !this.tick;
        rAF(function () {
          return _this2.update();
        });
        return this;
      }
    }, {
      key: 'update',
      value: function update() {
        this.trigger('scroll', this.scrollTop);
        this.tick = !this.tick;
        return this;
      }
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
    }, {
      key: 'scrollTop',
      get: function get() {
        var top = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
        return window.isNaN(top) ? 0 : top;
      }
    }, {
      key: 'height',
      get: function get() {
        return window.innerHeight;
      }
    }, {
      key: 'width',
      get: function get() {
        return window.innerWidth;
      }
    }, {
      key: 'size',
      get: function get() {
        return {
          width: this.width,
          height: this.height
        };
      }
    }]);

    return Stage;
  }();

  var HAS_TRANSLATE_3D = function (div) {
    prefix(div.style, 'transform', 'translate3d(0, 0, 0)');
    return (/translate3d/g.test(div.style.cssText)
    );
  }(document.createElement('div'));

  var Canvas = function () {
    function Canvas(img, opts) {
      _classCallCheck(this, Canvas);

      observable(this);
      this.opts = opts;
      this.img = img;
      this.wrapper = img.parentNode;
      this.isLoaded = false;
    }

    _createClass(Canvas, [{
      key: 'load',
      value: function load() {
        var _this4 = this;

        if (!this.img.width || !this.img.height || !this.img.complete) this.img.onload = function () {
          return _this4.onImageLoaded();
        };else this.onImageLoaded();

        return this;
      }
    }, {
      key: 'onImageLoaded',
      value: function onImageLoaded() {
        this.isLoaded = true;
        this.update();
        this.trigger('loaded', this.img);
        return this;
      }
    }, {
      key: 'update',
      value: function update() {

        var iw = this.img.naturalWidth || this.img.width,
            ih = this.img.naturalHeight || this.img.height,
            ratio = iw / ih,
            size = this.size,
            nh,
            nw,
            offsetTop,
            offsetLeft;

        if (size.width / ratio <= size.height) {
          nw = size.height * ratio;
          nh = size.height;
        } else {
          nw = size.width;
          nh = size.width / ratio;
        }

        if (nh <= size.height + size.height * this.opts.safeHeight) {
          nw += nw * this.opts.safeHeight;
          nh += nh * this.opts.safeHeight;
        }

        offsetTop = - ~ ~((nh - size.height) / 2);
        offsetLeft = - ~ ~((nw - size.width) / 2);

        this.img.width = nw;
        this.img.height = nh;
        this.img.style.top = offsetTop + 'px';
        this.img.style.left = offsetLeft + 'px';

        return this;
      }
    }, {
      key: 'draw',
      value: function draw(stage) {
        var size = this.size,
            perc = (this.offset.top + size.height * this.opts.center + stage.height / 2 - stage.scrollTop) / stage.height - 1;

        perc *= this.img.height / size.height / 2 * this.opts.intensity;

        if (HAS_TRANSLATE_3D) prefix(this.img.style, 'transform', 'translate3d(0, ' + -perc + '%, 0)');else prefix(this.img.style, 'transform', 'translate(0, ' + -perc + '%)');

        return this;
      }
    }, {
      key: 'bounds',
      get: function get() {
        return this.wrapper.getBoundingClientRect();
      }
    }, {
      key: 'offset',
      get: function get() {
        return {
          top: this.wrapper.offsetTop,
          left: this.wrapper.offsetLeft
        };
      }
    }, {
      key: 'size',
      get: function get() {
        var props = this.bounds;
        return {
          height: props.height | 0,
          width: props.width | 0
        };
      }
    }]);

    return Canvas;
  }();

  var stage;

  var Parallax = function () {
    function Parallax(selector) {
      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      _classCallCheck(this, Parallax);

      observable(this);

      this.opts = opts;
      this.selector = selector;
      this.canvases = [];
      this.add(selector);

      if (!stage) stage = new Stage();

      return this;
    }

    _createClass(Parallax, [{
      key: 'init',
      value: function init() {

        if (!this.canvases.length) {
          console.warn('No images were found with the selector "' + this.selector + '"');
        } else {
          this.imagesLoaded = 0;
          this.bind();
        }

        return this;
      }
    }, {
      key: 'bind',
      value: function bind() {
        var _this5 = this;

        this._onResize = function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _this5.resize.apply(_this5, args);
        };
        this._onScroll = function () {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return _this5.scroll.apply(_this5, args);
        };

        stage.on('resize', this._onResize);
        stage.on('scroll', this._onScroll);

        this.canvases.forEach(function (canvas) {
          canvas.one('loaded', function () {
            return _this5.onCanvasLoaded(canvas);
          });
          canvas.load();
        });

        return this;
      }
    }, {
      key: 'refresh',
      value: function refresh() {
        this.onResize(stage.size).onScroll(stage.scrollTop);
        return this;
      }
    }, {
      key: 'onCanvasLoaded',
      value: function onCanvasLoaded(canvas) {
        this.trigger('image:loaded', canvas.img, canvas);
        this.imagesLoaded++;
        canvas.draw(stage);
        if (this.imagesLoaded == this.canvases.length) this.trigger('images:loaded');
        return this;
      }
    }, {
      key: 'scroll',
      value: function scroll(scrollTop) {
        var i = this.canvases.length,
            offsetYBounds = this.opts.offsetYBounds,
            stageScrollTop = stage.scrollTop;

        while (i--) {

          var canvas = this.canvases[i],
              canvasHeight = canvas.size.height,
              canvasOffset = canvas.offset,
              canvasScrollDelta = canvasOffset.top + canvasHeight - stageScrollTop;

          if (canvas.isLoaded && canvasScrollDelta + offsetYBounds > 0 && canvasScrollDelta - offsetYBounds < stageScrollTop + stage.height) {
            canvas.draw(stage);
            this.trigger('draw', canvas.img);
          }
        }

        this.trigger('update', stageScrollTop);

        return this;
      }
    }, {
      key: 'add',
      value: function add(els) {
        this.canvases = this.canvases.concat(this.createCanvases($$(els)));
        return this;
      }
    }, {
      key: 'remove',
      value: function remove(els) {
        var _this6 = this;

        $$(els).forEach(function (el) {
          var i = _this6.canvases.length;
          while (i--) {
            if (el == _this6.canvases[i].img) {
              _this6.canvases.splice(i, 1);
              break;
            }
          }
        });
        return this;
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.off('*');
        this.canvases = [];
        stage.off('resize', this._onResize).off('scroll', this._onScroll);
        return this;
      }
    }, {
      key: 'resize',
      value: function resize(size) {
        var i = this.canvases.length;
        while (i--) {
          var canvas = this.canvases[i];
          if (!canvas.isLoaded) return;
          canvas.update().draw(stage);
        }
        this.trigger('resize');
        return this;
      }
    }, {
      key: 'createCanvases',
      value: function createCanvases(els) {
        var _this7 = this;

        return els.map(function (el) {
          var data = elementData(el);
          return new Canvas(el, {
            intensity: !isUndefined(data.intensity) ? +data.intensity : _this7.opts.intensity,
            center: !isUndefined(data.center) ? +data.center : _this7.opts.center,
            safeHeight: !isUndefined(data.safeHeight) ? +data.safeHeight : _this7.opts.safeHeight
          });
        });
      }
    }, {
      key: 'opts',
      set: function set(opts) {
        this._defaults = {
          offsetYBounds: 50,
          intensity: 30,
          center: 0.5,

          safeHeight: 0.15 };
        extend(this._defaults, opts);
      },
      get: function get() {
        return this._defaults;
      }
    }]);

    return Parallax;
  }();

  module.exports = Parallax;
});