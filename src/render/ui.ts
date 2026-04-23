import chalk from "chalk";
import type { Whip } from "../whips/types.js";

const BOX = {
  tl: "╭",
  tr: "╮",
  bl: "╰",
  br: "╯",
  h: "─",
  v: "│",
};

export function box(title: string, lines: string[], width?: number): string {
  const visibleLen = (s: string) => s.replace(/\x1b\[[0-9;]*m/g, "").length;
  const maxContent = lines.reduce((m, l) => Math.max(m, visibleLen(l)), visibleLen(title));
  const w = Math.max(width ?? 0, maxContent + 4);
  const pad = (s: string) => {
    const extra = w - 4 - visibleLen(s);
    return " " + s + " ".repeat(Math.max(0, extra)) + " ";
  };
  const top = chalk.dim(BOX.tl + BOX.h + " ") + chalk.bold(title) + " " + chalk.dim(BOX.h.repeat(Math.max(0, w - 4 - visibleLen(title))) + BOX.tr);
  const bot = chalk.dim(BOX.bl + BOX.h.repeat(w - 2) + BOX.br);
  const mid = lines.map((l) => chalk.dim(BOX.v) + pad(l) + chalk.dim(BOX.v));
  return [top, ...mid, bot].join("\n");
}

export function strengthBar(strength: number, max = 10): string {
  const filled = Math.max(0, Math.min(max, strength));
  const blocks = [
    chalk.hex("#ff9ec4")("▰"),
    chalk.hex("#c08a4a")("▰"),
    chalk.hex("#d97a3a")("▰"),
    chalk.hex("#a9a9a9")("▰"),
    chalk.hex("#fff45c")("▰"),
    chalk.hex("#fff45c")("▰"),
    chalk.hex("#ff7a00")("▰"),
    chalk.hex("#ff7a00")("▰"),
    chalk.hex("#c56bff")("▰"),
    chalk.hex("#ff6bd1")("▰"),
  ];
  const empty = chalk.dim("▱");
  let out = "";
  for (let i = 0; i < max; i++) out += i < filled ? blocks[i]! : empty;
  return out;
}

export function whipRow(w: Whip): string {
  const bar = strengthBar(w.strength);
  const name = w.titleColor(w.displayName.padEnd(16));
  const strength = chalk.dim(`(${w.strength}/10)`);
  const tag = chalk.dim(w.tagline);
  return `  ${name} ${bar} ${strength}  ${tag}`;
}
