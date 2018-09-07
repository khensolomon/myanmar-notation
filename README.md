# myanmar-notation
...`get()` Myanmar digital and notation

[![Build Status][travis]][travis-url]
[![npm][npm-download]][npm-dl-url]
[![Webpack][webpack-check]][webpack-url]
![Mocha][test-mocha]


> web

```html
<script src="https://unpkg.com/myanmar-notation@latest/min.js"></script>
```

> Node.js

Install `npm i myanmar-notation` then require...

```js
let notation = require('myanmar-notation');
```
... and get the result returned as Object if there is a sense in get query, otherwise empty Object (`{}`) return.

- [x] Return formatted Numeric
- [x] Decimals are rounded (floor)
- [x] Query `get(2700)`, `get('၂၇၀၀')`, `get('27,000,000.00')` is flexible
- [x] Convert into Typescript
- [x] mocha
- [x] Auto-load
- [x] webpack: `https://unpkg.com/myanmar-notation@latest/min.js`

```js
notation.get('2700');
// return
{
  "number": "၂,၇၀၀",
  "notation": [
    {
      "sense": "နှစ်ထောင်နှင့်ခုနစ်ရာ"
    }
  ]
}

notation.get('၂၇၀၀');
// return
{
  "number": "2,700",
  "notation": [
    {
      "sense": "နှစ်ထောင်နှင့်ခုနစ်ရာ"
    }
  ]
}

notation.get('27,000,000.00');
// return
{
  "number": "၂၇,၀၀၀,၀၀၀",
  "notation": [
		{
      "sense": "သိန်းပေါင်း နှစ်ရာ့ခုနစ်ဆယ်"
    },
    {
      "sense": "သန်းပေါင်း နှစ်ဆယ့်ခုနစ်"
    },
    {
      "sense": "နှစ်ကု​ဋေ​နှင့်ခုနစ်သန်း"
    }
  ]
}
```

[![License: MIT][license]][license-url]

[test-mocha]: https://img.shields.io/badge/test-mocha-green.svg?longCache=true
[webpack-check]: https://img.shields.io/badge/webpack-yes-green.svg?longCache=true
[webpack-url]: https://unpkg.com/myanmar-notation@latest/lib.js
[travis]: https://travis-ci.com/khensolomon/myanmar-notation.svg
[travis-url]: https://travis-ci.org/khensolomon/myanmar-notation
[npm-download]: https://img.shields.io/npm/dt/myanmar-notation.svg
[npm-dl-url]: https://www.npmjs.com/package/myanmar-notation
[license]: https://img.shields.io/badge/License-MIT-brightgreen.svg?longCache=true&style=popout-square
[license-url]: https://opensource.org/licenses/MIT