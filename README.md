# ga-b

Function that loads Google Analytics and returns the [`ga` command queue](https://developers.google.com/analytics/devguides/collection/analyticsjs/command-queue-reference) object.

## install

```sh
npm install ga-b
```

## example

```js
const ga = require('ga-b')

ga('create', trackingCode, 'auto')
ga('send', 'pageview')
```
