/**
 * Kaltsit-language programming language implementations for Node.js
 *
 * 2022 kry-p
 * https://github.com/kry-p/kaltsit-language
 */
import { CALCULATE_STATEMENTS } from "./constants";
import calc from "./calc";
import { throwError } from "./error";
import { stringify, checkOnlyDots, splitCommand, calculateNumber, removeTargetString } from "./string";

/**
 * Source code validation
 *
 * @param {String[]} statements
 * @brief 소스 코드의 시작과 끝이 올바른 형태인지 확인합니다.
 */
export const validate = (statements) => {
  if (statements[0] !== "그런건가...") throw throwError(1, "ENTRY_INVALID");
  if (!statements.slice(-1)[0].startsWith("이 이야기는 그만하도록 하지")) throw throwError(statements.length - 1, "EOF_INVALID");
};

/**
 * Conditional statement
 *
 * @param {String} statement
 * @param {Number} pointer
 * @returns Statement for interpreter
 * @brief 조건으로 입력받은 변수를 확인하여 0이면 조건문 뒤의 구문을 반환합니다.
 */
export const condition = (statement, pointer, variables) => {
  const splitted = splitCommand(statement, " ");
  const otherStringIncludes = checkOnlyDots(removeTargetString(splitted[0], "그렇다면"));
  const index = calculateNumber(splitted[0].split("그렇다면")[0]);
  const next = {
    isAccepted: variables.get(index) === 0,
    next: removeTargetString(statement, `${splitted[0]} `),
  };
  if (otherStringIncludes) throw throwError(pointer, "SYNTAX_ERROR_IF");
  return next;
};

/**
 * GOTO
 *
 * @param {String} statement
 * @param {Number} pointer
 * @returns Destination line of goto statement for source code
 * @brief 구문 이동할 라인 번호를 반환합니다.
 */
export const goto = (statement, pointer) => {
  const dots = removeTargetString(statement, "그럴수는 없다");
  const otherStringIncludes = checkOnlyDots(dots);
  const next = dots.length;

  if (otherStringIncludes) throw throwError(pointer, "SYNTAX_ERROR_GOTO");
  return next;
};

/**
 * Console return
 *
 * @param {String} statement
 * @param {Number} pointer
 * @param {Map} variables
 * @returns Return value
 * @brief 콘솔 반환 값을 반환합니다.
 */
export const returns = (statement, pointer, variables) => {
  const splitted = statement.split("네가 원하는 답은 해 주지 않겠다");
  const otherStringIncludes = checkOnlyDots(splitted[0]);
  const next = variables[splitted.length];
  if (otherStringIncludes) throwError(pointer, "SYNTAX_ERROR_RETURN");

  return next;
};

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
export const calculate = (statement, pointer, currentCalc, variables) => {
  const control = splitCommand(statement, CALCULATE_STATEMENTS[currentCalc]);

  if (control.length != 2) throw throwError(pointer, "SYNTAX_ERROR_ARITHMETIC");

  const otherStringIncludes = control[0].replace(/\./gi, "").replace(/\ /gi, "").length > 0;
  const operands = control[0].split(" ").map((operand) => variables.get(calculateNumber(operand)));
  const variableIndex = calculateNumber(control[1]);

  if (otherStringIncludes || !operands.length < 0) throw throwError(pointer, "SYNTAX_ERROR_ARITHMETIC");

  let result = operands[0];

  if (operands.length > 1) for (let i = 1; i < operands.length; i++) result = calc(currentCalc, result, operands[i]);
  if (isNaN(result)) throw throwError(pointer, "ARITHMETIC_NAN");

  const next = {
    isSubstitute: variableIndex > 0,
    variableIndex,
    result,
  };
  return next;
};

/**
 * Substitution
 *
 * @param {String} statement
 * @param {Number} pointer
 * @returns Result object of substitution
 * @brief 대입할 변수의 주소와 값을 반환합니다.
 */
export const substitute = (statement, pointer) => {
  const splitted = statement.split("모르는건가");
  const otherStringIncludes = statement.replace("모르는건가", "").replace(/\./gi, "").replace(/\,/gi, "").length > 0;

  if (otherStringIncludes || splitted.length != 2) throw throwError(pointer, "SYNTAX_ERROR_VARIABLE");

  const number = calculateNumber(splitted[0]);
  const index = calculateNumber(splitted[1]);

  if (index < 1) throw throwError(pointer, "VARIABLE_NOT_NATURAL_INDEX");
  const next = {
    index,
    number,
  };
  return next;
};

/**
 * Printout
 *
 * @param {String} statement
 * @param {Number} pointer
 * @param {Map} variables
 * @returns Variable to printout
 * @brief 입력받은 주소에 해당하는 변수를 반환합니다. 조건을 만족하는 경우 변수의 주소에 해당하는 유니코드 문자를 반환합니다.
 */
export const printout = (statement, pointer, variables) => {
  const splitted = statement.split("그렇군");
  const otherStringIncludes = statement.replace("그렇군", "").replace(/\./gi, "").replace(/\!/gi, "").length > 0;
  const result = splitted[0].length;
  const exclamationMarks = splitted[1].replace(/\./gi, "").length;
  if (otherStringIncludes || variables.get(result) === undefined) throw throwError(pointer, "SYNTAX_ERROR_VARIABLE");

  const next = exclamationMarks > 0 ? stringify(variables.get(result)) : variables.get(result);
  return next;
};
