"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var kaltsit_1 = require("./kaltsit");
var readFile = function (path) {
    try {
        try {
            fs.accessSync(path);
        }
        catch (e) {
            throw new Error("".concat(path, "... \uADF8 \uD30C\uC77C\uC5D0 \uB300\uD574\uC120 \uC544\uC9C1 \uB9D0\uD574\uC904 \uC218 \uC5C6\uB2E4."));
        }
        (0, kaltsit_1.execute)(fs.readFileSync(path, "utf-8"), { using: "console" });
    }
    catch (e) {
        process.stderr.write("".concat(e.message, "\n"));
    }
};
exports.default = readFile;
