/*
 * myanmarNotation
 * Copyright(c) 2018 Khen Solomon Lethil
 * MIT Licensed
 */
const $ = {
  /*"ခု"*/
  conjunction:{
    space:" ",
    // over:"ကျော်",times:"ကြိမ်",dot:"ဒဿမ ",
    comma:"၊ ",and:"နှင့် ",plus:"ပေါင်း ",
  },
  numeral:[
    {name:"သုည", digit: "၀"},
    {name:"တစ်", digit: "၁"},
    {name:"နှစ်", digit: "၂"},
    {name:"သုံး", digit: "၃"},
    {name:"လေး", digit: "၄"},
    {name:"ငါး", digit: "၅"},
    {name:"ခြောက်", digit: "၆"},
    {name:"ခုနစ်", digit: "၇"},
    {name:"ရှစ်", digit: "၈"},
    {name:"ကိုး", digit: "၉"}
  ],
  scale:[
    {name:"", rule:0},
    {name: "ဆယ်", rule:1, creaky:"ဆယ့်"},
    {name: "ရာ", rule:2, creaky:"ရာ့"},
    {name: "ထောင်", rule:3, creaky:"ထောင့်"},
    {name: "သောင်း", rule:4},
    {name: "သိန်း", rule:5, limit:true},
    {name: "သန်း", rule:6, limit:true},
    {name: "ကု​ဋေ​", rule:7, limit:true}
    // {name: "ကောဋိ", rule:14},
    // {name: "ပကောဋိ", rule:21},
    // {name: "ကောဋိပကောဋိ", rule:28},
    // {name: "နဟုတံ", rule:35},
    // {name: "နိန္နဟုတံ", rule:42},
    // {name: "အက္ခဘေိဏီ", rule:49},
    // {name: "ဗိန္ဒု", rule:56},
    // {name: "အဗ္ဗုဒ", rule:63},
    // {name: "နိရဗ္ဗုဒ", rule:70},
    // {name: "အဗဗ", rule:77},
    // {name: "အဋဋ", rule:84},
    // {name: "သောကန္ဓိက", rule:91},
    // {name: "ဥပ္ပလ", rule:98},
    // {name: "ကုမုဒ", rule:105},
    // {name: "ပဒုမ", rule:112},
    // {name: "ပုဏ္ဍရိက", rule:119},
    // {name: "ကထာန", rule:126},
    // {name: "မဟာကထာန", rule:133},
    // {name: "အသင်္ချေ2", rule:140}
  ]
};

const UnitLeft = "l";
const UnitRight = "r";
const digitBurmese = $.numeral.map(e=>e.digit);

/**
 * @param {number} len
 * @param {string} head - default 1
 * join Zero tail
 */
export const multiplication = (len, head='1') => head+ Array(len).join("0");

/**
 * @param {string} str
 * convert to Burmese
 */
export const keep = str => str.replace(/[0-9]/g,i=>digitBurmese[parseInt(i)]);

/**
 * @param {string} str
 * convert from Burmese
 */
export const turn = str => str.split('').map(i => digitBurmese.includes(i)?digitBurmese.indexOf(i):i).join('');

/**
 * @param {string} str
 * @param {number} size - normally [5,6,7]
 * @param {number} right - right: 1, left: 0 default
 * @return {any[]}
 */
function chunk(str, size,right=0) {
  var length = str.length;
  var list = Array(Math.ceil(length / size));
  var listIndex = 0;
  if (right == 1){
    list[0] = str.slice(0, length % size || size);
    listIndex = list[0].length;
  }
  for (let i = right, index = listIndex; index < length; i++) {
    list[i] = str.slice(index, index += size);
  }

  return list
}

/**
 * @param {string} n - max length: 12345678-8
 * returns {{sense:string, number:string,digit:string,raw:Array<{name:string, tone:string, creaky:boolean, digit:number, index:number}>}}
 */
function sense(n='0'){
  /**
   * @type {{name: string, tone: string | undefined, creaky:boolean, index: number}[]}
   */
  var raw = [];
  // var row = { number: keep(n), digit: n, sense:''};
  var row = { sense:'' };
  if (n.length <= 1 && Number(n) < 1){
    row.sense=$.numeral[0].name;
  } else {
    var k = n.length;
    for (var i=0; i < k;  i++) {
      var num = Number(n[i]);
      if (num > 0) {
        var index = k-i-1;
        if (raw.length > 0 && index < 3) {
          const [last] = raw.slice(-1);
          if ($.scale[last.index].hasOwnProperty('creaky')){
            last.creaky=true;
            last.tone=$.scale[last.index].creaky;
          }
        }
        // raw.push({name: $.numeral[num].name, tone: $.scale[index].name, creaky:false, digit: num, index: index});
        raw.push({name: $.numeral[num].name, tone: $.scale[index].name, creaky:false, index: index});
      }
    }
    row.sense = raw.map(e=>e.name+e.tone).join('');
  }
  return row;
}

/**
 * @param {string} str
 * @param {any} scale
 */
function engine(str,scale){
  var rule = scale.rule;
  if (rule < 5) return sense(str);
  var name = scale.name;
  var list = chunk(str,rule,1);
  var size = list.length, last = size -1;

  var fst = '';
  var mid = [];
  for (let i = 0; i < size; i++) {
    var num = list[i];
    var row = sense(num);
    var isHead = (i%2) == 0;
    if (i>1 || isHead) mid.push(name);
    if (row.sense){
      if (isHead){
        if (i == 0){
          fst += UnitLeft;
        } else if (i != last){
          fst += name;
        }
        fst += row.sense;
        if (num.length <= 1) fst += UnitRight;

      } else {
        if (i == last) {
          fst += $.conjunction.space;
        } else {
          fst += $.conjunction.and;
        }
        // fst += $.conjunction.and;
        fst += row.sense;
        if (i != last) fst += $.conjunction.comma;
      }
    }
  }

  if (fst.indexOf(UnitRight) >= 0){
    fst = fst.replace(UnitRight,mid.shift());
    if (mid.length == 0){
      mid.push('')
    }
  }

  return {
    sense: fst.replace(UnitLeft,mid.join($.conjunction.comma).replace($.conjunction.comma,$.conjunction.plus)),
    rule:rule, size:str.length, list: list
  }

}

/**
 * @param {string|number} str
 * @example get(123);
 */
export function get(str) {
  if (typeof str == 'string'){
    if (new RegExp(digitBurmese.join("|")).test(str) == true) str = turn(str);
    str = str.replace(/^0+/, '').replace(/[, ]/g,"");
  }
  var query = Number(str).toLocaleString('fullwide', {useGrouping:false}), k = query.length-1;
  /**
   * @type {{number:string,digit:string,notation:any[]}}
   */
  var result ={number:keep(query),digit:query,notation:[]};

  if (Number(str) <= 0) {
    result.notation.push(sense());
  } else {
    result.notation = $.scale.filter(
      e => e.limit && e.rule <= k || e.rule == k
      // e => e.rule > 6 && e.rule <= k
    ).map(
      e => engine(query,e)
    );
  }

  return result;
}
/** @namespace */
const myanmarNotation = {keep,turn,multiplication,get};
export default myanmarNotation;