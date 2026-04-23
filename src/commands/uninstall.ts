import chalk from "chalk";
import { existsSync, rmSync } from "node:fs";
import { SLASH_COMMAND_FILE } from "../config/paths.js";
import { box } from "../render/ui.js";

export function runUninstall(): void {
  const lines: string[] = [];
  if (existsSync(SLASH_COMMAND_FILE)) {
    rmSync(SLASH_COMMAND_FILE);
    lines.push(`${chalk.green("✓")} removed  ${chalk.dim(SLASH_COMMAND_FILE)}`);
  } else {
    lines.push(`${chalk.yellow("·")} not installed  ${chalk.dim(SLASH_COMMAND_FILE)}`);
  }
  lines.push("");
  lines.push(chalk.dim("config + preferences were preserved."));
  process.stdout.write(box("uninstalled", lines) + "\n");
}
