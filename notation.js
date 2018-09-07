"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var configuration_1 = require("./configuration");
var requestSense = function (q, taskMain, taskMin) {
    if (taskMin <= Math.min.apply(Math, taskMain))
        taskMain = [taskMin];
    return taskMain.map(function (k) { return taskMin >= k ? responseSense(q, k) : false; }).filter(function (e) { return e; });
}, responseSense = function (q, s) {
    if (q.length <= s)
        return { sense: requestWrittenTone(q) };
    var raw = strSeparate(q, s);
    var rawCount = raw.length;
    var rawEnd = raw.slice(-1)[0];
    var rawEndCount = rawEnd.length;
    var ruleExtract = rawEndCount;
    var rulePrime = rawCount;
    var ruleMax = Object.keys(configuration_1.configuration.tone).length;
    var examNotation = {};
    var rawSense = [];
    var rawSenseName = function () {
        rawSense.push(requestPrime(rulePrime, s, (rawCount < 3 && s != rawEndCount)) + requestCreakyTone(q, 0, ruleExtract));
        rawSenseEach(q.substring(ruleExtract, q.length));
        return createString(rawSense);
    }, rawSenseEach = function (k) {
        if (k && Number(k)) {
            var ks = (s * 2) - 2;
            var kr = k.substring(0, ks);
            var k1 = requestWrittenTone(kr, 0, s - 1);
            var k2 = requestCreakyTone(kr, s - 1, k1.length);
            if (k2) {
                var kp = requestPrime(1, s);
                rawSense.push(kp + k1 + ' ' + k2);
            }
            else {
                rawSense.push(k1);
            }
            rawSenseEach(k.substring(ks, k.length));
        }
    };
    if (rawCount < 3) {
        if (s == rawEndCount) {
            ruleExtract = rawCount;
            examNotation = { test: 1 };
        }
        else {
            rulePrime = 1;
            if (rawCount > rawEndCount) {
                ruleExtract = rawCount;
            }
            else {
                ruleExtract = rawEndCount + 1;
            }
            examNotation = { test: 2 };
        }
    }
    else {
        ruleExtract = rawCount - 1 + rawEndCount;
        rulePrime = 2;
        if (ruleExtract > ruleMax) {
            ruleExtract = rawEndCount - 3;
        }
        examNotation = { test: 3, raw: raw };
    }
    return { sense: rawSenseName() };
}, requestPrime = function (l, k, s) {
    if (s === void 0) { s = false; }
    var i = 0, e = [];
    while (i < l) {
        e.push(configuration_1.configuration.tone[k]);
        i++;
    }
    if (s)
        e.push('');
    return e.join(configuration_1.configuration.conjunction.plus + configuration_1.configuration.conjunction.space);
}, createString = function (a) {
    if (a.length > 1) {
        return a.slice(0, -1).join(configuration_1.configuration.conjunction.comma) + configuration_1.configuration.conjunction.and + configuration_1.configuration.conjunction.space + a.slice(-1);
    }
    else {
        return a.join(configuration_1.configuration.conjunction.space);
    }
}, strSeparate = function (str, n) {
    var e = new Array;
    for (var index = 0; index < str.length; index += n)
        e.push(str.substr(index, n));
    return e;
}, strIntersect = function (str, from, to) {
    if (from === void 0) { from = 0; }
    if (to === void 0) { to = 0; }
    if (to) {
        return str.substring(from, to).split('');
    }
    else {
        return str.split('');
    }
}, requestObject = function (str, callback) {
    var strCount = str.length, e = [];
    for (var index = 0; index < strCount; ++index) {
        var position = strCount - index;
        var digit = str[index], next = index + 1;
        var tone = configuration_1.configuration.tone.hasOwnProperty(position) ? configuration_1.configuration.tone[position] : '';
        if (digit > 0)
            e.push({
                name: configuration_1.configuration.name[digit],
                tone: callback(position, next, tone)
            });
    }
    return e;
}, requestCreakyTone = function (num, from, to, pair) {
    if (from === void 0) { from = 0; }
    if (to === void 0) { to = 0; }
    if (pair === void 0) { pair = ''; }
    var str = strIntersect(num, from, to);
    return requestObject(str, function (position, next, tone) {
        if (str.hasOwnProperty(next) && str[next] > 0) {
            return configuration_1.configuration.creaky.hasOwnProperty(position) ? configuration_1.configuration.creaky[position] : tone;
        }
        return tone;
    }).map(function (k, index) {
        return k.name + k.tone;
    }).join(pair);
}, requestWrittenTone = function (num, from, to, pair) {
    if (from === void 0) { from = 0; }
    if (to === void 0) { to = 0; }
    if (pair === void 0) { pair = ''; }
    var str = strIntersect(num, from, to);
    return requestObject(str, function (position, next, tone) {
        return tone;
    }).map(function (k, index, e) {
        if ((e.length - 2) == index) {
            return k.name + k.tone + configuration_1.configuration.conjunction.and;
        }
        return k.name + k.tone;
    }).join(pair);
}, requestCreakyTail = function (num, from, to, pair) {
    if (from === void 0) { from = 0; }
    if (to === void 0) { to = 0; }
    if (pair === void 0) { pair = ' '; }
    var str = strIntersect(num, from, to);
    return requestObject(str, function (position, next, tone) {
        if (str.hasOwnProperty(next) && configuration_1.configuration.creaky.hasOwnProperty(position) && str[next] > 0) {
            return { normal: tone, creaky: configuration_1.configuration.creaky[position] };
        }
        return { normal: tone };
    }).map(function (k, index, e) {
        if ((e.length - 2) == index) {
            return k.name + k.tone.hasOwnProperty('creaky') ? k.name + k.tone.creaky : k.name + k.tone.normal;
        }
        return k.name + k.tone.normal;
    }).join(pair);
};
var Notation = (function () {
    function Notation(q) {
        if (q === void 0) { q = ''; }
        this.assignment = [6, 7, 8];
        this.note = {};
        this.clean(q);
        if (this.query) {
            this.note.number = this.digit();
        }
        else {
            this.clean(q.split('').map(function (k) { return configuration_1.configuration.digit.indexOf(k); }).filter(function (e) { return e >= 0; }).join(''));
            if (this.query)
                this.note.number = this.format();
        }
    }
    Object.defineProperty(Notation.prototype, "result", {
        get: function () {
            return this.get();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Notation.prototype, "number", {
        get: function () {
            return this.note.hasOwnProperty('number') ? this.note.number : null;
        },
        enumerable: true,
        configurable: true
    });
    Notation.prototype.get = function () {
        if (this.query)
            this.note.notation = requestSense(this.query, this.assignment, this.query.length);
        return this.note;
    };
    Notation.prototype.digit = function () {
        return this.format().split('').map(function (k) { return configuration_1.configuration.digit.hasOwnProperty(k) ? configuration_1.configuration.digit[k] : k; }).join('');
    };
    Notation.prototype.format = function () {
        return this.query.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };
    Notation.prototype.clean = function (q) {
        if (q) {
            var k = Math.floor(Number(q.toString().replace(/,\s?/g, '')));
            if (k > 0)
                this.query = k.toString();
        }
    };
    return Notation;
}());
exports.Notation = Notation;
;
exports.default = Notation;
