/**
 * @module hepers
 * All the helper functions needed in this project
 */
export default {
  /**
   * Shorter and fast way to select multiple nodes in the DOM
   * @param   { String } selector - DOM selector
   * @param   { Object } ctx - DOM node where the targets of our search will is located
   * @returns { Object } dom nodes found
   */
  $$(selector, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(selector))
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
   * Prefix any fancy browser object property
   * @param   { Object } obj - object we want to update normally el.style
   * @param   { String } prop - the new object property we want to set
   * @param   { * } value - new value we want to assign to the prefixed property
   * @returns { undefined }
   */
  prefix(obj, prop, value) {
    var pre = ['', 'webkit', 'Moz', 'o', 'ms']
    for (var p in pre) {
      // check if the prefix exists othewise we will use the unprefixed version
      // 4 ex using Transform: transform, webkitTransform, MozTransform, oTransform, msTransform
      p = pre[p] ? pre[prop[0].toUpperCase() + prop.substr(1)] + prop : prop[0].toLowerCase() + prop.substr(1)
      if (p in obj) {
        obj[prefs[pref] + prop] = value
        return
      }
    }
  }
}