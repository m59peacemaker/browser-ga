var getElement = require('./get-element')

function remove (ga) {
  var script = getElement()
  if (script) {
    script.parentNode.removeChild(script)
  }
  if (window.GoogleAnalyticsObject === ga.globalVar) {
    delete window.GoogleAnalyticsObject
  }
  if (ga.global === window[ga.globalVar]) {
    delete window[ga.globalVar]
  }
}

module.exports = remove
