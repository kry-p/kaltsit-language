"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateNumber = exports.checkCalc = exports.checkControlExists = exports.checkOnlyDots = exports.splitCommand = exports.removeAllDots = exports.removeTargetString = exports.stringify = void 0;
/**
 * String manipulation module for kaltsit-language programming language implementations
 *
 * 2022 kry-p
 * https://github.com/kry-p/kaltsit-language
 */
var constants_1 = require("./constants");
var stringify = function (unicode) { return String.fromCharCode(unicode); };
exports.stringify = stringify;
var removeTargetString = function (statement, target) { return statement.replace(target, ""); };
exports.removeTargetString = removeTargetString;
var removeAllDots = function (statement) { return statement.replace(/\./, ""); };
exports.removeAllDots = removeAllDots;
var splitCommand = function (statement, splitter) { return statement.split(splitter); };
exports.splitCommand = splitCommand;
var checkOnlyDots = function (statement) { return statement.replace(/\./gi, "").length > 0; };
exports.checkOnlyDots = checkOnlyDots;
var checkControlExists = function (statement) {
    var controlExists = false;
    constants_1.CONTROL_STATEMENTS.forEach(function (item) { return (controlExists = controlExists || statement.includes(item)); });
    return controlExists;
};
exports.checkControlExists = checkControlExists;
var checkCalc = function (statement) {
    var calcExists = false;
    var currentCalc = -1;
    constants_1.CALCULATE_STATEMENTS.forEach(function (item) {
        var includes = statement.includes(item);
        calcExists = calcExists || includes;
        if (includes)
            currentCalc = constants_1.CALCULATE_STATEMENTS.indexOf(item);
    });
    return { calcExists: calcExists, currentCalc: currentCalc };
};
exports.checkCalc = checkCalc;
var calculateNumber = function (numberString) {
    if (numberString.length == 0)
        return 0;
    var dots = numberString.split(".").length - 1;
    var commas = numberString.split(",").length - 1;
    return dots - commas;
};
exports.calculateNumber = calculateNumber;
