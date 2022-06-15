/**
 * Error handler for kaltsit-language programming language implementations
 *
 * 2022 kry-p
 * https://github.com/kry-p/kaltsit-language
 */
const ERROR_CODE = {
  UNKNOWN_ERROR: "알 수 없는 오류입니다.",
  ENTRY_INVALID: "소스 코드의 시작점을 정의할 수 없습니다.",
  EOF_INVALID: "소스 코드의 끝이 올바르지 않습니다.",
  SYNTAX_ERROR_ARITHMETIC: "연산 구문 오류입니다.",
  SYNTAX_ERROR_GOTO: "분기 이동 구문 오류입니다.",
  SYNTAX_ERROR_IF: "조건문 구문 오류입니다.",
  SYNTAX_ERROR_RETURN: "반환 구문 오류입니다.",
  SYNTAX_ERROR_VARIABLE: "변수 구문 오류입니다.",
  VARIABLE_NOT_NATURAL_INDEX: "변수의 인덱스는 자연수만 허용됩니다.",
  ARITHMETIC_NAN: "연산 결과가 숫자가 아닙니다.",
};
const ERROR_STRINGS = [
  "...이 이야기는 그만하도록 하지.",
  "나중에 알려주겠다.",
  "지금은 때가 아니다.",
  "그리 쉬운 것도 못 하나?",
  "몰?루는건가...",
  "그래, 그 동안 그런 일이 있었지...",
  "그것도 모르나?",
  "네가 원하는 답은 해 주지 않겠다.",
  "네가 알 필요는 없다.",
];

export const throwError = (pointer, errorCode) => {
  const currentError = ERROR_CODE[errorCode] ? ERROR_CODE[errorCode] : ERROR_CODE.UNKNOWN_ERROR;
  return new Error(
    `Error occured on line ${pointer}: ${ERROR_STRINGS[Math.round(Math.random() * ERROR_STRINGS.length)]}\n\nPRTS: ${currentError}`
  );
};
