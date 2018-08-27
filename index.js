let myanmarNotation = require('./notation');
module.exports = {
  get:function (q) {
    return new myanmarNotation().get(q);
  },
  name:function () {
    return new myanmarNotation().config.name;
  },
  digit:function () {
    return new myanmarNotation().config.digit;
  },
  tone:function () {
    return new myanmarNotation().config.tone;
  },
  creaky:function () {
    return new myanmarNotation().config.creaky;
  },
  conjunction:function () {
    return new myanmarNotation().config.conjunction;
  }
};