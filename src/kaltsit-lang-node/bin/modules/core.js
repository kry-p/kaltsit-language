"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printout = exports.substitute = exports.calculate = exports.returns = exports.goto = exports.condition = exports.validate = void 0;
/**
 * Kaltsit-language programming language implementations for Node.js
 *
 * 2022 kry-p
 * https://github.com/kry-p/kaltsit-language
 */
var constants_1 = require("./constants");
var calc_1 = require("./calc");
var error_1 = require("./error");
var string_1 = require("./string");
/**
 * Source code validation
 *
 * @param {String[]} statements
 * @brief 소스 코드의 시작과 끝이 올바른 형태인지 확인합니다.
 */
var validate = function (statements) {
    if (statements[0] !== "그런건가...")
        throw (0, error_1.throwError)(1, "ENTRY_INVALID");
    if (!statements.slice(-1)[0].startsWith("이 이야기는 그만하도록 하지"))
        throw (0, error_1.throwError)(statements.length - 1, "EOF_INVALID");
};
exports.validate = validate;
/**
 * Conditional statement
 *
 * @param {String} statement
 * @param {Number} pointer
 * @returns Statement for interpreter
 * @brief 조건으로 입력받은 변수를 확인하여 0이면 조건문 뒤의 구문을 반환합니다.
 */
var condition = function (statement, pointer, variables) {
    var splitted = (0, string_1.splitCommand)(statement, " ");
    var otherStringIncludes = (0, string_1.checkOnlyDots)((0, string_1.removeTargetString)(splitted[0], "그렇다면"));
    var index = (0, string_1.calculateNumber)(splitted[0].split("그렇다면")[0]);
    var next = {
        isAccepted: variables.get(index) === 0,
        next: (0, string_1.removeTargetString)(statement, "".concat(splitted[0], " ")),
    };
    if (otherStringIncludes)
        throw (0, error_1.throwError)(pointer, "SYNTAX_ERROR_IF");
    return next;
};
exports.condition = condition;
/**
 * GOTO
 *
 * @param {String} statement
 * @param {Number} pointer
 * @returns Destination line of goto statement for source code
 * @brief 구문 이동할 라인 번호를 반환합니다.
 */
var goto = function (statement, pointer) {
    var dots = (0, string_1.removeTargetString)(statement, "그럴수는 없다");
    var otherStringIncludes = (0, string_1.checkOnlyDots)(dots);
    var next = dots.length;
    if (otherStringIncludes)
        throw (0, error_1.throwError)(pointer, "SYNTAX_ERROR_GOTO");
    return next;
};
exports.goto = goto;
/**
 * Console return
 *
 * @param {String} statement
 * @param {Number} pointer
 * @param {Map} variables
 * @returns Return value
 * @brief 콘솔 반환 값을 반환합니다.
 */
var returns = function (statement, pointer, variables) {
    var splitted = statement.split("네가 원하는 답은 해 주지 않겠다");
    var otherStringIncludes = (0, string_1.checkOnlyDots)(splitted[0]);
    var next = variables[splitted.length];
    if (otherStringIncludes)
        (0, error_1.throwError)(pointer, "SYNTAX_ERROR_RETURN");
    return next;
};
exports.returns = returns;
/**
 * Arithmetic operation
 *
 * @param {String} statement
 * @param {Number} pointer
 * @param {CALCULATION_CONSTANT} currentCalc
 * @param {Map} variables
 * @returns Result object of calculation
 * @brief 주어진 연산을 수행 후 변수 대입 여부, 주소, 결과를 반환합니다.
 */
var calculate = function (statement, pointer, currentCalc, variables) {
    var control = (0, string_1.splitCommand)(statement, constants_1.CALCULATE_STATEMENTS[currentCalc]);
    if (control.length != 2)
        throw (0, error_1.throwError)(pointer, "SYNTAX_ERROR_ARITHMETIC");
    var otherStringIncludes = control[0].replace(/\./gi, "").replace(/\ /gi, "").length > 0;
    var operands = control[0].split(" ").map(function (operand) { return variables.get((0, string_1.calculateNumber)(operand)); });
    var variableIndex = (0, string_1.calculateNumber)(control[1]);
    if (otherStringIncludes || operands.length < 1)
        throw (0, error_1.throwError)(pointer, "SYNTAX_ERROR_ARITHMETIC");
    var result = operands[0];
    if (operands.length > 1)
        for (var i = 1; i < operands.length; i++)
            result = (0, calc_1.default)(currentCalc, result, operands[i]);
    if (isNaN(result))
        throw (0, error_1.throwError)(pointer, "ARITHMETIC_NAN");
    var next = {
        isSubstitute: variableIndex > 0,
        variableIndex: variableIndex,
        result: result,
    };
    return next;
};
exports.calculate = calculate;
/**
 * Substitution
 *
 * @param {String} statement
 * @param {Number} pointer
 * @returns Result object of substitution
 * @brief 대입할 변수의 주소와 값을 반환합니다.
 */
var substitute = function (statement, pointer) {
    var splitted = statement.split("모르는건가");
    var otherStringIncludes = statement.replace("모르는건가", "").replace(/\./gi, "").replace(/\,/gi, "").length > 0;
    if (otherStringIncludes || splitted.length != 2)
        throw (0, error_1.throwError)(pointer, "SYNTAX_ERROR_VARIABLE");
    var number = (0, string_1.calculateNumber)(splitted[0]);
    var index = (0, string_1.calculateNumber)(splitted[1]);
    if (index < 1)
        throw (0, error_1.throwError)(pointer, "VARIABLE_NOT_NATURAL_INDEX");
    var next = {
        index: index,
        number: number,
    };
    return next;
};
exports.substitute = substitute;
/**
 * Printout
 *
 * @param {String} statement
 * @param {Number} pointer
 * @param {Map} variables
 * @returns Variable to printout
 * @brief 입력받은 주소에 해당하는 변수를 반환합니다. 조건을 만족하는 경우 변수의 주소에 해당하는 유니코드 문자를 반환합니다.
 */
var printout = function (statement, pointer, variables) {
    var splitted = statement.split("그렇군");
    var otherStringIncludes = statement.replace("그렇군", "").replace(/\./gi, "").replace(/\!/gi, "").length > 0;
    var result = splitted[0].length;
    var exclamationMarks = splitted[1].replace(/\./gi, "").length;
    if (otherStringIncludes || variables.get(result) === undefined)
        throw (0, error_1.throwError)(pointer, "SYNTAX_ERROR_VARIABLE");
    var next = exclamationMarks > 0 ? (0, string_1.stringify)(variables.get(result)) : variables.get(result);
    return next;
};
exports.printout = printout;
