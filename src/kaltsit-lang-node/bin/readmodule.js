"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kaltsit_1 = require("./kaltsit");
var readFromModule = function (code) {
    try {
        var result = (0, kaltsit_1.execute)(code, { using: "module" });
        return result;
    }
    catch (e) {
        return e.message;
    }
};
exports.default = readFromModule;
