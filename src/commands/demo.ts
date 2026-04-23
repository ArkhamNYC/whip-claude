import chalk from "chalk";
import { loadConfig } from "../config/store.js";
import { smallBanner } from "../render/banner.js";
import { playFrames } from "../render/player.js";
import { strengthBar } from "../render/ui.js";
import { getWhip, hasWhip } from "../whips/registry.js";

export async function runDemo(args: string[]): Promise<void> {
  const cfg = loadConfig();
  const requested = args[0]?.trim();
  if (requested && !hasWhip(requested)) {
    console.error(chalk.red(`Unknown whip: ${requested}`));
    console.error(chalk.dim(`Run  whip-claude list  to see available whips.`));
    process.exitCode = 1;
    return;
  }
  const whip = getWhip(requested ?? cfg.defaultWhip);

  process.stdout.write(smallBanner(whip.displayName.toUpperCase()) + "\n");
  process.stdout.write(
    `  ${whip.titleColor("strength")}  ${strengthBar(whip.strength)}  ${chalk.dim(`(${whip.strength}/10)`)}\n`
  );
  process.stdout.write(`  ${chalk.dim(whip.tagline)}\n\n`);

  const target = {
    write: (c: string) => {
      process.stdout.write(c);
    },
    close: () => {},
    isTTY: Boolean(process.stdout.isTTY),
    source: "stdout" as const,
  };
  const strikeFrameIndex =
    whip.strikeFrameIndex ?? Math.min(whip.frames.length - 1, Math.floor(whip.frames.length / 2) + 1);

  await playFrames(whip.frames, {
    target,
    speed: cfg.animationSpeed,
    bellOnStrike: cfg.soundEnabled && Boolean(whip.soundCharOnStrike),
    strikeFrameIndex,
  });

  process.stdout.write("\n");
}
