/**
 * This class listens all the window events that could be reused by the Parallax instance
 */

import o from 'riot-observable'

const
  rAF = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (cb) { setTimeout(cb, 1000 / 60) },
  RESIZE_DELAY = 200

export default class Stage {
  constructor() {
    // make this object observable
    o(this)
    this.tick = false
    this.resizeTimer = null
    this.bind()
  }
  /**
   * Bind the window events
   * @returns { Object } - Stage
   */
  bind() {

    window.addEventListener('mousewheel', (e) => this.scroll(e), true)
    window.addEventListener('scroll',  (e) => this.scroll(e), true)
    window.addEventListener('resize', () => this.resize(), true)
    window.addEventListener('orientationchange', () => this.resize(), true)

    return this
  }
  /**
   * Handle a smooth scroll event dispatching the scrolling event outside
   * @returns { Object } - Stage
   */
  scroll() {
    if (!this.tick) {
      this.tick = !this.tick
      rAF(() => {
        this.trigger('scroll', this.scrollTop)
        this.tick = !this.tick
      })
    }
    return this
  }
  /**
   * Handle the resize event debouncing it
   * @returns { Object } - Stage
   */
  resize() {
    if (this.resizeTimer)
      clearTimeout(this.resizeTimer)
    this.resizeTimer = setTimeout(() => this.trigger('resize', this.size), RESIZE_DELAY)
    return this
  }
  /**
   * It returns the window scroll top position
   * @returns { Number } - window offset top
   */
  get scrollTop() {
    var top = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0)
    return window.isNaN(top) ? 0 : top
  }
  /**
   * It returns the window size
   * @returns { Object } - width and height of the viewport
   */
  get size() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
}