import chalk from "chalk";
import { Command } from "commander";
import { runCustomize } from "./commands/customize.js";
import { runDemo } from "./commands/demo.js";
import { runInstall } from "./commands/install.js";
import { runList } from "./commands/list.js";
import { runStrike } from "./commands/strike.js";
import { runTui } from "./commands/tui.js";
import { runUninstall } from "./commands/uninstall.js";
import { bigBanner } from "./render/banner.js";

const program = new Command();

program
  .name("whip-claude")
  .description("Crack a whip at Claude to make it work faster.")
  .version("0.2.0")
  .addHelpText("beforeAll", bigBanner("whip-claude") + "\n" + chalk.dim("  make claude work faster (affectionately)") + "\n")
  .showHelpAfterError();

program
  .command("install")
  .description("install the /whip slash command into Claude Code")
  .action(() => {
    runInstall();
  });

program
  .command("uninstall")
  .description("remove the /whip slash command")
  .action(() => {
    runUninstall();
  });

program
  .command("list")
  .aliases(["ls"])
  .description("list available whips with strength bars")
  .action(() => {
    runList();
  });

program
  .command("demo [whip]")
  .description("play a whip animation without touching Claude")
  .action(async (whip?: string) => {
    await runDemo(whip ? [whip] : []);
  });

program
  .command("customize")
  .aliases(["config"])
  .description("choose your default whip, epithet, speed, and sound")
  .action(async () => {
    await runCustomize();
  });

program
  .command("tui", { isDefault: true })
  .description("interactive whip picker with live animation preview")
  .action(async () => {
    await runTui();
  });

program
  .command("strike [whip]")
  .option("-w, --window", "pop a real Terminal window for the full animation (macOS)")
  .description("play animation + emit Claude prompt block (used by /whip)")
  .action(async (whip?: string, opts?: { window?: boolean }) => {
    const args: string[] = [];
    if (opts?.window) args.push("--window");
    if (whip) args.push(whip);
    await runStrike(args);
  });

program.parseAsync(process.argv).catch((err) => {
  console.error(chalk.red("whip-claude error:"), err instanceof Error ? err.message : err);
  process.exit(1);
});
