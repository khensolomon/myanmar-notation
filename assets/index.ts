import Notation from './notation';

// const get = (query: any) =>{
// 	let note:any = new Notation;
// 	return note.get(query);
// }
export const Note:any = {
	get:function(query: string){
		// const note = new Notation(query);
		// // const { result,number } = note;
		// // return result;
		// return note.get();
		return new Notation(query).get();
	},
	// name:function () {
  //   return new Notation().config.name;
  // },
  // digit:function () {
  //   return new Notation().config.digit;
  // },
  // tone:function () {
  //   return new Notation().config.tone;
  // },
  // creaky:function () {
  //   return new Notation().config.creaky;
  // },
  // conjunction:function () {
  //   return new myanmarNotation().config.conjunction;
  // }
};
// export const notation:any = Notation;
export default Note;
module.exports = Note;
module.exports.default = Note;