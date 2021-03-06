# myanmar-notation

... is Node.js module and a library which converts the given number into words in Myanmar. Following written rule and add the creaky tone on number places 10<sup>5</sup>, 10<sup>6</sup> and 10<sup>7</sup>.

## Description

Normally "ပေါင်း" in Myanmar translated "plus", however the same word using in a large number of amount dedicate multiply. For example
သိန်းတစ်သောင်း is `1 0000 00000` and can also/usually pronounced သိန်းပေါင်း တစ်သောင်း which mean "`(100000*10000)`", therefor "သိန်းတစ်သောင်း" and "သိန်းပေါင်း တစ်သောင်း" has dedicated the same amount. This module is using "ပေါင်း" when the dedicated amount is larger than the subsequent scale name "ခု", "ဆယ်", "ရာ", "ထောင်", "သောင်း", "သိန်း", "သန်း" and "ကု​ဋေ​".

It can be a bit confusing between "သိန်းတစ်သိန်း" and "တစ်သိန်း" as of spoken usually does

> "ငွေ သိန်းတစ်သိန်းလောက်  ချေးပေးလို့ရမလား ခင်ဗျာ"

they probabbly just wanted "100000",
but there are entirely different as "သိန်းတစ်သိန်း" mean "10000 000000" and "တစ်သိန်း" mean "100000".

There are also difference positioning scale name, primarly it is followed by the given number

> 10: "တစ်ဆယ်" 20: "နှစ်ဆယ်" 10000000: "တစ်ကု​ဋေ​"

However using this primarly structure in large amount seem very weird, eg.100000000: "တစ်ထောင်သိန်း", "တစ်ရာသန်း", "တစ်ဆယ်ကု​ဋေ​", therefore in such amount the scale name lead the number to take away this weirdness.

> 100000000: "သိန်းတစ်ထောင်", "သန်းတစ်ရာ", "ကု​ဋေ​တစ်ဆယ်"

Check [demo][demo] is available...

![Github][workflows]
[![Build Status][travis-svg]][travis]
[![npm][npm-svg]][npm]
[![Webpack][webpack-check]][latest-min]
![Mocha][test-mocha]

- [x] Decimals are rounded (floor)
- [x] Query `get(2700)`, `get('၂၇၀၀')`, `get('27,000,000.00')` ,`get('5.23e+8')` is flexible
- [x] [Demo][demo]
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
    "number": "၁၂၃၄၅၆၇၈",
    "digit": "12345678",
    "notation": [
      {
        "sense": "သိန်းတစ်ရာ့နှစ်ဆယ့်သုံး လေးသောင်းငါးထောင့်ခြောက်ရာ့ခုနစ်ဆယ့်ရှစ်",
        "rule": 5,
        "size": 8,
        "list": [
          "123",
          "45678"
        ]
      },
      {
        "sense": "သန်းတစ်ဆယ့်နှစ် သုံးသိန်းလေးသောင်းငါးထောင့်ခြောက်ရာ့ခုနစ်ဆယ့်ရှစ်",
        "rule": 6,
        "size": 8,
        "list": [
          "12",
          "345678"
        ]
      },
      {
        "sense": "တစ်ကု​ဋေ​ နှစ်သန်းသုံးသိန်းလေးသောင်းငါးထောင့်ခြောက်ရာ့ခုနစ်ဆယ့်ရှစ်",
        "rule": 7,
        "size": 8,
        "list": [
          "1",
          "2345678"
        ]
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
notation.get('၂၇၀၀');
// return
  {
    "number": "၂၇၀၀",
    "digit": "2700",
    "notation": [
      {
        "sense": "နှစ်ထောင့်ခုနစ်ရာ"
      }
    ]
  }

notation.get('27,000,000.00');
// return
  {
    "number": "၂၇၀၀၀၀၀၀",
    "digit": "27000000",
    "notation": [
      {
        "sense": "သိန်းနှစ်ရာ့ခုနစ်ဆယ်",
        "rule": 5,
        "size": 8,
        "list": [
          "270",
          "00000"
        ]
      },
      {
        "sense": "သန်းနှစ်ဆယ့်ခုနစ်",
        "rule": 6,
        "size": 8,
        "list": [
          "27",
          "000000"
        ]
      },
      {
        "sense": "နှစ်ကု​ဋေ​ ခုနစ်သန်း",
        "rule": 7,
        "size": 8,
        "list": [
          "2",
          "7000000"
        ]
      }
    ]
  }

notation.get('5.23e+8');
// return
  {
    "number": "၅၂၃၀၀၀၀၀၀",
    "digit": "523000000",
    "notation": [
      {
        "sense": "သိန်းငါးထောင့်နှစ်ရာ့သုံးဆယ်",
        "rule": 5,
        "size": 9,
        "list": [
          "5230",
          "00000"
        ]
      },
      {
        "sense": "သန်းငါးရာ့နှစ်ဆယ့်သုံး",
        "rule": 6,
        "size": 9,
        "list": [
          "523",
          "000000"
        ]
      },
      {
        "sense": "ကု​ဋေ​ငါးဆယ့်နှစ် သုံးသန်း",
        "rule": 7,
        "size": 9,
        "list": [
          "52",
          "3000000"
        ]
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

## CommonJS

```js
const notation = require('myanmar-notation');
const {myanmarNotation} = require('myanmar-notation');

notation.get('90');
myanmarNotation('100');

// ---
[2/6] 1 00000 = (100000*1)
တစ်သိန်း
သိန်းပေါင်း တစ်

[2/7] 12 00034 = (100000*12+34)
တစ်ဆယ့်နှစ် သိန်း နှင့် သုံးဆယ့်လေး
သိန်းပေါင်း တစ်ဆယ့်နှစ် နှင့် သုံးဆယ့်လေး

[2/8] 123 00000 = (100000*123)
တစ်ရာ့နှစ်ဆယ့်သုံး သိန်း
သိန်းပေါင်း တစ်ရာ့နှစ်ဆယ့်သုံး

[2/9] 1234 00000 = (100000*1234)
တစ်ထောင့်နှစ်ရာ့သုံးဆယ့်လေး သိန်း
သိန်းပေါင်း တစ်ထောင့်နှစ်ရာ့သုံးဆယ့်လေး

[2/10] 12345 00000 = (100000*12345)
တစ်သောင်းနှစ်ထောင့်သုံးရာ့လေးဆယ့်ငါး သိန်း
သိန်းပေါင်း တစ်သောင်းနှစ်ထောင့်သုံးရာ့လေးဆယ့်ငါး

[3/11] 1 00000 00000 = (100000*100000)
uon-r
သိန်းပေါင်း တစ်သိန်း

[3/12] 12 00000 00000 = (100000*1200000)
uon-r
သိန်းပေါင်း တစ်ဆယ့်နှစ်သိန်း
သိန်းပေါင်း သိန်းတစ်ဆယ့်နှစ်

[3/15] 12 00000 00000 = (100000*1200000000)
uon-r
သိန်းပေါင်း သိန်းတစ်သောင်းနှစ်ထောင်

[4/16] 1 00000 00000 00000 = (100000*100000*100000)
uon-r
သိန်းပေါင်း သိန်း တစ်သိန်း

[4/20] 10000 00000 00000 00000 = (100000*100000*1000000000)
uon-r
သိန်းပေါင်း သိန်း သိန်းတစ်သောင်း

[5/21] 1 00000 00000 00000 00000 = (100000*100000*100000*100000)
uon-r
သိန်းပေါင်း သိန်း၊ သိန်း တစ်သိန်း

Nested-simple/Nested-complex
[5/21] 1 20000 30000 40000 50000 = (100000*100000*100000*120000+(100000*3000040005)).toLocaleString()
.toLocaleString('fullwide', {useGrouping:false});
uon-r
သိန်းပေါင်း သုံးသောင်း၊ လေးသောင်း တစ်သိန်း နှစ်သောင်း

သိန်းပေါင်း တစ်သိန်း နှစ်သောင်း

သိန်း နှစ်ထောင်

(100000*100000*12000000000+(100000*30000400000)+50000).toLocaleString('fullwide', {useGrouping:false})
(100000*100000*12000000000+(100000*3000040000)+50000).toLocaleString('fullwide', {useGrouping:false})
```

> NOTE: `type` attribute in package should be `commonjs` before publishing to npm, but the package itself is a module so testing, developing must be alway `module`.

[![License: MIT][license]][license-url]

[demo]: https://khensolomon.github.io/myanmar-notation/
[workflows]: https://github.com/khensolomon/myanmar-notation/workflows/Node/badge.svg

[test-mocha]: https://img.shields.io/badge/test-mocha-green.svg?longCache=true
[webpack-check]: https://img.shields.io/badge/webpack-yes-green.svg?longCache=true
[latest-min]: https://unpkg.com/myanmar-notation@latest/min.js
[travis-svg]: https://travis-ci.com/khensolomon/myanmar-notation.svg
[travis]: https://travis-ci.com/khensolomon/myanmar-notation
[npm-svg]: https://img.shields.io/npm/dt/myanmar-notation.svg
[npm]: https://www.npmjs.com/package/myanmar-notation
[license]: https://img.shields.io/badge/License-MIT-brightgreen.svg?longCache=true&style=popout-square
[license-url]: https://opensource.org/licenses/MIT
