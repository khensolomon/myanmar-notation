#!/usr/bin/env node
const fs = require('fs');
fs.writeFile("./test/test.json", JSON.stringify({build:true}, null, 2), 'utf8', e=>console.log(e || "...done"));