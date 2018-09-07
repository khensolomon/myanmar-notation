import Notation from './notation';
export const Note:any = {
	get:function(query: string){
		return new Notation(query).get();
	}
};
export default Note;
module.exports = Note;
module.exports.default = Note;