# myanmar-notation
...`get()` Myanmar digital and notation

> ...

Install `npm i myanmar-notation` then require...

```js
let notation = require('myanmar-notation');
```
... and get the result returned as Object if there is a sense in get query, otherwise Boolean (`false`) return.

- [x] Return formatted Numeric
- [x] Decimals are rounded (floor)
- [x] Query `get(2700)`, `get('၂၇၀၀')`, `get('27,000,000.00')` is flexible
- [x] Convert into Typescript
- [x] mocha
- [x] Auto-load
- [ ] webpack

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
