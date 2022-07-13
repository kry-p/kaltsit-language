"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calculator = {
    0: function (o1, o2) { return o1 + o2; },
    1: function (o1, o2) { return o1 - o2; },
    2: function (o1, o2) { return o1 * o2; },
    3: function (o1, o2) {
        if (o2 == 0)
            throw new Error("0으로 나누기.. 대체 왜...");
        return Math.floor(o1 / o2);
    },
    4: function (o1, o2) {
        if (o2 == 0)
            throw new Error("0으로 나누기.. 대체 왜...");
        return o1 % o2;
    },
};
var calc = function (type, o1, o2) { return calculator[type](o1, o2); };
exports.default = calc;
