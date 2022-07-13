import { execute } from "./kaltsit";

const readFromModule = (code: string) => {
  try {
    const result = execute(code, { using: "module" });
    return result;
  } catch (e) {
    return e.message;
  }
};

export default readFromModule;
