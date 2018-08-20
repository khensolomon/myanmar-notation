# myanmar-notation
...get Myanmar digital and notation

Install `npm i myanmar-notation` then require...


```js
let notation = require('myanmar-notation');
```
and get the results...
```js
let result = notation.get('2700');
// the result returned as Object
{
  "Numeric": "၂,၇ဝဝ",
  "Notation": [{
    "sense": "နှစ်ထောင်နှင့် ခုနစ်ရာ"
  }]
}

let result = notation.get('27000000');
{
  "Numeric": "၂၇,ဝဝဝ,ဝဝဝ",
  "Notation": [{
      "sense": "သိန်းပေါင်း နှစ်ရာ့ခုနစ်ဆယ်",
      "exam": {
        "1": 22
      }
    },
    {
      "sense": "သန်းပေါင်း နှစ်ဆယ့်ခုနစ်",
      "exam": {
        "1": 22
      }
    },
    {
      "sense": "နှစ်ကု​ဋေ​နှင့် ခုနစ်သန်း"
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
