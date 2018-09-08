const configuration:any = {
  name:["သုည","တစ်","နှစ်","သုံး","လေး","ငါး","ခြောက်","ခုနစ်","ရှစ်","ကိုး"],
  digit:["၀","၁","၂","၃","၄","၅","၆","၇","၈","၉"],
  tone:{1:""/*"ခု"*/, 2:"ဆယ်", 3:"ရာ", 4:"ထောင်", 5:"သောင်း", 6:"သိန်း", 7:"သန်း", 8:"ကု​ဋေ​"},
  creaky:{2:"ဆယ့်",3:"ရာ့",4:"ထောင့်"},
  conjunction:{space:" ",comma:"၊ ",and:"နှင့်",plus:"ပေါင်း",over:"ကျော်",times:"ကြိမ်",dot:"ဒဿမ"}
};
export const name:string[] = configuration.name;
export const digit:string[] = configuration.digit;
export const tone:any = configuration.tone;
export const creaky:any = configuration.creaky;
export const conjunction:any = configuration.conjunction;