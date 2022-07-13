#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var readfile_1 = require("./readfile");
var program = new commander_1.Command();
program
    .name("kaltsit")
    .argument("<filename>")
    .action(function (file) {
    if (process.argv[2])
        (0, readfile_1.default)(file);
});
program.parse();
