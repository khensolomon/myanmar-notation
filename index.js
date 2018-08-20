let notation = require('./notation');
module.exports = {
  get:function (q) {
    return new notation().get(q);
  },
  name:function () {
    return new notation().configName();
  },
  digit:function () {
    return new notation().configDigit();
  },
  tone:function () {
    return new notation().configTone();
  },
  creaky:function () {
    return new notation().configCreaky();
  },
  conjunction:function () {
    return new notation().configConjunction();
  }
};