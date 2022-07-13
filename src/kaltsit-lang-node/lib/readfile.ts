import * as fs from "fs";
import { execute } from "./kaltsit";

const readFile = (path: string) => {
  try {
    try {
      fs.accessSync(path);
    } catch (e) {
      throw new Error(`${path}... 그 파일에 대해선 아직 말해줄 수 없다.`);
    }
    execute(fs.readFileSync(path, "utf-8"), { using: "console" });
  } catch (e) {
    process.stderr.write(`${e.message}\n`);
  }
};

export default readFile;
