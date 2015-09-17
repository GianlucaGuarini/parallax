/**
 * This class will manage the parallax container
 */

import o from 'riot-observable'

export default class Wrapper {
  constructor(el) {
    this.el = el
    o(this)
  }
  set el(el) {
    return typeof el == 'string' ? document.querySelectorAll(el) : el
  }
}