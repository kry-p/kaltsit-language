import fs from "fs";
import { Command } from "commander";
import { execute } from "./kaltsit";

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

const program = new Command();
program
  .name("kaltsit")
  .argument("<filename>")
  .action((file) => {
    if (process.argv[2]) read(file);
  });

program.parse();
