#!/usr/bin/env node
// NOTE: npm run package
const fs = require('fs');
// const notation = require('../notation');
const notation = require('../');
let query = process.argv.slice(2)[0];

// query = '123456781234567876000';
// query = '27,000,000.00';
// query = '၁,၂၀၀၀၀၀.၂ဝ';
// query = '၂၇၀၀';
// query = '၂,၇၀၀';

let raw = notation.get(query);
fs.writeFile("./test/package.json", JSON.stringify(raw, null, 2), 'utf8', e=>console.log(e || "...done"));