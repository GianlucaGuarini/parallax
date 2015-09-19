/**
 * This class will manage the parallax container
 */

import { prefix } from './helpers/helpers'
import o from 'riot-observable'

export default class Canvas {
  constructor(img, opts) {
    // make this object observable
    o(this)
    this.opts = opts
    this.img = img
    this.el = document.createElement('canvas')
    this.c = this.el.getContext('2d')
    this.wrapper = img.parentNode
    this.isLoaded = false
  }
  /**
   * Load the image
   * @returns { Object } - Canvas
   */
  load() {

    if (!this.img.width || !this.img.width)
      this.img.onload = this.onImageLoaded.bind(this)
    else this.onImageLoaded()

    return this
  }
  /**
   * Callback triggered when the image gets loaded
   * @returns { Object } - Canvas
   */
  onImageLoaded() {
    this.isLoaded = true
    // replace the image with the canvas
    this.wrapper.replaceChild(this.el, this.img)
    this.update()
    this.trigger('loaded', this.img)
    return this
  }
  update() {
    this.el.width = this.size.width
    this.el.height = this.size.height
    return this
  }
  /**
   * Draw the image on the canvas
   * @returns { Object } - Canvas
   */
  draw(stage) {
    var offsetY = (this.offset.top + this.el.height / 2 - stage.scrollTop) / stage.size.height * this.opts.intensity,
      translateY = this.offset.top - stage.scrollTop,
      x = 0,
      y = translateY < 0 ? -translateY * this.opts.intensity : 0

    this.drawImageProp(this.c, x, y, this.el.width, this.el.height, 0.5, offsetY)

    return this
  }
  drawImageProp(ctx, x, y, w, h, offsetX = 0.5, offsetY = 0.5) {

    if (arguments.length === 2) {
      x = y = 0
      w = ctx.canvas.width
      h = ctx.canvas.height
    }

    /// keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0
    if (offsetY < 0) offsetY = 0
    if (offsetX > 1) offsetX = 1
    if (offsetY > 1) offsetY = 1

    var iw = this.img.naturalWidth || this.img.width,
      ih = this.img.naturalHeight || this.img.height,
      r = Math.min(w / iw, h / ih),
      nw = Math.ceil(iw * r), /// new prop. width
      nh = Math.ceil(ih * r), /// new prop. height
      cx, cy, cw, ch, ar = 1

    /// decide which gap to fill
    if (nw < w) ar = w / nw
    if (nh < h) ar = h / nh
    nw *= ar
    nh *= ar

    /// calc source rectangle
    cw = iw / (nw / w)
    ch = ih / (nh / h)

    cx = (iw - cw) * offsetX
    cy = (ih - ch) * offsetY

    /// make sure source rectangle is valid
    if (cx < 0) cx = 0
    if (cy < 0) cy = 0
    if (cw > iw) cw = iw
    if (ch > ih) ch = ih

    /// fill image in dest. rectangle
    ctx.drawImage(this.img, cx, cy, cw, ch, x, y, w, h)

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
      height: Math.ceil(props.height),
      width: Math.ceil(props.width)
    }
  }
}