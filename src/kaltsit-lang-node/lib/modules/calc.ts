/**
 * Calculation module for kaltsit-language programming language implementations
 *
 * 2022 kry-p
 * https://github.com/kry-p/kaltsit-language
 */
type CalcType = {
  [key: number]: Function;
};

const calculator: CalcType = {
  0: (o1: number, o2: number) => o1 + o2,
  1: (o1: number, o2: number) => o1 - o2,
  2: (o1: number, o2: number) => o1 * o2,
  3: (o1: number, o2: number) => {
    if (o2 == 0) throw new Error("0으로 나누기.. 대체 왜...");
    return Math.floor(o1 / o2);
  },
  4: (o1: number, o2: number) => {
    if (o2 == 0) throw new Error("0으로 나누기.. 대체 왜...");
    return o1 % o2;
  },
};

const calc = (type: number, o1: number, o2: number) => calculator[type](o1, o2);

export default calc;
