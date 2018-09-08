import * as myanmar from './notation';
export const myanmarNotation:any = {
	get:(query:string='')=>new myanmar.Notation(query).get()
};
export default myanmarNotation;
module.exports = myanmarNotation;
module.exports.default = myanmarNotation;