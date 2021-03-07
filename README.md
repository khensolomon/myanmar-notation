# myanmar-notation

...is Node.js module and a library which converts the given number into words in Myanmar. Following written rule and add the creaky tone on number places 10<sup>5</sup>, 10<sup>6</sup> and 10<sup>7</sup>. Check [live Application][demo] is available...

![Github][workflows]
[![Build Status][travis-svg]][travis]
[![npm][npm-svg]][npm]
[![Webpack][webpack-check]][latest-min]
![Mocha][test-mocha]

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

## Feature

- [x] Decimals are rounded (floor)
- [x] Query `get(2700)`, `get('၂၇၀၀')`, `get('27,000,000.00')` ,`get('5.23e+8')` is flexible
- [x] [Demo][demo]
- [x] mocha
- [x] webpack

## Usage

### Node.JS

`npm i myanmar-notation` to install, and can be `require` or `import` from your Node.JS application. However `myanmar-notation` is assuming that one day npm might force us to seperate ES and CommonJS module. Therefore, it is a good practice to start coding Node.JS application using ES6 module.

```js
// ES6
import notation from 'myanmar-notation';
import {get} from 'myanmar-notation';

notation.get(2700);
// notation.multiplication(5);
// notation.keepBurmese(123);
// notation.turnBurmese('၄၅၆');
get(12345678);

// CommonJS
const notation = require('myanmar-notation');
const {get} = require('myanmar-notation');

notation.get(2700);
get(12345678);
```

### Browser

Include the file `myanmar-notation@latest/min.js` in your web application. It is available on [UNPKG][unpkg].

```html
<script src="https://unpkg.com/myanmar-notation@latest/min.js"></script>
<script>
let notation = window.myanmarNotation;
</script>
```

## API

- [multiplication](#multiplication)
- [keepBurmese](#keepburmese)
- [turnBurmese](#turnburmese)
- [get](#get)

### Multiplication

the `notation.multiplication()` function construct the given len to zero ending, it takes 2 arguments `(len, head='1')`, second argument is optional and return the result as string.

```js
notation.multiplication(5,'10');
> "100000"
```

### KeepBurmese

the `notation.keepBurmese()` function convert the given string(number) to Burmese number and return the result as string.

```js
notation.keepBurmese(1234567);
> "၁၂၃၄၅၆၇"
```

### TurnBurmese

the `notation.turnBurmese()` function convert the given string(number) to English number and return the result as string.

```js
notation.turnBurmese('၁၂၃၄၅၆၇');
> "1234567"
```

### get

the `notation.get()` return an object if there is a sense in get query, otherwise empty Object return.

```js
notation.get(2700);
// return
>  {
    "number": "၂၇၀၀",
    "digit": "2700",
    "notation": [
      {
        "sense": "နှစ်ထောင့်ခုနစ်ရာ"
      }
    ]
  }

notation.get(12345678);
// return
>  {
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

## License

[![License: MIT][license]][license-url]

> NOTE: `type` attribute in package should be `commonjs` before publishing to npm, but the package itself is a module so testing, developing must be alway `module`.

[demo]: https://khensolomon.github.io/myanmar-notation/
[workflows]: https://github.com/khensolomon/myanmar-notation/workflows/Node/badge.svg
[test-mocha]: https://img.shields.io/badge/test-mocha-green.svg?longCache=true
[webpack-check]: https://img.shields.io/badge/webpack-yes-green.svg?longCache=true
[latest-min]: https://unpkg.com/myanmar-notation@latest/min.js
[unpkg]: https://unpkg.com/
[travis-svg]: https://travis-ci.com/khensolomon/myanmar-notation.svg
[travis]: https://travis-ci.com/khensolomon/myanmar-notation
[npm-svg]: https://img.shields.io/npm/dt/myanmar-notation.svg
[npm]: https://www.npmjs.com/package/myanmar-notation
[license]: https://img.shields.io/badge/License-MIT-brightgreen.svg?longCache=true&style=popout-square
[license-url]: https://opensource.org/licenses/MIT
