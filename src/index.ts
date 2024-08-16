import { Command } from "commander";
import { initCommand } from "./commands/init";
import { version } from "../package.json";
import { red } from "ansi-colors";

const program = new Command("configs-hell");

program
  .version(version)
  .description("CLI to set up project configurations easily")
  .showHelpAfterError(red("==> run with --help for additional information"))
  .addCommand(initCommand);

program.parse(process.argv);

process.stdin.on("data", (key) => {
  if (key.toString() === "\u0003") {
    process.stdout.write("\n" + red("Process terminated by user."));
    process.exit(1);
  }
});
