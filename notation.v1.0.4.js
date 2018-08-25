module.exports = class Notation {
  constructor() {
    this.config={
      name:["သုည","တစ်","နှစ်","သုံး","လေး","ငါး","ခြောက်","ခုနစ်","ရှစ်","ကိုး"],
      digit:["ဝ","၁","၂","၃","၄","၅","၆","၇","၈","၉"],
      // 1:"ခု",
      tone:{1:"", 2:"ဆယ်", 3:"ရာ", 4:"ထောင်", 5:"သောင်း", 6:"သိန်း", 7:"သန်း", 8:"ကု​ဋေ​"},
      creaky:{2:"ဆယ့်",3:"ရာ့",4:"ထောင့်"},
      conjunction:{space:" ",comma:"၊ ",and:"နှင့်",plus:"ပေါင်း",over:"ကျော်",times:"ကြိမ်"},
      task:[6,7,8]
    }
  }
  configName() {
    return this.config.name;
  }
  configDigit() {
    return this.config.digit;
  }
  configTone() {
    return this.config.tone;
  }
  configCreaky() {
    return this.config.creaky;
  }
  configConjunction() {
    return this.config.conjunction;
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
    let rawSense=[];

    // let Measure=this.config.tone[s];
    // let ConjunctionPlus=this.config.conjunction.plus;
    // let PrefixeTimes='';
    // let SuffixeMeasure='';

    let examNotation=false;

    if (rawCount < 3) {
      if (s == rawEndCount) {
        ruleExtract=rawCount;
        // prime, base, baseName, rest, restName, tail, tailName
        rawSense.push(this.requestPrime(rulePrime,s)+this.requestCreakyTone(q,0,ruleExtract));
        rawSense.push(this.requestCreakyTone(q,rulePrime, s+1));
        rawSense.push(this.requestWrittenTone(q,s+1, q.length));
        // examNotation={1:21};
      } else {
        if (rawCount > rawEndCount) {
          ruleExtract=rawCount;
        } else {
          ruleExtract=rawEndCount+1;
        }
        rulePrime=1;
        rawSense.push(this.requestPrime(rulePrime,s,true)+this.requestCreakyTone(q,0,ruleExtract));
        rawSense.push(this.requestCreakyTone(q,ruleExtract, q.length));
        // examNotation={1:22};
      }
    } else {
      if (s == rawEndCount) {
        ruleExtract=rawCount;
        let rawOver='';
        if (Number(q.substring(ruleExtract, q.length))){
          rawOver=this.config.conjunction.over;
        }
        rawSense.push(this.requestPrime(rulePrime,s)+this.requestCreakyTone(q,0,ruleExtract)+rawOver);
        // examNotation={1:31};
      } else {
        ruleExtract=rawCount-1+rawEndCount;
        rulePrime=rawCount-1;
        // ruleExtract=rawCount;
        if (ruleExtract > ruleMax){
          ruleExtract=rawEndCount-3;
          rulePrime=rawCount;
        }
        let rawOver='';
        // if (Number(q.substring(ruleExtract, q.length))){
        //   rawOver=this.config.conjunction.over;
        // }
        let leftOver = q.substring(ruleExtract, q.length);
        if (Number(leftOver)){
          rawOver=this.config.conjunction.over;
          // leftOver = q.substring(ruleExtract, q.length-s);
          leftOver = q.substring(ruleExtract, q.length-s);
        }
        // 1234567000000==100000*12300000+4567000000
        // 1234567000000==100000*123 45670
        // 1234567000000000==100000*12345 600000+7000 000000
        rawSense.push(this.requestPrime(rulePrime,s)+this.requestCreakyTone(q,0,ruleExtract)+rawOver);
        examNotation={
          working:true,
          a1:q,
          raw:raw,
          b11:q.substring(0,ruleExtract),
          b12:q.substring(ruleExtract,s+2),
          b13:q.substring(ruleExtract,q.length),
          // sample:q.substring(ruleExtract,8),
          a3:leftOver,
          s:s,
          ruleExtract:ruleExtract,
          cut:s+ruleExtract,
          a4:leftOver.length,
          a5:this.strSeparate(q.substring(ruleExtract, q.length),ruleExtract)
        };
      }
    }

    return {
      sense:this.createString(rawSense),
      exam: examNotation
    };
  }
  requestObject(str,callback) {
    let strCount = str.length, e=[];
    // let testing = this.config.tone.reverse()
    // let strReverse = str.reverse(); index += to, ++index
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
  requestCreakyTone(num,from,to) {
    let str = this.strIntersect(num,from,to);
    return this.requestObject(str,(position,next,tone)=>{
      if (str.hasOwnProperty(next) && str[next] > 0){
        return this.config.creaky.hasOwnProperty(position)?this.config.creaky[position]:tone;
      }
      return tone;
    }).map((k,index)=>{
      return k.name+k.tone;
    }).join(' ')
  }
  requestWrittenTone(num,from,to) {
    let str = this.strIntersect(num,from,to);
    return this.requestObject(str,(position,next,tone)=>{
      return tone;
    }).map((k,index,e)=>{
      if ((e.length - 2) == index) {
        return k.name+k.tone+this.config.conjunction.and;
      }
      return k.name+k.tone;
    }).join(' ');
  }
  requestCreakyTail(num,from,to) {
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
    }).join(' ');
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
  createString(n) {
    return n.filter(function(e){return e}).join(this.config.conjunction.and+this.config.conjunction.space)
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