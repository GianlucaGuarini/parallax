/**
 * This class will manage the parallax container
 */

import { prefix } from './helpers/helpers'
import o from 'riot-observable'

/**
 * Check the translate3d feature
 */
const TRANSFORM_PREFIX = (function (div) {
  return prefix(div.style, 'transform')
})(document.createElement('div'))
const HAS_MATRIX = (function (div) {
  div.style[TRANSFORM_PREFIX] = 'matrix(1, 0, 0, 1, 0, 0)'
  return /matrix/g.test(div.style.cssText)
})(document.createElement('div'))

export default class Canvas {
  constructor(element, opts) {
    // make this object observable
    o(this)
    this.opts = opts
    this.element = element
    this.wrapper = element.parentNode
    this.isLoaded = false

    // store the initial element properties - deep clone
    this.initial = element.cloneNode(true)
  }
  /**
   * Load the element
   * @returns { Object } - Canvas
   */
  load() {
    const isImage = this.element.complete !== undefined
    const isVideo = this.element.oncanplay !== undefined

    if (isImage && !this.element.complete) {
      this.element.onload = () => this.onElementLoaded()
    } else if (isVideo && !this.element.oncanplay) {
      this.element.onload = this.element.oncanplay = () => this.onElementLoaded()
    } else {
      this.onElementLoaded()
    }

    return this
  }

  destroy() {
    this.element.parentNode.replaceChild(this.initial, this.element)
    this.off('*')
  }

  /**
   * Callback triggered when the element gets loaded
   * @returns { Object } - Canvas
   */
  onElementLoaded() {
    this.isLoaded = true
    this.update()
    this.element.style.willChange = 'transform'
    this.trigger('loaded', this.element)
    return this
  }
  /**
   * Center the element in its wrapper
   * @returns { Object } - Canvas
   */
  update() {
    const iw = this.element.naturalWidth || this.element.width || this.element.offsetWidth,
      ih = this.element.naturalHeight || this.element.height || this.element.offsetHeight,
      ratio = iw / ih,
      size = this.size

    let nh, nw, offsetTop, offsetLeft

    // calculate the new width and the height
    // keeping the element ratio
    if (size.width / ratio <= size.height) {
      nw = size.height * ratio
      nh = size.height
    } else {
      nw = size.width
      nh = size.width / ratio
    }

    // zoom the element if necessary
    if (nh <= size.height + size.height * this.opts.safeHeight) {
      nw += nw * this.opts.safeHeight
      nh += nh * this.opts.safeHeight
    }

    // calculate the offset top/left rounding it
    offsetTop = -~~((nh - size.height) / 2)
    offsetLeft = -~~((nw - size.width) / 2)

    this.element.width = nw
    this.element.height = nh
    this.element.style.top = `${offsetTop}px`
    this.element.style.left = `${offsetLeft}px`

    return this
  }
  /**
   * Draw the element on the canvas
   * @returns { Object } - Canvas
   */
  draw({ scrollTop, width, height }) {
    const size = this.size,
      // this value will be:
      //  < 0 when the element is on the top
      //  0 when the element is in the center of the screen
      //  > 0 when the element is at the bottom
      perc = (this.offset.top + size.height * this.opts.center + height / 2 - scrollTop) / height - 1,
      // increase the percentage effect according to the intensity
      // and the current element height
      offset = ~~(perc * (this.element.height / size.height / 2 * this.opts.intensity) * 10)

    this.element.style[TRANSFORM_PREFIX] = HAS_MATRIX ? `matrix(1,0,0,1, 0, ${-offset})` : `translate(0, ${-offset}px)`

    return this
  }

  /**
   * Get the parent wrapper bounds
   * @returns { Object } - parent tag bounds properties
   */
  get bounds() {
    return this.wrapper.getBoundingClientRect()
  }
  /**
   * Get the parent wrapper offset
   * @returns { Object } - top and left position of the element parent tag
   */
  get offset() {
    return {
      top: this.wrapper.offsetTop,
      left: this.wrapper.offsetLeft
    }
  }
  /**
   * Get the parent wrapper size
   * @returns { Object } - the height and the width of the element parent tag
   */
  get size() {
    const props = this.bounds
    return {
      height: props.height | 0,
      width: props.width | 0
    }
  }
}