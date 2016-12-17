var test = require('tape')
var until = require('wait-until')
var GA = require('./init')
var getElement = require('./lib/get-element')
var remove = require('./lib/remove')
var sampleCode = 'UA-XXXX-Y'

test('loads analytics.js', function (t) {
  t.plan(1)
  var ga = GA()
  until(500, 20, getElement, function (loaded) {
    remove(ga)
    if (loaded) {
      t.pass('analytics is loaded')
    } else {
      t.fail('analytics did not load')
    }
  })
})

test('does not set window.ga global', function (t) {
  t.plan(1)
  var ga = GA()
  until(500, 20, getElement, function (loaded) {
    if (!loaded) {
      t.fail('analytics did not load')
    } else {
      t.equal(window.ga, undefined)
    }
    remove(ga)
  })
})

test('removes its temporary global', function (t) {
  t.plan(1)
  var ga = GA()
  until(500, 20, getElement, function (loaded) {
    if (!loaded) {
      t.fail('analytics did not load')
    } else {
      t.equal(window[GA.globalVar], undefined)
    }
    remove(ga)
  })
})

test('sends queue', function (t) {
  t.plan(1)
  var ga = GA()
  ga('create', sampleCode, 'auto')
  ga('send', 'pageview', {
    hitCallback: function () {
      remove(ga)
      t.pass('sent data to google')
    }
  })
})

test('still works later', function (t) {
  t.plan(1)
  var ga = GA()
  ga('create', sampleCode, 'auto')
  until(500, 20, getElement, function (loaded) {
    setTimeout(function () {
      ga('send', 'pageview', {
        hitCallback: function () {
          remove(ga)
          t.pass('sent data to google')
        }
      })
    }, 1000)
  })
})
