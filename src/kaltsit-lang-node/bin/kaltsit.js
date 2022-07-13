"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
/**
 * Kaltsit-language interpreter for Node.js
 *
 * 2022 kry-p
 * https://github.com/kry-p/kaltsit-language
 */
var string_1 = require("./modules/string");
var core_1 = require("./modules/core");
var execute = function (code, options) {
    var variables = new Map();
    var statements = code
        .trim()
        .split("\n")
        .map(function (line) { return line.trim(); });
    var consoleOutput = "";
    var moduleOutput = "";
    var pointer = 0;
    (0, core_1.validate)(statements);
    var parse = function (statement) {
        var controlExists = (0, string_1.checkControlExists)(statement);
        if (controlExists) {
            if (statement.includes("그렇다면")) {
                var next = (0, core_1.condition)(statement, pointer, variables);
                if (next.isAccepted)
                    parse(next.next);
            }
            else if (statement.includes("그럴수는 없다"))
                pointer = (0, core_1.goto)(statement, pointer);
        }
        else {
            var _a = (0, string_1.checkCalc)(statement), calcExists = _a.calcExists, currentCalc = _a.currentCalc;
            if (calcExists) {
                // Calculation
                var next = (0, core_1.calculate)(statement, pointer, currentCalc, variables);
                if (next.isSubstitute)
                    variables.set(next.variableIndex, next.result);
                else
                    consoleOutput += next.result;
            }
            else {
                // Substitution
                if (statement.includes("모르는건가")) {
                    var next = (0, core_1.substitute)(statement, pointer);
                    variables.set(next.index, next.number);
                }
                // Printout
                if (statement.includes("그렇군")) {
                    var next = (0, core_1.printout)(statement, pointer, variables);
                    consoleOutput += next;
                }
                // Line break
                if (statement.includes("몰?루는건가"))
                    consoleOutput += "\n";
            }
        }
    };
    while (!statements[pointer].startsWith("이 이야기는 그만하도록 하지")) {
        var statement = statements[pointer++];
        if (statement.length > 0) {
            parse(statement);
            if (options.using === "console")
                process.stdout.write(consoleOutput);
            if (options.using === "module")
                moduleOutput += consoleOutput;
            consoleOutput = "";
        }
    }
    if (options.using === "module")
        return moduleOutput;
};
exports.execute = execute;
