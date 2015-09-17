import helpers from './helpers/helpers'
import Stage from './Stage'
import Wrapper from './Wrapper'

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
  constructor(el, opts) {
    this.wrapper = new Wrapper(el)
    stage.on('resize', (...args) => this.onResize.apply(this, args))
    stage.on('scroll', (...args) => this.onScroll.apply(this, args))
  }
  /**
   * Callback triggered on scroll
   * @param   { Number } scrollTop - page offset top
   * @returns { Object } - Parallax
   */
  onScroll(scrollTop) {
    console.log(scrollTop)
    return this
  }
  /**
   * Callback triggered on window resize
   * @param   { Object } size - object containing the window width and height
   * @returns { Object } - Parallax
   */
  onResize(size) {
    return this
  }
}

export default Parallax