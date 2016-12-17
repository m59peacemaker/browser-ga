var GA = require('../init')

function getElement () {
  var matches = [].slice.call(document.getElementsByTagName('script')).filter(function (script) {
    return script.src === GA.src
  })
  return matches.length ? matches[0] : undefined
}

module.exports = getElement
