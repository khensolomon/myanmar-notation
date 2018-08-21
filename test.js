const fs = require('fs');
let notation = require('./notation');
let query = process.argv.slice(2)[0];
// query = '၁,၂ဝဝဝဝဝ';
query = '၈၆ဝ';

let raw = new notation().get(query);
// raw.Query=query;
fs.writeFile("./test.json", JSON.stringify(raw, null, 2), 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }
    console.log(" ...done");
});