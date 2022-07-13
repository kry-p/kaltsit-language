/**
 * Source code validation
 *
 * @param {String[]} statements
 * @brief 소스 코드의 시작과 끝이 올바른 형태인지 확인합니다.
 */
export declare const validate: (statements: string[]) => void;
/**
 * Conditional statement
 *
 * @param {String} statement
 * @param {Number} pointer
 * @returns Statement for interpreter
 * @brief 조건으로 입력받은 변수를 확인하여 0이면 조건문 뒤의 구문을 반환합니다.
 */
export declare const condition: (statement: string, pointer: number, variables: any) => {
    isAccepted: boolean;
    next: string;
};
/**
 * GOTO
 *
 * @param {String} statement
 * @param {Number} pointer
 * @returns Destination line of goto statement for source code
 * @brief 구문 이동할 라인 번호를 반환합니다.
 */
export declare const goto: (statement: string, pointer: number) => number;
/**
 * Console return
 *
 * @param {String} statement
 * @param {Number} pointer
 * @param {Map} variables
 * @returns Return value
 * @brief 콘솔 반환 값을 반환합니다.
 */
export declare const returns: (statement: string, pointer: number, variables: any) => any;
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
export declare const calculate: (statement: string, pointer: number, currentCalc: number, variables: any) => {
    isSubstitute: boolean;
    variableIndex: number;
    result: any;
};
/**
 * Substitution
 *
 * @param {String} statement
 * @param {Number} pointer
 * @returns Result object of substitution
 * @brief 대입할 변수의 주소와 값을 반환합니다.
 */
export declare const substitute: (statement: string, pointer: number) => {
    index: number;
    number: number;
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
export declare const printout: (statement: string, pointer: number, variables: any) => any;
