"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var notation_1 = __importDefault(require("./notation"));
exports.Note = {
    get: function (query) {
        return new notation_1.default(query).get();
    },
};
exports.default = exports.Note;
module.exports = exports.Note;
module.exports.default = exports.Note;
