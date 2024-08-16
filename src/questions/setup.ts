import { confirm, select } from "@inquirer/prompts";

const setupQuestions = async () => {
  const packageManagerQuestion = {
    message: "Choose a package manager:",
    choices: [
      {
        name: "npm",
        value: "npm",
      },
      {
        name: "yarn",
        value: "yarn",
      },
      {
        name: "pnpm",
        value: "pnpm",
      },
    ],
  };

  const typescriptQuestion = {
    message: "Do you want to use TypeScript?",
    default: true,
  };

  const huskyQuestion = {
    message: "Do you want to use Husky (commitlint will added automatically )?",
    default: true,
  };

  const gitignoreQuestion = {
    message: "Do you want to generate a .gitignore file?",
    default: true,
  };

  const eslintQuestion = {
    message: "Do you want to use ESLint (Prettier will added automatically)?",
    default: true,
  };

  const answers = {
    packageManager: await select(packageManagerQuestion),
    typescript: await confirm(typescriptQuestion),
    husky: await confirm(huskyQuestion),
    gitignore: await confirm(gitignoreQuestion),
    eslint: await confirm(eslintQuestion),
  };

  return answers;
};

export default setupQuestions;
