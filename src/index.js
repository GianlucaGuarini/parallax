import { $, $$, extend, isUndefined, elementData } from './helpers/helpers'
import Stage from './Stage'
import Canvas from './Canvas'
import o from 'riot-observable'

/**
 * There is no need to listen several times all the window events
 * with this class we listen them once and we subscribe/unsubscribe all the Parallax instances to the main events dispatcher
 * @type {Stage}
 */
let stage

/**
 * Parallax class
 * @param { String } selector - the tag selector where we will bind the parallax
 * @param { Object } opts - parallax options
 */
class Parallax {
  constructor(selector = null, opts = {}) {

    // make this object observable
    o(this)
    // set the options extending the _defaults
    this.opts = opts
    this.selector = selector
    this.canvases = []
    this.bound = false

    // allow to initialize without adding any dom elements
    if (selector !== null) {
      this.add(selector)
    }

    // lazy stage instance initialization
    if (!stage)
      stage = new Stage()

    return this
  }

  /**
   * Initialize the parallax
   * @returns { Object } - Parallax
   */
  init() {
    if (this.bound) {
      throw 'The parallax instance has already been initialized'
    }

    if (!this.canvases.length && this.selector !== null) {
      console.warn(`No elements were found with the selector "${this.selector}"`)
    } else {
      this.elementsLoaded = 0
      this.bind()
    }

    return this
  }

  /**
   * Bind the instance events setting all the callbacks
   * @returns { Object } - Parallax
   */
  bind() {

    // cache these function in order to unbind them when
    // this instance will be destroyed
    this._onResize = (...args) => this.resize.apply(this, args)
    this._onScroll = (...args) => this.scroll.apply(this, args)

    stage.on('resize', this._onResize)
    stage.on('scroll', this._onScroll)

    this.canvases.forEach((canvas) => {
      canvas.one('loaded', () => this.onCanvasLoaded(canvas))
      canvas.load()
    })

    this.bound = true

    return this
  }

  /**
   * Force manually a redraw
   * @returns { Object } - Parallax
   */
  refresh() {
    this._onResize(stage.size)
    this._onScroll(stage.scrollTop)
    return this
  }

  /**
   * Callback triggered once a canvas has loaded its element
   * @param   { Object } canvas - canvas instance
   * @returns { Object } - Parallax
   */
  onCanvasLoaded(canvas) {
    this.trigger('element:loaded', canvas.element, canvas)
    this.elementsLoaded++
    canvas.draw(stage)
    if (this.elementsLoaded == this.canvases.length) this.trigger('elements:loaded')
    return this
  }

  /**
   * Callback triggered on scroll
   * @param   { Number } scrollTop - page offset top
   * @returns { Object } - Parallax
   */
  scroll(scrollTop) {
    const offsetYBounds = this.opts.offsetYBounds,
      { height, width } = stage

    let i = this.canvases.length

    while (i--) {
      let canvas = this.canvases[i],
        canvasHeight = canvas.size.height,
        canvasOffset = canvas.offset

      if (
        canvas.isLoaded &&
          scrollTop + stage.height + offsetYBounds > canvasOffset.top &&
          canvasOffset.top + canvasHeight > scrollTop - offsetYBounds
      ) {
        canvas.draw({ height, scrollTop, width })
        this.trigger('draw', canvas.element)
      }

    }

    this.trigger('update', scrollTop)

    return this
  }

  /**
   * Add parallax elements to this parallax instance
   * @param { String|Array } els - DOM selector or node list
   * @returns { Object } - Parallax
   */
  add(els) {
    const canvases = this.createCanvases($$(els))

    if (this.bound) {
      canvases.forEach((canvas) => {
        canvas.one('loaded', () => this.onCanvasLoaded(canvas))
        canvas.load()
      })
    }

    this.canvases = this.canvases.concat(canvases)

    return this
  }

  /**
   * Remove parallax elements from this parallax instance
   * @param { String|Array } els - DOM selector or node list
   * @returns { Object } - Parallax
   */
  remove(els) {
    $$(els).forEach((el) => {
      let i = this.canvases.length
      while (i--) {
        if (el == this.canvases[i].element) {
          this.canvases[i].destroy()
          this.canvases.splice(i, 1)
          break
        }
      }
    })
    return this
  }

  /**
   * Kill all the internal and external callbacks listening this instance events
   * @returns { Object } - Parallax
   */
  destroy() {
    this.off('*')
    this.canvases = []
    stage.off('resize', this._onResize).off('scroll', this._onScroll)
    return this
  }

  /**
   * Callback triggered on window resize
   * @param   { Object } size - object containing the window width and height
   * @returns { Object } - Parallax
   */
  resize(size) {
    let i = this.canvases.length
    while (i--) {
      const canvas = this.canvases[i]
      if (!canvas.isLoaded) return
      canvas.update().draw(stage)
    }
    this.trigger('resize')
    return this
  }

  /**
   * Set the canvases instances
   * @param   { Array } els - list of the elements we want to parallax
   * @returns { Array } - list of canvas instances
   */
  createCanvases(els) {
    return els.map(el => {
      const data = elementData(el)
      return new Canvas(el, {
        intensity: !isUndefined(data.intensity) ? +data.intensity : this.opts.intensity,
        center: !isUndefined(data.center) ? +data.center : this.opts.center,
        safeHeight: !isUndefined(data.safeHeight) ? +data.safeHeight : this.opts.safeHeight
      })
    })
  }

  /**
   * The options will be always set extending the script _defaults
   * @param   { Object } opts - custom options
   */
  set opts(opts) {
    this._defaults = {
      offsetYBounds: 50,
      intensity: 30,
      center: 0.5,
      // make sure that the elements can always properly parallax
      // They should be at least 15% higher than their wrappers (7.5% bottom + 7.5% top)
      safeHeight: 0.15 // 15%
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