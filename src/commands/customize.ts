import { input, select, confirm } from "@inquirer/prompts";
import chalk from "chalk";
import { loadConfig, saveConfig } from "../config/store.js";
import { smallBanner } from "../render/banner.js";
import { box, strengthBar } from "../render/ui.js";
import { listWhips } from "../whips/registry.js";

export async function runCustomize(): Promise<void> {
  process.stdout.write(smallBanner("customize") + "\n");

  const current = loadConfig();

  const whips = listWhips();
  const defaultWhip = await select<string>({
    message: "Default whip",
    default: current.defaultWhip,
    pageSize: whips.length,
    choices: whips.map((w) => ({
      name: `${w.titleColor(w.displayName.padEnd(16))}  ${strengthBar(w.strength)}  ${chalk.dim(w.tagline)}`,
      value: w.name,
      short: w.displayName,
    })),
  });

  const epithet = await input({
    message: "How should Claude address you?",
    default: current.epithet,
    validate: (v) => v.trim().length > 0 || "cannot be empty",
  });

  const animationSpeedStr = await select<string>({
    message: "Animation speed",
    default: String(current.animationSpeed),
    choices: [
      { name: "0.5× — slow-mo", value: "0.5" },
      { name: "1× — standard", value: "1" },
      { name: "1.5× — snappy", value: "1.5" },
      { name: "2× — hyperspeed", value: "2" },
    ],
  });

  const soundEnabled = await confirm({
    message: "Play terminal bell on strike?",
    default: current.soundEnabled,
  });

  const next = {
    defaultWhip,
    epithet: epithet.trim(),
    animationSpeed: Number(animationSpeedStr),
    soundEnabled,
  };
  saveConfig(next);

  const summary = [
    `${chalk.dim("default whip   ")} ${next.defaultWhip}`,
    `${chalk.dim("epithet        ")} ${next.epithet}`,
    `${chalk.dim("animation speed")} ${next.animationSpeed}×`,
    `${chalk.dim("sound          ")} ${next.soundEnabled ? "on" : "off"}`,
  ];
  process.stdout.write(box("saved", summary) + "\n");
}
