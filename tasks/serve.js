var utils = require('./_utils')

module.exports = function(options) {
  // serve the contents of this folder
  return utils.exec('./node_modules/.bin/serve', [])
}
