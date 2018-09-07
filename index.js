"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var notation_1 = require("./notation");
exports.Note = {
    get: function (query) {
        return new notation_1.Notation(query).get();
    },
};
exports.default = exports.Note;
module.exports = exports.Note;
module.exports.default = exports.Note;
