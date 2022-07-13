#!/usr/bin/env node
import { Command } from "commander";
import readFile from "./readfile";

const program = new Command();
program
  .name("kaltsit")
  .argument("<filename>")
  .action((file: string) => {
    if (process.argv[2]) readFile(file);
  });

program.parse();
