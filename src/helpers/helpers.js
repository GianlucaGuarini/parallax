/**
 * @module hepers
 * All the helper functions needed in this project
 */
export default {
  /**
   * Shorter and fast way to select multiple nodes in the DOM
   * @param   { String|Array } selector - DOM selector or nodes list
   * @param   { Object } ctx - DOM node where the targets of our search will is located
   * @returns { Object } dom nodes found
   */
  $$(selector, ctx) {
    var els
    if (typeof selector == 'string')
      els = (ctx || document).querySelectorAll(selector)
    else
      els = selector
    return Array.prototype.slice.call(els)
  },

  /**
   * Shorter and fast way to select a single node in the DOM
   * @param   { String } selector - unique dom selector
   * @param   { Object } ctx - DOM node where the target of our search will is located
   * @returns { Object } dom node found
   */
  $(selector, ctx) {
    return (ctx || document).querySelector(selector)
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
  extend(src) {
    var obj, args = arguments
    for (var i = 1; i < args.length; ++i) {
      if (obj = args[i]) {
        for (var key in obj) {
          src[key] = obj[key]
        }
      }
    }
    return src
  },
  /**
   * Check if a value is undefined
   * @param   { * }  val - test value
   * @returns {Boolean} - true if it's undefined
   */
  isUndefined(val) {
    return typeof val == 'undefined'
  },
  /**
   * Get the data-* of any DOM element
   * @param   { Object } el - DOM element we want to parse
   * @param   { String } attr - specific data attribute we want to get
   * @returns { String|Object } - value/values of the data attributes
   */
  elementData(el, attr) {
    if (attr)
      return el.dataset[attr] || el.getAttribute(`data-${attr}`)
    else
      return el.dataset || Array.prototype.slice.call(el.attributes).reduce((ret, attribute) => {
        if (/data-/.test(attribute.name))
          ret[attribute.name] = attribute.value
        return ret
      }, {})
  },
  /**
   * Prefix any fancy browser object property
   * @param   { Object } obj - object we want to update normally el.style
   * @param   { String } prop - the new object property we want to set
   * @param   { * } value - new value we want to assign to the prefixed property
   * @returns { Boolean } - return whether the feature is supported
   */
  prefix(obj, prop, value) {
    var prefixes = ['ms', 'o', 'Moz', 'webkit', ''],
      i = prefixes.length
    while (i--) {
      var prefix = prefixes[i],
        // check if the prefix exists othewise we will use the unprefixed version
        // 4 ex using Transform: transform, webkitTransform, MozTransform, oTransform, msTransform
        p = prefix ? prefix + prop[0].toUpperCase() + prop.substr(1) : prop.toLowerCase() + prop.substr(1)
      if (p in obj) {
        obj[p] = value
        return true
      }
    }
    return false
  }
}