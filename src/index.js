import { $, $$, extend } from './helpers/helpers'
import Stage from './Stage'
import Canvas from './Canvas'
import o from 'riot-observable'

/**
 * There is no need to listen several times all the window events
 * with this class we listen them once and we subscribe/unsubscribe all the Parallax instances to the main events dispatcher
 * @type {Stage}
 */
var stage = new Stage()

/**
 * @class
 * An awesome script
 */
class Parallax {
  constructor(els, opts = {}) {
    // make this object observable
    o(this)
    // set the options extending the _defaults
    this.opts = opts
    this.canvases = this.createCanvases(typeof els == 'string' ? $$(els) : els)
    if (!this.canvases.length) {
      console.warn(`No images were found with the selector "${els}"`)
      return
    }
  }
  /**
   * Initialize the parallax
   * @returns { Object } - Parallax
   */
  init() {
    this.imagesLoaded = 0
    this.bind()
  }
  /**
   * Bind the instance events setting all the callbacks
   * @returns { Object } - Parallax
   */
  bind() {

    stage.on('resize', (...args) => this.onResize.apply(this, args))
    stage.on('scroll', (...args) => this.onScroll.apply(this, args))
    this.canvases.forEach((canvas) => {
      canvas.one('loaded', () => this.onCanvasLoaded(canvas))
      canvas.load()
    })

    return this
  }
  /**
   * Callback triggered once a canvas has loaded its image
   * @param   { Object } canvas - canvas instance
   * @returns { Object } - Parallax
   */
  onCanvasLoaded(canvas) {
    this.trigger('image:loaded', canvas.img, canvas)
    this.imagesLoaded ++
    canvas.draw(stage)
    if (this.imagesLoaded == this.canvases.length) this.trigger('images:loaded')
    return this
  }
  /**
   * Callback triggered on scroll
   * @param   { Number } scrollTop - page offset top
   * @returns { Object } - Parallax
   */
  onScroll(scrollTop) {
    var i = this.canvases.length

    while (i--) {

      var canvas = this.canvases[i]

      if (!canvas.isLoaded) return this

      if (
        stage.scrollTop + stage.size.height >= canvas.offset.top &&
        stage.scrollTop <= canvas.offset.top + canvas.size.height
      ) canvas.draw(stage)

    }

    return this
  }
  /**
   * Callback triggered on window resize
   * @param   { Object } size - object containing the window width and height
   * @returns { Object } - Parallax
   */
  onResize(size) {
    var i = this.canvases.length

    while (i--) {
      var canvas = this.canvases[i]
      if (!canvas.isLoaded) return
      canvas.update().draw(stage)
    }
    return this
  }
  /**
   * Set the canvases instances
   * @param   { Array } els - list of the images we want to parallax
   * @returns { Array } - list of canvas instances
   */
  createCanvases(els) {
    return els.map(el => new Canvas(el, {
      intensity: this.opts.intensity
    }))
  }
  /**
   * The options will be always set extending the script _defaults
   * @param   { Object } opts - custom options
   */
  set opts (opts) {
    this._defaults = {
      intensity: 0.5
    }
    extend(this._defaults, opts)
  }
  /**
   * Get the script options object
   * @returns { Object } - current options
   */
  get opts() {
    return this._defaults
  }
}

export default Parallax