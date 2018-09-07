import myanmarNotation from './notation';
export const Note:any = {
	get:function(query: string){
		return new myanmarNotation(query).get();
	}
};
export default Note;
module.exports = Note;
module.exports.default = Note;