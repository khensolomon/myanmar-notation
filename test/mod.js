#!/usr/bin/env node
// @ts-check
import fs from 'fs';
import notation from '../lib/index.js';

// let query = process.argv.slice(2)[0];
// query = '၁,၂၀၀၀၀၀.၂ဝ';

var raw = [];
[12345678,2700,'၂,၇၀၀','27,000,000.00','5.23e+8'].forEach(query=>raw.push(notation.get(query)))
// ['27,000,000.00'].forEach(query=>raw.push(notation.get(query)))

fs.writeFile("./test/mod.json", JSON.stringify(raw, null, 2), 'utf8', e=>console.log(e || "...done"));
