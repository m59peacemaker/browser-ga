var gaScriptSrc = 'https://www.google-analytics.com/analytics.js'
var globalVar = '_ga-b_temporary_global_variable'

function loadScript (src, cb) {
  var script = document.createElement('script')
  script.src = src
  script.addEventListener('load', cb)
  document.head.appendChild(script)
}

function GA () {
  var queue = []
  var ga = function () {
    var args = arguments
    setTimeout(function() { // because IE9 for who knows what reason
      if (ga.global !== undefined) {
        ga.global.apply(window, args)
      } else {
        queue.push(args)
      }
    }, 0)
  }

  ga.q = queue
  ga.l = new Date()
  ga.globalVar = globalVar
  window.GoogleAnalyticsObject = globalVar
  window[globalVar] = ga
  loadScript(gaScriptSrc, function () {
    if (window[globalVar] !== undefined) {
      ga.global = window[globalVar]
      delete window[globalVar]
    }
  })

  return ga
}

GA.src = gaScriptSrc
GA.globalVar = globalVar

module.exports = GA
