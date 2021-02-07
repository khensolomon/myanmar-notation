#!/usr/bin/env node
// @ts-check
// NOTE: npm run package

import fs from 'fs';
import notation from '../lib/index.js';
// // const notation = require('../notation');
// const notation = require('../');
let query = process.argv.slice(2)[0];

query = '27,000,000.00';
// query = '27,000,000';
// query = '၁,၂၀၀၀၀၀.၂ဝ';
// // query = '၂၇၀၀';
// query = '၂,၇၀၀';
// // query = '5.23e+8';
// console.log(notation);

let raw = notation(query);
fs.writeFile("./test/mod.json", JSON.stringify(raw, null, 2), 'utf8', e=>console.log(e || "...done"));

// function NumInWords( n ) {

//   var string = n.toString(), units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words, and = 'and';

//   /* Remove spaces and commas */
//   string = string.replace(/[, ]/g,"");

//   /* Is number zero? */
//   if( parseInt( string ) === 0 ) {
//       return 'zero';
//   }

//   /* Array of units as words */
//   units = [ '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen' ];

//   /* Array of tens as words */
//   tens = [ '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety' ];

//   /* Array of scales as words */
//   scales = [ '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion' ];

//   /* Split user argument into 3 digit chunks from right to left */
//   start = string.length;
//   chunks = [];
//   while( start > 0 ) {
//       end = start;
//       chunks.push( string.slice( ( start = Math.max( 0, start - 3 ) ), end ) );
//   }

//   /* Check if function has enough scale words to be able to stringify the user argument */
//   chunksLen = chunks.length;
//   if( chunksLen > scales.length ) {
//       return '';
//   }

//   /* Stringify each integer in each chunk */
//   words = [];
//   for( i = 0; i < chunksLen; i++ ) {

//       chunk = parseInt( chunks[i] );

//       if( chunk ) {

//           /* Split chunk into array of individual integers */
//           ints = chunks[i].split( '' ).reverse().map( parseFloat );

//           /* If tens integer is 1, i.e. 10, then add 10 to units integer */
//           if( ints[1] === 1 ) {
//               ints[0] += 10;
//           }

//           /* Add scale word if chunk is not zero and array item exists */
//           if( ( word = scales[i] ) ) {
//               words.push( word );
//           }

//           /* Add unit word if array item exists */
//           if( ( word = units[ ints[0] ] ) ) {
//               words.push( word );
//           }

//           /* Add tens word if array item exists */
//           if( ( word = tens[ ints[1] ] ) ) {
//               words.push( word );
//           }

//           /* Add 'and' string after units or tens integer if: */
//           if( ints[0] || ints[1] ) {

//               /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
//               if( ints[2] || (i + 1) > chunksLen ) {
//                   words.push( and );
//               }


//           }

//           /* Add hundreds word if array item exists */
//           if( ( word = units[ ints[2] ] ) ) {
//               words.push( word + ' hundred' );
//           }

//       }

//   }

//   return words.reverse().join( ' ' );

// }


// // console.log(NumInWords(1111))

// /**
//  * @param {number | string} n
//  */
// function NumInMyanmar(n=''){
//   var string = n.toString().replace(/[, ]/g,"");
//   return string;
// }

// console.log(NumInMyanmar(1111))