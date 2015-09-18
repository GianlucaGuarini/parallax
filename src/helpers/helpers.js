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
        for (var key in obj) {      // eslint-disable-line guard-for-in
          src[key] = obj[key]
        }
      }
    }
    return src
  }
}