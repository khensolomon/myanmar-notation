import {configuration} from './configuration';
const requestSense = (q:string,taskMain:number[],taskMin:number) => {
  if (taskMin <= Math.min.apply(Math, taskMain)) taskMain=[taskMin];
  return taskMain.map(k=>taskMin>=k?responseSense(q,k):false).filter(e => e);
},
responseSense = (q:string,s:number) => {
  if (q.length <= s) return {sense: requestWrittenTone(q)};
  let raw:any[number] = strSeparate(q,s);
  let rawCount:number = raw.length;
  let rawEnd:string = raw.slice(-1)[0];
  let rawEndCount:number = rawEnd.length;

  let ruleExtract:number = rawEndCount;
  let rulePrime:number = rawCount;
  let ruleMax:number = Object.keys(configuration.tone).length;

  // let Measure=configuration.tone[s];
  // let ConjunctionPlus=configuration.conjunction.plus;
  // let PrefixeTimes='';
  // let SuffixeMeasure='';

  let examNotation:any={};
  let rawSense:any=[];
  const rawSenseName = ()=>{
    rawSense.push(requestPrime(rulePrime,s,(rawCount < 3 && s != rawEndCount))+requestCreakyTone(q,0,ruleExtract));
    rawSenseEach(q.substring(ruleExtract, q.length));
    return createString(rawSense);
  }, rawSenseEach = (k:any)=>{
    if (k && Number(k)){
      let ks = (s*2)-2;
      let kr = k.substring(0,ks);
      let k1 = requestWrittenTone(kr,0,s-1);
      let k2 = requestCreakyTone(kr,s-1,k1.length);
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
  return {sense:rawSenseName()/*, exam: examNotation*/};
},
requestPrime = (l:number,k:number,s:boolean=false) => {
  let i=0, e=[];
  while( i < l) { e.push(configuration.tone[k]); i++;}
  if (s)e.push('');
  return e.join(configuration.conjunction.plus+configuration.conjunction.space);
},
createString = (a:any[]) => {
  if (a.length > 1){
    return a.slice(0, -1).join(configuration.conjunction.comma)+configuration.conjunction.and+configuration.conjunction.space+a.slice(-1);
  } else {
    return a.join(configuration.conjunction.space);
  }
},
strSeparate = (str:string, n:number) => {
  let e:any[] = new Array;
  for (let index=0; index < str.length; index += n) e.push(str.substr(index,n));
  return e;
},
strIntersect = (str:string,from:number=0,to:number=0) => {
  if (to){
    return str.substring(from, to).split('');
  } else{
    return str.split('');
  }
},
requestObject = (str:string,callback:any) => {
  let strCount:number = str.length, e:any[]=[];
  for (let index = 0; index < strCount;++index){
    let position:number = strCount - index;
    let digit:any = str[index], next:number = index+1;
    let tone:string = configuration.tone.hasOwnProperty(position)?configuration.tone[position]:'';
    if (digit > 0)e.push({
      name:configuration.name[digit],
      tone:callback(position,next,tone)
    });
  }
  return e;
},
requestCreakyTone = (num:string,from:number=0,to:number=0,pair:string='') => {
  let str:any = strIntersect(num,from,to);
  return requestObject(str,(position:number,next:number,tone:string)=>{
    if (str.hasOwnProperty(next) && str[next] > 0){
      return configuration.creaky.hasOwnProperty(position)?configuration.creaky[position]:tone;
    }
    return tone;
  }).map((k,index)=>{
    return k.name+k.tone;
  }).join(pair);
},
requestWrittenTone = (num:string,from:number=0,to:number=0,pair:string='') => {
  let str:any = strIntersect(num,from,to);
  return requestObject(str,(position:number,next:number,tone:string)=>{
    return tone;
  }).map((k,index,e)=>{
    // k:any,index:number,e:any
    if ((e.length - 2) == index) {
      return k.name+k.tone+configuration.conjunction.and;
    }
    return k.name+k.tone;
  }).join(pair);
},
requestCreakyTail = (num:string,from:number=0,to:number=0,pair:string=' ') => {
  let str:any = strIntersect(num,from,to);
  return requestObject(str,(position:number,next:number,tone:string)=>{
    if (str.hasOwnProperty(next) && configuration.creaky.hasOwnProperty(position) && str[next] > 0){
      return {normal:tone, creaky:configuration.creaky[position]};
    }
    return {normal:tone};
  }).map((k,index,e)=>{
    if ((e.length - 2) == index) {
      return k.name+k.tone.hasOwnProperty('creaky')?k.name+k.tone.creaky:k.name+k.tone.normal;
    }
    return k.name+k.tone.normal;
  }).join(pair);
};
export class Notation {
  private assignment:number[] = [6,7,8];
  private query:string='';
  private note:any={};
  constructor(q: string) {
    if (this.clean(q)) {
      this.note.number = this.digit();
    } else {
      if (this.clean(q.split('').map(k => configuration.digit.indexOf(k)).filter(e => e >= 0).join('')))this.note.number = this.format();
    }
  }
  get result(): any {
    return this.get();
  }
  get number(): string {
    return this.note.hasOwnProperty('number')?this.note.number:null;
  }
  get():any {
    if (this.query) this.note.notation = requestSense(this.query,this.assignment,this.query.length);
    return this.note;
  }
  digit() {
    return this.format().split('').map((k:string)=>configuration.digit.hasOwnProperty(k)?configuration.digit[k]:k).join('');
  }
  format() {
    return this.query.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  clean(q:string) {
    let k:number = Math.floor(Number(q.toString().replace(/,\s?/g, '')));
    if (k>0) return this.query = k.toString();
  }
};
export default Notation;