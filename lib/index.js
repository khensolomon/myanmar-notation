/*
 * myanmarNotation
 * Copyright(c) 2018 Khen Solomon Lethil
 * MIT Licensed
 */
const $ = {
  name:["သုည","တစ်","နှစ်","သုံး","လေး","ငါး","ခြောက်","ခုနစ်","ရှစ်","ကိုး"],
  digit:["၀","၁","၂","၃","၄","၅","၆","၇","၈","၉"],
  /*"ခု"*/
  tone:{1:"", 2:"ဆယ်", 3:"ရာ", 4:"ထောင်", 5:"သောင်း", 6:"သိန်း", 7:"သန်း", 8:"ကု​ဋေ​"},
  creaky:{2:"ဆယ့်",3:"ရာ့",4:"ထောင့်"},
  conjunction:{space:" ",comma:"၊ ",and:"နှင့်",plus:"ပေါင်း",over:"ကျော်",times:"ကြိမ်",dot:"ဒဿမ"}
};

/**
 * @param {string} q
 * @param {number[]} taskMain
 * @param {number} taskMin
 */
function requestSense(q, taskMain, taskMin) {
  if (taskMin <= Math.min.apply(Math, taskMain)) taskMain = [taskMin];
  return taskMain.map(
    k => taskMin >= k ? responseSense(q, k) : false
  ).filter(e => e);
}

/**
 * @param {string} q
 * @param {number} s
 */
function responseSense(q,s) {
  if (q.length <= s) return {sense: requestWrittenTone(q)||$.name[0]};

  let raw = strSeparate(q,s),
      rawCount = raw.length,
      rawEnd = raw.slice(-1)[0],
      rawEndCount = rawEnd.length,
      rawExam=new Object(),
      rawSense=new Array(),
      // NOTE: rules
      ruleExtract = rawEndCount,
      rulePrime = rawCount,
      ruleMax = Object.keys($.tone).length;

  function rawSenseName(){
    rawSense.push(requestPrime(rulePrime,s,(rawCount < 3 && s != rawEndCount))+requestCreakyTone(q,0,ruleExtract));
    rawSenseEach(q.substring(ruleExtract, q.length));
    return createString(rawSense);
  }

  function rawSenseEach(k=''){
    if (k && Number(k)){
      let ks = (s*2)-2,
          kr = k.substring(0,ks),
          k1 = requestWrittenTone(kr,0,s-1),
          k2 = requestCreakyTone(kr,s-1,k1.length);
      if (k2){
        let kp = requestPrime(1,s);
        rawSense.push(kp+k1+' '+k2);
      } else {
        rawSense.push(k1);
      }
      rawSenseEach(k.substring(ks,k.length));
    }
  }
  // prime, base, baseName, rest, restName, tail, tailName
  if (rawCount < 3) {
    if (s == rawEndCount) {
      ruleExtract=rawCount;
      rawExam={test:1};
    } else {
      rulePrime=1;
      if (rawCount > rawEndCount) {
        ruleExtract=rawCount;
      } else {
        ruleExtract=rawEndCount+1;
      }
      rawExam={test:2};
    }
  } else {
    ruleExtract=rawCount-1+rawEndCount;
    rulePrime=2;
    if (ruleExtract > ruleMax){
      ruleExtract=rawEndCount-3;
    }
    rawExam={test:3, raw:raw};
  }
  return {sense:rawSenseName(), exam: rawExam};
}

/**
 * @param {number} l
 * @param {number} k
 * param {keyof typeof $.tone} k
 * @param {boolean} s
 */
function requestPrime(l,k,s=false) {
  let i=0, e=[];
  while( i < l) {
    // if ($.tone.hasOwnProperty(k)){
    //   var abc = $.tone[k]
    // }
    // @ts-ignore
    e.push($.tone[k]); i++;
  }
  if (s) e.push('');
  return e.join($.conjunction.plus+$.conjunction.space);
}

/**
 * a:any[]
 * @param {*} a
 */
function createString(a) {
  if (a.length > 1) {
    return a.slice(0, -1).join($.conjunction.comma) + $.conjunction.and + $.conjunction.space + a.slice(-1);
  } else {
    return a.join($.conjunction.space);
  }
}

/**
 * str:string, n:number
 * @param {*} str
 * @param {*} n
 */
function strSeparate(str, n) {
  let e = new Array;
  for (let index = 0; index < str.length; index += n)
    e.push(str.substr(index, n));
  return e;
}

/**
 * @param {string} str
 * @param {number} from
 * @param {number} to
 * @returns {any[]}
 */
function strIntersect(str, from = 0, to = 0) {
  if (to) {
    return str.substring(from, to).split('');
  } else {
    return str.split('');
  }
}

/**
 * str:string,callback:any
 * @param {any[]} str
 * @param {{(tone:string, position:keyof typeof $.creaky, next:number, ):string}} callback
 */
function requestTone(str, callback) {
  let strCount = str.length, e = [];
  for (let index = 0; index < strCount; ++index) {
    /**
     * @type {keyof typeof $.tone}
     */
    let pos = (strCount - index);
    let tone = $.tone.hasOwnProperty(pos) ? $.tone[pos] : '';
    /**
     * @type {keyof typeof $.creaky}
     */
    let position = (pos);
    let digit = str[index];

    if (digit > 0) {
      e.push({
        name: $.name[digit],
        tone: callback(tone, position, (index + 1))
      });
    }
  }
  return e;
}

/**
 * @param {string} num
 * @param {number} from
 * @param {number} to
 * @param {string} pair
 */
function requestCreakyTone(num, from = 0, to = 0, pair = '') {
  let str = strIntersect(num, from, to);
  return requestTone(str, (tone, position, next) => {
    if (str.hasOwnProperty(next) && str[next] > 0 && $.creaky.hasOwnProperty(position)) {
      return $.creaky[position];
    }
    return tone;
  }).map(
    k => k.name + k.tone
  ).join(pair);
}

/**
 * @param {string} num
 * @param {number} from
 * @param {number} to
 * @param {string} pair
 */
function requestWrittenTone(num, from = 0, to = 0, pair = ' ') {
  let str = strIntersect(num, from, to);

  return requestTone(str, (tone) => tone ).map((k, index, e) => {
    if ((e.length - 2) == index) {
      return k.name + k.tone + $.conjunction.and;
    }
    return k.name + k.tone;
  }).join(pair);
}

/**
 * num:string,from:number=0,to:number=0,pair:string=' '
 * @param {string} num
 * @param {number} from
 * @param {number} to
 * @param {string} pair
 */
// function requestCreakyTail(num, from = 0, to = 0, pair = ' ') {
//   let str = strIntersect(num, from, to);
//   return requestTone(str, (tone, position, next) => {
//     if (str.hasOwnProperty(next) && $.creaky.hasOwnProperty(position) && str[next] > 0) {
//       return { normal: tone, creaky: $.creaky[position] };
//     }
//     return { normal: tone };
//   }).map((k, index, e) => {
//     if ((e.length - 2) == index) {
//       return k.name + k.tone.hasOwnProperty('creaky') ? k.name + k.tone.creaky : k.name + k.tone.normal;
//     }
//     return k.name + k.tone.normal;
//   }).join(pair);
// }

class Notation {
  /**
   * @param {string} q
   */
  constructor(q='') {
    // Remove spaces and commas
    q = q.replace(/[, ]/g,"");
    this.assignment = [6,7,8];
    this.q = '';
    this.note = { number:'',  notation:[] };

    if(parseInt( q ) === 0 ){
      this.q = '0';
      this.note.number = $.digit[0];
    } else if(parseInt( q.split('').map(k => $.digit.indexOf(k)).filter(e => e >= 0).join('')) === 0){
      this.q = '0';
      this.note.number = '0';
    } else if (this.clean(Number.parseFloat(q).toFixed())) {
      this.note.number = this.digit();
    } else if (this.clean(q.split('').map(k => $.digit.indexOf(k)).filter(e => e >= 0).join(''))) {
      this.note.number = this.q;
    }
  }

  get() {
    // @ts-ignore
    if (this.q) this.note.notation = requestSense(this.q,this.assignment,this.q.length);
    return this.note;
  }
  digit() {
    // return this.q.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return this.q.split('').map(k=>$.digit[parseInt(k)]||k).join('');
  }

  clean(q='') {
    let k = Math.floor(Number(q.toString().replace(/,\s?/g, '')));
    return this.q = k>0?k.toString():'';
  }
}

/**
 * @param {*} strOrNum
 */
export function get(strOrNum=''){
  return new Notation(strOrNum).get()
}

export const myanmarNotation = get;
export default get;