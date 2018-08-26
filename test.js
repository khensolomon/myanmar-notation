const fs = require('fs');
let notation = require('./notation');
let query = process.argv.slice(2)[0];
// query = '123456781234567876000';
// query = '27,000,000.00';
// query = '၁,၂ဝဝဝဝဝ.၂ဝ';
// query = '၂၇ဝဝ';

let test = new notation();
let raw = test.get(query);
raw.Query=query;
fs.writeFile("./test.json", JSON.stringify(raw, null, 2), 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }
    console.log(" ...done");
    // let abc = test.requestPrime(1,6,true);
    // console.log(abc);
});
/*
100000
000000
->10

100000
000000
000000

100000
000000
000000
000000
သိန်းပေါင်း သိန်းတစ်ဆယ့်နှစ်နှင့် သုံးသောင်းလေးထောင်ငါးရာခြောက်ဆယ်နှင့်ခုနစ်
သိန်းပေါင်း သိန်းတစ်ဆယ့်နှစ်နှင့် သုံးသောင်းလေးထောင့်ငါးရာ့ခြောက်ဆယ့်ခုနစ
*/