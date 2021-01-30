# myanmar-notation

...`get()` Myanmar digital and notation

[![Build Status][travis]][travis-url]
[![npm][npm-download]][npm-dl-url]
[![Webpack][webpack-check]][webpack-url]
![Mocha][test-mocha]

- [x] Return formatted Numeric
- [x] Decimals are rounded (floor)
- [x] Query `get(2700)`, `get('၂၇၀၀')`, `get('27,000,000.00')` ,`get('5.23e+8')` is flexible
- [x] Convert into Typescript
- [x] mocha
- [x] Auto-load
- [x] webpack

## Web

> In your web Application point `myanmarNotation`...

```js
<script src="https://unpkg.com/myanmar-notation@latest/min.js"></script>
```

> ... then

```js
myanmarNotation.get(12345678);
// return
{
  "number": "၁၂,၃၄၅,၆၇၈",
  "notation": [
    {
      "sense": "သိန်းပေါင်း တစ်ရာ့နှစ်ဆယ့်သုံးနှင့် လေးသောင်းငါးထောင်ခြောက်ရာခုနစ်ဆယ်နှင့်ရှစ်"
    },
    {
      "sense": "သန်းပေါင်း တစ်ဆယ့်နှစ်နှင့် သုံးသိန်းလေးသောင်းငါးထောင်ခြောက်ရာခုနစ်ဆယ်နှင့်ရှစ်"
    },
    {
      "sense": "တစ်ကု​ဋေ​နှစ်သန်းသုံးသိန်းလေးသောင်းငါးထောင်ခြောက်ရာခုနစ်ဆယ်နှင့်ရှစ်"
    }
  ]
}
```

## Node.js

> Install `npm i myanmar-notation` then require...

```js
let notation = require('myanmar-notation');
```

> ... and get the result returned as Object if there is a sense in get query, otherwise empty Object (`{}`) return.

```js
notation.get(2700);
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

notation.get('5.23e+8');
// return
{
  "number": "၅၂၃,၀၀၀,၀၀၀",
  "notation": [
    {
      "sense": "သိန်းပေါင်း ငါးထောင့်နှစ်ရာ့သုံးဆယ်"
    },
    {
      "sense": "သန်းပေါင်း ငါးရာ့နှစ်ဆယ့်သုံး"
    },
    {
      "sense": "ကု​ဋေ​ပေါင်း ငါးဆယ့်နှစ်နှင့် သုံးသန်း"
    }
  ]
}
```

## ESM

```js
import notation from 'myanmar-notation';
import {myanmarNotation} from 'myanmar-notation';

notation.get('90');
myanmarNotation('100');
```

## Commonjs

```js
const notation = require('myanmar-notation');
const {myanmarNotation} = require('myanmar-notation');

notation.get('90');
myanmarNotation('100');
```

> NOTE: `type` attribute in package should be `commonjs` before publishing to npm, but the package itself is a module so testing, developing must be alway `module`.

[![License: MIT][license]][license-url]

[test-mocha]: https://img.shields.io/badge/test-mocha-green.svg?longCache=true
[webpack-check]: https://img.shields.io/badge/webpack-yes-green.svg?longCache=true
[webpack-url]: https://unpkg.com/myanmar-notation@latest/min.js
[travis]: https://travis-ci.com/khensolomon/myanmar-notation.svg
[travis-url]: https://travis-ci.com/khensolomon/myanmar-notation
[npm-download]: https://img.shields.io/npm/dt/myanmar-notation.svg
[npm-dl-url]: https://www.npmjs.com/package/myanmar-notation
[license]: https://img.shields.io/badge/License-MIT-brightgreen.svg?longCache=true&style=popout-square
[license-url]: https://opensource.org/licenses/MIT