import chalk from "chalk";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureConfigExists } from "../config/store.js";
import {
  COMMANDS_DIR,
  SLASH_COMMAND_FILE,
  WHIP_CLAUDE_DIR,
  CONFIG_FILE,
} from "../config/paths.js";
import { smallBanner } from "../render/banner.js";
import { box } from "../render/ui.js";

function resolveInvoker(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  const localCli = resolve(here, "cli.js");

  // Never pin to an ephemeral path — npx cache, global npm cache, or pnpm store.
  // All of these can be GC'd or change hash between runs.
  const ephemeralMarkers = [
    "/.npm/_npx/",
    "/.npm/_cacache/",
    "/npm-cache/_npx/",
    "/.pnpm-store/",
    "/pnpm-cache/",
    "/npm/node_cache/",
  ];
  const isEphemeral = ephemeralMarkers.some((m) => localCli.includes(m));

  if (existsSync(localCli) && !isEphemeral) {
    return `node ${JSON.stringify(localCli)}`;
  }
  return "npx -y whip-claude";
}

function buildSlashCommand(invoker: string): string {
  return `---
description: Crack a whip at Claude to make it work faster
argument-hint: "[whip-name]"
---

!\`${invoker} strike $ARGUMENTS\`
`;
}

export function runInstall(): void {
  process.stdout.write(smallBanner("install") + "\n");

  mkdirSync(COMMANDS_DIR, { recursive: true });
  mkdirSync(WHIP_CLAUDE_DIR, { recursive: true });

  const invoker = resolveInvoker();
  writeFileSync(SLASH_COMMAND_FILE, buildSlashCommand(invoker), "utf8");

  ensureConfigExists();

  const invokerLabel = invoker.startsWith("node ") ? chalk.dim("(local build)") : chalk.dim("(npm package)");
  const lines = [
    `${chalk.green("✓")} slash command  ${chalk.dim(SLASH_COMMAND_FILE)}`,
    `${chalk.green("✓")} config          ${chalk.dim(CONFIG_FILE)}`,
    `${chalk.green("✓")} invoker         ${chalk.dim(invoker)} ${invokerLabel}`,
    "",
    `${chalk.bold("Next:")} open a Claude Code session and type  ${chalk.bold("/whip")}`,
    `       or  ${chalk.bold("/whip cosmic")}  for the strongest option.`,
    "",
    `${chalk.dim("Customize your default with")}  ${chalk.bold("whip-claude customize")}`,
  ];
  process.stdout.write(box("installed", lines) + "\n");
}
