import shell from "shelljs";
import { Command } from "commander";
import { cyan, green, yellow } from "ansi-colors";
import { copyTemplate } from "../utils/file";
import setupQuestions from "../questions/setup";

const initCommand = new Command("init").description("Setup project configurations").action(setupAction);

async function setupAction() {
  const answers = await setupQuestions();

  console.log(yellow("\nstarting install packages"));
  console.log(cyan("\tgit automatically initialized"));
  shell.exec("git init");
  console.log(yellow("=====================>"));
  copyTemplate("package.json", "package.json");
  copyTemplate(".editorconfig", ".editorconfig");
  // shell.exec(`corepack ${answers.packageManager} init -y`);

  console.log(green("prepare the package manager\n"));
  shell.exec(`corepack prepare ${answers.packageManager}@latest --activate `);
  // shell.exec(`corepack enable ${answers.packageManager} `);

  const installFlag = answers.packageManager == "yarn" ? "add" : "i";
  //

  if (answers.typescript) {
    console.log(yellow("=====================>"));

    console.log(green("installing typescript"));
    shell.exec(`corepack ${answers.packageManager} ${installFlag} -D typescript`);
    console.log(yellow("Create tsconfig.json"));
    copyTemplate("tsconfig.json", "tsconfig.json");
  }

  if (answers.eslint && answers.typescript) {
    console.log(yellow("=====================>"));

    console.log(green("installing eslint and ts parser for that"));
    shell.exec(`corepack ${answers.packageManager} ${installFlag} -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint`);
    console.log(yellow("Create .eslintignore And .eslintrc.js And .prettierrc"));
    copyTemplate(".eslintignore", ".eslintignore");
    copyTemplate(".eslintrc.js", ".eslintrc.js");
    copyTemplate(".prettierrc", ".prettierrc");
  }

  if (answers.husky) {
    console.log(yellow("=====================>"));
    console.log(green("installing husky"));
    shell.exec(`corepack ${answers.packageManager} ${installFlag} -D husky`);
    console.log(green("installing commitlint"));
    shell.exec(`corepack ${answers.packageManager} ${installFlag} -D @commitlint/cli @commitlint/config-conventional`);
    if (answers.typescript) {
      console.log(yellow("Create commitlint.config.ts"));
      copyTemplate("commitlint.config.ts", "commitlint.config.ts");
    } else {
      console.log(yellow("Create commitlint.config.js"));
      copyTemplate("commitlint.config.js", "commitlint.config.js");
    }
    shell.exec("npx husky init");
  }

  if (answers.gitignore) {
    console.log(yellow("=====================>"));
    console.log(green("Generate gitignore"));
    copyTemplate(".gitignore", ".gitignore");
  }

  console.log("All selected configurations are set up successfully.");
}

export { initCommand };
