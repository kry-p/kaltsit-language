/**
 * String manipulation module for kaltsit-language programming language implementations
 *
 * 2022 kry-p
 * https://github.com/kry-p/kaltsit-language
 */
import { CONTROL_STATEMENTS, CALCULATE_STATEMENTS } from "./constants";

export const stringify = (unicode: number) => String.fromCharCode(unicode);
export const removeTargetString = (statement: string, target: string) => statement.replace(target, "");
export const removeAllDots = (statement: string) => statement.replace(/\./, "");
export const splitCommand = (statement: string, splitter: string) => statement.split(splitter);
export const checkOnlyDots = (statement: string) => statement.replace(/\./gi, "").length > 0;
export const checkControlExists = (statement: string) => {
  let controlExists = false;
  CONTROL_STATEMENTS.forEach((item) => (controlExists = controlExists || statement.includes(item)));
  return controlExists;
};
export const checkCalc = (statement: string) => {
  let calcExists = false;
  let currentCalc = -1;
  CALCULATE_STATEMENTS.forEach((item) => {
    const includes = statement.includes(item);
    calcExists = calcExists || includes;
    if (includes) currentCalc = CALCULATE_STATEMENTS.indexOf(item);
  });
  return { calcExists, currentCalc };
};
export const calculateNumber = (numberString: string) => {
  if (numberString.length == 0) return 0;

  let dots = numberString.split(".").length - 1;
  let commas = numberString.split(",").length - 1;
  return dots - commas;
};
