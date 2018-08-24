const fs = require('fs');
let notation = require('./notation');
let query = process.argv.slice(2)[0];
// query = '27,000,000.00';
// query = '၁,၂ဝဝဝဝဝ.၂ဝ';
// query = '၂၇ဝဝ';

let raw = new notation().get(query);
raw.Query=query;
fs.writeFile("./test.json", JSON.stringify(raw, null, 2), 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }
    console.log(" ...done");
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
*/