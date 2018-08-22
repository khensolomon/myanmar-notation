# myanmar-notation
...`get()` Myanmar digital and notation

Install `npm i myanmar-notation` then require...


```js
let notation = require('myanmar-notation');
```
... and get the result returned as Object if there is a sense in get query, otherwise Boolean (`false`) return.

- [x] Return formatted Numeric
- [x] Decimals are rounded (floor)
- [x] Query `get(2700)`, `get('၂၇ဝဝ')`, `get('2,700.00')` is flexible

```js
notation.get('2700');
// return
{
  "Numeric": "၂,၇ဝဝ",
  "Notation": [
    {
      "sense": "နှစ်ထောင်နှင့် ခုနစ်ရာ"
    }
  ]
}

notation.get('27000000');
// return
{
  "Numeric": "၂၇,ဝဝဝ,ဝဝဝ",
  "Notation": [
    {
      "sense": "သိန်းပေါင်း နှစ်ရာ့ခုနစ်ဆယ်"
    },
    {
      "sense": "သန်းပေါင်း နှစ်ဆယ့်ခုနစ်"
    },
    {
      "sense": "နှစ်ကု​ဋေ​နှင့် ခုနစ်သန်း"
    }
  ]
}

// Reverse
notation.get('၈၆ဝ');
// return
{
  "Numeric": "860",
  "Notation": [
    {
      "sense": "ရှစ်ရာနှင့် ခြောက်ဆယ်"
    }
  ]
}
```
Configuration
```js
notation.name();
notation.digit();
notation.tone();
notation.creaky();
notation.conjunction();
```
