module.exports = class Notation {
  constructor() {
    this.config={
      name:["သုည","တစ်","နှစ်","သုံး","လေး","ငါး","ခြောက်","ခုနစ်","ရှစ်","ကိုး"],
      digit:["ဝ","၁","၂","၃","၄","၅","၆","၇","၈","၉"],
      // 1:"ခု",
      tone:{1:"", 2:"ဆယ်", 3:"ရာ", 4:"ထောင်", 5:"သောင်း", 6:"သိန်း", 7:"သန်း", 8:"ကု​ဋေ​"},
      creaky:{2:"ဆယ့်",3:"ရာ့",4:"ထောင့်"},
      conjunction:{space:" ",comma:"၊ ",and:"နှင့်",plus:"ပေါင်း",over:"ကျော်",times:"ကြိမ်":dot:"ဒဿမ"},
      task:[6,7,8]
    }
  }
  get(query) {
    let q=Math.floor(Number(query.toString().replace(/,\s?/g, ""))).toString(),t=0;
    if (isNaN(q)){
      q=this.getUni(query),t=1;
      if (q<1 || isNaN(q)) return false;
    }
    return this.getResult(q,t);
  }
  getUni(query) {
    let n = query.toString().split('').map(k=> {
      return (this.config.digit.indexOf(k) >= 0)?this.config.digit.indexOf(k):k;
    }).filter(function(e){return e == 0 || e}).join('');
    return Math.floor(Number(n.replace(/,\s?/g, ""))).toString();
  }
  getResult(q,t) {
    let n = this.requestFormat(q);
    return {
      Numeric:(t)?n:this.requestDigit(n),
      Notation:this.config.task.map(k=>{
        return this.requestTask(q,k);
      }).filter(function(e){return e})
    };
  }
  requestTask(q,s) {
    if (q.length <= s) {
      if (this.config.task.length) {
        this.config.task=[];
        return {
          // sense:this.requestCreakyTone(q)
          sense:this.requestWrittenTone(q)
        }
      }
      return false;
    }
    let raw = this.strSeparate(q,s);
    let rawCount = raw.length;
    let rawEnd = raw.slice(-1)[0];
    let rawEndCount = rawEnd.length;

    let ruleExtract = rawEndCount;
    let rulePrime = rawCount;
    let ruleMax = Object.keys(this.config.tone).length;

    // let Measure=this.config.tone[s];
    // let ConjunctionPlus=this.config.conjunction.plus;
    // let PrefixeTimes='';
    // let SuffixeMeasure='';

    let examNotation=false;
    let rawSense=[], rawSenseName = ()=>{
      rawSense.push(this.requestPrime(rulePrime,s,(rawCount < 3 && s != rawEndCount))+this.requestCreakyTone(q,0,ruleExtract));
      rawSenseEach(q.substring(ruleExtract, q.length));
      return this.createString(rawSense);
    }, rawSenseEach = (k)=>{
      if (k && Number(k)){
        let ks = (s*2)-2;
        let kr = k.substring(0,ks);
        let k1 = this.requestWrittenTone(kr,0,s-1);
        let k2 = this.requestCreakyTone(kr,s-1,k1.length);
        if (k2){
          let kp = this.requestPrime(1,s);
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
        examNotation={test:1};
      } else {
        rulePrime=1;
        if (rawCount > rawEndCount) {
          ruleExtract=rawCount;
        } else {
          ruleExtract=rawEndCount+1;
        }
        examNotation={test:2};
      }
    } else {
      ruleExtract=rawCount-1+rawEndCount;
      rulePrime=2;
      if (ruleExtract > ruleMax){
        ruleExtract=rawEndCount-3;
      }
      examNotation={test:3, raw:raw};
    }
    return {
      sense:rawSenseName()//, exam: examNotation
    };
  }
  requestObject(str,callback) {
    let strCount = str.length, e=[];
    for (let index = 0; index < strCount;++index){
      let position = strCount - index;
      let digit = str[index], next = index+1;
      let tone=this.config.tone.hasOwnProperty(position)?this.config.tone[position]:'';

      if (digit > 0)e.push({
        name:this.config.name[digit],
        tone:callback(position,next,tone)
      });
    }
    return e;
  }
  requestCreakyTone(num,from,to,pair='') {
    let str = this.strIntersect(num,from,to);
    return this.requestObject(str,(position,next,tone)=>{
      if (str.hasOwnProperty(next) && str[next] > 0){
        return this.config.creaky.hasOwnProperty(position)?this.config.creaky[position]:tone;
      }
      return tone;
    }).map((k,index)=>{
      return k.name+k.tone;
    }).join(pair)
  }
  requestWrittenTone(num,from,to,pair='') {
    let str = this.strIntersect(num,from,to);
    return this.requestObject(str,(position,next,tone)=>{
      return tone;
    }).map((k,index,e)=>{
      if ((e.length - 2) == index) {
        return k.name+k.tone+this.config.conjunction.and;
      }
      return k.name+k.tone;
    }).join(pair);
  }
  requestCreakyTail(num,from,to,pair=' ') {
    let str = this.strIntersect(num,from,to);
    return this.requestObject(str,(position,next,tone)=>{
      if (str.hasOwnProperty(next) && this.config.creaky.hasOwnProperty(position) && str[next] > 0){
        return {normal:tone, creaky:this.config.creaky[position]};
      }
      return {normal:tone}
    }).map((k,index,e)=>{
      if ((e.length - 2) == index) {
        return k.name+k.tone.hasOwnProperty('creaky')?k.name+k.tone.creaky:k.name+k.tone.normal;
      }
      return k.name+k.tone.normal;
    }).join(pair);
  }
  requestDigit(n) {
    return n.split('').map(k=>{
      return this.config.digit.hasOwnProperty(k)?this.config.digit[k]:k;
    }).join('');
  }
  requestFormat(n) {
    return n.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  requestPrime(l,k,s) {
    let i=0, e=[];
    while( i < l) { e.push(this.config.tone[k]); i++;}
    if (s)e.push('');
    return e.join(this.config.conjunction.plus+this.config.conjunction.space);
  }
  createString(a) {
    // let a= n.filter(function(e){return e});
    if (a.length > 1){
      return a.slice(0, -1).join(this.config.conjunction.comma)+this.config.conjunction.and+this.config.conjunction.space+a.slice(-1);
    } else {
      return a.join(this.config.conjunction.space);
    }
  }
  strSeparate(str, n) {
    let e = new Array;
    for (let index=0; index < str.length; index += n) e.push(str.substr(index,n));
    return e;
  }
  strIntersect(str,from,to) {
    if (to){
      return str.substring(from, to).split('');
    } else{
      return str.split('');
    }
  }
}