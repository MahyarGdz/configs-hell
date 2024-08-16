import fs from "fs";
import path from "path";

import { cyan } from "ansi-colors";

const TEMPLATE_DIR = path.join(__dirname, "..", "template");
const MODE_0666 = parseInt("0666", 8);
// const MODE_0755 = parseInt("0755", 8);

function write(path: string, content: string, mode?: string | number) {
  fs.writeFileSync(path, content, { mode: mode || MODE_0666 });
  console.log(cyan("\t Created : " + path + "\n"));
}

/**
 * Copy file from template directory.
 */

function copyTemplate(fileName: string, to: string) {
  write(to, fs.readFileSync(path.join(TEMPLATE_DIR, fileName), "utf-8"));
}

export { write, copyTemplate };
