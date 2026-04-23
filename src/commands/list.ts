import chalk from "chalk";
import { smallBanner } from "../render/banner.js";
import { box, whipRow } from "../render/ui.js";
import { listWhips } from "../whips/registry.js";
import { loadConfig } from "../config/store.js";

export function runList(): void {
  const cfg = loadConfig();
  process.stdout.write(smallBanner("whip catalog") + "\n");
  const rows = listWhips().map((w) => {
    const marker =
      w.name === cfg.defaultWhip ? chalk.green("★") : " ";
    return `${marker} ${whipRow(w).slice(2)}`;
  });
  process.stdout.write(
    box("available whips", rows) + "\n"
  );
  process.stdout.write(
    chalk.dim("  ★ marks your default whip. Change with ") +
      chalk.bold("whip-claude customize") +
      chalk.dim(".") +
      "\n"
  );
  process.stdout.write(
    chalk.dim("  Try ") +
      chalk.bold("whip-claude demo <name>") +
      chalk.dim(" to preview an animation.") +
      "\n"
  );
}
