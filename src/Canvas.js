/**
 * This class will manage the parallax container
 */

import { prefix } from './helpers/helpers'
import o from 'riot-observable'

/**
 * Check the translate3d feature
 */
const HAS_TRANSLATE_3D = (function(div) {
  prefix(div.style, 'transform', 'translate3d(0, 0, 0)')
  return /translate3d/g.test(div.style.cssText)
})(document.createElement('div'))

export default class Canvas {
  constructor(img, opts) {
    // make this object observable
    o(this)
    this.opts = opts
    this.img = img
    this.wrapper = img.parentNode
    this.isLoaded = false
  }
  /**
   * Load the image
   * @returns { Object } - Canvas
   */
  load() {

    if (!this.img.width || !this.img.height || !this.img.complete)
      this.img.onload = () => this.onImageLoaded()
    else this.onImageLoaded()

    return this
  }
  /**
   * Callback triggered when the image gets loaded
   * @returns { Object } - Canvas
   */
  onImageLoaded() {
    this.isLoaded = true
    this.update()
    this.trigger('loaded', this.img)
    return this
  }
  /**
   * Center the image in its wrapper
   * @returns { Object } - Canvas
   */
  update() {

    var iw = this.img.naturalWidth || this.img.width,
      ih = this.img.naturalHeight || this.img.height,
      ratio = iw / ih,
      size = this.size,
      nh,
      nw,
      offsetTop,
      offsetLeft

    // calculate the new width and the height
    // keeping the image ratio
    if (size.width / ratio <= size.height) {
      nw = size.height * ratio
      nh = size.height
    } else {
      nw = size.width
      nh = size.width / ratio
    }

    // zoom the image if necessary
    if (nh <= size.height + size.height * this.opts.safeHeight) {
      nw += nw * this.opts.safeHeight
      nh += nh * this.opts.safeHeight
    }

    // calculate the offset top/left rounding it
    offsetTop = -~~((nh - size.height) / 2)
    offsetLeft = -~~((nw - size.width) / 2)

    this.img.width = nw
    this.img.height = nh
    this.img.style.top = `${offsetTop}px`
    this.img.style.left = `${offsetLeft}px`

    return this
  }
  /**
   * Draw the image on the canvas
   * @returns { Object } - Canvas
   */
  draw(stage) {
    var size = this.size,
      // this value will be:
      //  < 0 when the image is on the top
      //  0 when the image is in the center of the screen
      //  > 0 when the image is at the bottom
      perc = (this.offset.top + size.height * this.opts.center + stage.height / 2 - stage.scrollTop) / stage.height - 1
    // increase the percentage effect according to the intensity
    // and the current image height
    perc *= this.img.height / size.height / 2 * this.opts.intensity

    if (HAS_TRANSLATE_3D)
      prefix(this.img.style, 'transform', `translate3d(0, ${-perc}%, 0)`)
    else
      prefix(this.img.style, 'transform', `translate(0, ${-perc}%)`)

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
   * @returns { Object } - top and left position of the image parent tag
   */
  get offset() {
    return {
      top: this.wrapper.offsetTop,
      left: this.wrapper.offsetLeft
    }
  }
  /**
   * Get the parent wrapper size
   * @returns { Object } - the height and the width of the image parent tag
   */
  get size() {
    var props = this.bounds
    return {
      height: props.height | 0,
      width: props.width | 0
    }
  }
}