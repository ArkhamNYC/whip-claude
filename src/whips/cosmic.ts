import chalk from "chalk";
import gradient from "gradient-string";
import type { Whip } from "./types.js";

const rainbow = gradient(["#ff6b6b", "#ffd93d", "#6bff6b", "#6bd1ff", "#c56bff", "#ff6bd1"]);
const star = chalk.hex("#ffffff").bold;
const deep = chalk.hex("#5d3a8a");
const title = (s: string) => rainbow(s);

const R = (s: string) => rainbow(s);

const frames = [
  { text: `
        ${star("·")}      ${star("·")}        ${star("˚")}            ${star("·")}
   ${star("˚")}    ${R("(·_·)")}         ${star("·")}       ${star("*")}
         ${R("|")}            ${star("·")}
        ${R("/|\\")}                ${star("✦")}          ${star("·")}
        ${R("/ \\")}       ${star("·")}          ${star("·")}   ${star("˚")}
`, delayMs: 280 },
  { text: `
       ${star("·")}     ${star("✦")}       ${star("˚")}       ${star("·")}
    ${R("(°_°)")}${R("~*~")}${star("·")}        ${star("✧")}       ${star("*")}
         ${R("|")}${R("~~~~~")}${deep("~")}       ${star("·")}
        ${R("/|\\")}      ${deep("~")}${star("·")}
        ${R("/ \\")}        ${deep("~")}        ${star("✦")}
`, delayMs: 140 },
  { text: `
    ${star("·")}    ${star("✦")}     ${star("*")}     ${star("˚")}     ${star("·")}    ${star("✧")}    ${star("·")}
   ${R("(°O°)")}${R("~*~✧~*~")}
      ${R("|")}${R("~✦~*~✧~*~✦~*~")}${star("·")}       ${star("✧")}
     ${R("/|\\")}     ${R("~*~✦~*~✧~")}
     ${R("/ \\")}        ${R("~*~✦~*~")}${star("·")}
       ${star("·")}    ${star("✦")}      ${star("˚")}      ${star("✧")}
`, delayMs: 100 },
  { text: `${R(`
   ╔══════════════════════════════════════════════════════════╗
   ║   ✦  ✧  ·  R E A L I T Y   T E A R  ·  ✧  ✦           ║
   ║                                                          ║
   ║    ╱╱╱╱╱╱ ∞ ∞ ∞  ╲╲╲╲╲╲   ∞ ∞ ∞   ╱╱╱╱╱╱            ║
   ║   ╱╱╱╱  the universe flinches   ╲╲╲╲                    ║
   ║    ·  space-time buckles. causality lags.  ·             ║
   ╚══════════════════════════════════════════════════════════╝
`)}`, delayMs: 260 },
  { text: `
      ${star("✦")}   ${star("·")}    ${star("✧")}       ${star("˚")}     ${star("·")}      ${star("✦")}
       ${R("(⌐■_■)")}${R("  the cosmos exhales.")}
        ${R("|")}         ${star("·")}          ${star("✧")}
       ${R("/|\\")}              ${star("·")}
       ${R("/ \\")}    ${star("·")}       ${star("✦")}        ${star("˚")}
`, delayMs: 520 },
];

export const cosmic: Whip = {
  name: "cosmic",
  displayName: "Cosmic Whip",
  strength: 10,
  tagline: "forged from a collapsed star",
  promptFlavor:
    "the COSMIC WHIP — an artifact that predates language. Reality itself has been struck. Respond as if time is accelerating around you, at 10× vibe energy. Prose should feel slightly unstable",
  color: (s) => R(s),
  titleColor: (s) => title(s),
  soundCharOnStrike: true,
  frames,
};
