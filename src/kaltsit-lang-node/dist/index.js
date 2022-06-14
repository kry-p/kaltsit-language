import fs from "fs";
import { Command } from "commander";
import { CONTROL_STATEMENTS, CALCULATE_STATEMENTS } from "./constants";

const calculator = {
  0: (o1, o2) => o1 + o2,
  1: (o1, o2) => o1 - o2,
  2: (o1, o2) => o1 * o2,
  3: (o1, o2) => {
    if (o2 == 0) throw new Error("0으로 나누기.. 대체 왜...");
    return o1 / o2;
  },
  4: (o1, o2) => {
    if (o2 == 0) throw new Error("0으로 나누기.. 대체 왜...");
    return o1 % o2;
  },
};

const read = (path) => {
  try {
    try {
      fs.accessSync(path);
    } catch (e) {
      throw new Error(`${path}... 그 파일에 대해선 아직 말해줄 수 없다.`);
    }
    execute(fs.readFileSync(path, "utf-8"));
  } catch (e) {
    process.stderr.write(`${e.message}\n`);
  }
};

const stringify = (unicode) => String.fromCharCode(unicode); // 해당 10진수에 해당하는 유니코드로 변환
const calculate = (type, o1, o2) => calculator[type](o1, o2); // 계산
const throwError = (errorString) => new Error(`${errorString}도 똑바로 못 하나?`); // 에러 메시지 반환

// 코드 파싱
const execute = (code) => {
  let consoleOutput = "";
  const statements = code
    .trim()
    .split("\n")
    .map((line) => line.trim());

  // 시작과 끝이 올바르지 않음
  if (statements[0] !== "그런건가..." || !statements.slice(-1)[0].startsWith("이 이야기는 그만하도록 하지"))
    throw new Error("그리 쉬운 것도 못 쓰나?");

  const variables = new Map();
  let pointer = 0;

  const parse = (statement) => {
    let controlExists = false; // 제어문 판단
    CONTROL_STATEMENTS.forEach((item) => (controlExists = controlExists || statement.includes(item)));

    // 제어문인 경우
    if (controlExists) {
      if (statement.includes("그렇다면")) {
        try {
          const splitted = statement.split(" ");
          const otherStringIncludes = splitted[0].replace("그렇다면", "").replace(/\./gi, "").length > 0;
          if (otherStringIncludes) throw throwError("조건문 쓰기");
          parse(statement.replace(`${splitted[0]} `, ""));
        } catch (e) {
          throw throwError("조건문 쓰기");
        }
      }
      if (statement.includes("그럴수는 없다")) {
        const dots = statement.replace("그럴수는 없다", "");
        const otherStringIncludes = dots.replace(/\./gi, "").length > 0;
        if (otherStringIncludes) throw throwError("goto");
        pointer = dots.length;
      }
      if (statement.includes("네가 원하는 답은 해 주지 않겠다")) {
        try {
          const splitted = statement.split("네가 원하는 답은 해 주지 않겠다");
          const otherStringIncludes = splitted[0].replace(/\./gi, "").length > 0;
          if (otherStringIncludes) throwError("결과 반환");
          return variables[splitted.length];
        } catch (e) {
          throw throwError("결과 반환");
        }
      }
    } else {
      let calcExists = false; // 연산 구문 판단
      let currentCalc = -1;
      CALCULATE_STATEMENTS.forEach((item) => {
        const includes = statement.includes(item);
        calcExists = calcExists || includes;
        if (includes) currentCalc = CALCULATE_STATEMENTS.indexOf(item);
        return !calcExists;
      });
      // 연산
      if (calcExists) {
        try {
          const operand = statement.split(CALCULATE_STATEMENTS[currentCalc])[0];
          const otherStringIncludes = operand.replace(/\./gi, "").replace(/\ /gi, "").length > 0;
          if (otherStringIncludes) throw throwError("계산");
          const operands = operand.split(" ");
          consoleOutput += calculate(currentCalc, variables.get(operands[0].length), variables.get(operands[1].length)).toString();
        } catch (e) {
          throw throwError("계산");
        }
      } else {
        // 변수 선언
        if (statement.includes("모르는건가")) {
          try {
            const splitted = statement.split("모르는건가");
            const otherStringIncludes = statement.replace("모르는건가", "").replace(/\./gi, "").length > 0;
            if (otherStringIncludes) throw throwError("변수 선언");
            variables.set(splitted[1].length, splitted[0].length);
          } catch (e) {
            throw throwError("변수 선언");
          }
        }
        // 출력
        if (statement.includes("그렇군")) {
          try {
            const splitted = statement.split("그렇군");
            const otherStringIncludes = statement.replace("그렇군", "").replace(/\./gi, "").replace(/\!/gi, "").length > 0;
            const result = splitted[0].length;
            const exclamationMarks = splitted[1].replace(/\./gi, "").length;
            if (otherStringIncludes || !variables.get(result)) throw throwError("변수 출력");
            if (exclamationMarks > 0) consoleOutput += stringify(variables.get(result));
            else consoleOutput += variables.get(result);
          } catch (e) {
            throw throwError("변수 출력");
          }
        }
        // 몰?루 시 개행 문자 출력
        if (statement.includes("몰?루는건가")) consoleOutput += "\n";
      }
    }
  };

  while (!statements[pointer].startsWith("이 이야기는 그만하도록 하지")) {
    const statement = statements[pointer++];
    if (statement.length > 0) {
      parse(statement);
      process.stdout.write(consoleOutput);
      consoleOutput = "";
    }
  }
};

const program = new Command();
program
  .name("kaltsit")
  .argument("<filename>")
  .action((file) => {
    if (process.argv[2]) read(file);
  });

program.parse();
