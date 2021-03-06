/**
 * Kaltsit-language interpreter for Node.js
 *
 * 2022 kry-p
 * https://github.com/kry-p/kaltsit-language
 */
import { checkCalc, checkControlExists } from "./modules/string";
import { condition, goto, validate, calculate, substitute, printout } from "./modules/core";

type OptionType = {
  using: string;
};

export const execute = (code: string, options: OptionType) => {
  const variables = new Map();
  const statements = code
    .trim()
    .split("\n")
    .map((line) => line.trim());
  let consoleOutput = "";
  let moduleOutput = "";
  let pointer = 0;

  validate(statements);

  const parse = (statement: string) => {
    const controlExists = checkControlExists(statement);
    if (controlExists) {
      if (statement.includes("그렇다면")) {
        const next = condition(statement, pointer, variables);
        if (next.isAccepted) parse(next.next);
      } else if (statement.includes("그럴수는 없다")) pointer = goto(statement, pointer);
    } else {
      const { calcExists, currentCalc } = checkCalc(statement);

      if (calcExists) {
        // Calculation
        const next = calculate(statement, pointer, currentCalc, variables);
        if (next.isSubstitute) variables.set(next.variableIndex, next.result);
        else consoleOutput += next.result;
      } else {
        // Substitution
        if (statement.includes("모르는건가")) {
          const next = substitute(statement, pointer);
          variables.set(next.index, next.number);
        }
        // Printout
        if (statement.includes("그렇군")) {
          const next = printout(statement, pointer, variables);
          consoleOutput += next;
        }
        // Line break
        if (statement.includes("몰?루는건가")) consoleOutput += "\n";
      }
    }
  };

  while (!statements[pointer].startsWith("이 이야기는 그만하도록 하지")) {
    const statement = statements[pointer++];
    if (statement.length > 0) {
      parse(statement);
      if (options.using === "console") process.stdout.write(consoleOutput);
      if (options.using === "module") moduleOutput += consoleOutput;
      consoleOutput = "";
    }
  }

  if (options.using === "module") return moduleOutput;
};
