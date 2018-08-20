var notation = require('./notation');
// console.log(new notation('2344').result);
// console.log(notation);
module.exports = {
  convert:function (q) {
    return new notation(q).result;
  },
  test:function (q) {
    return 'yes->'+q;
  }
};
// var notation = module.exports = {}
// notation.convert = function (q) {
//   console.log("This is a message from the demo package");
// }
// exports.printMsg = function() {
//   console.log("This is a message from the demo package");
// }

