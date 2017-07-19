var gaSrc = 'https://www.google-analytics.com/analytics.js'
var globalVar = '_ga-b_temporary_global_variable'

function loadScript (src) {
  var script = document.createElement('script')
  script.src = src
  document.head.appendChild(script)
}

function GA () {
  var queue = []
  var ga = function () {
    var args = arguments
    if (ga.global !== undefined) {
      ga.global.apply(window, args)
    } else {
      queue.push(args)
    }
  }

  ga.q = queue
  ga.l = new Date()
  ga.globalVar = globalVar
  window.GoogleAnalyticsObject = globalVar
  window[globalVar] = ga

  ga(function () { // queue ready callback
    ga.global = window[globalVar]
    delete window[globalVar]
  })

  loadScript(gaSrc)

  return ga
}

GA.src = gaSrc
GA.globalVar = globalVar

module.exports = GA
