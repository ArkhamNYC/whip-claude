import chalk from "chalk";
import type { Whip } from "./types.js";

const bolt = chalk.hex("#fff45c").bold;
const cyan = chalk.hex("#5ce1ff").bold;
const deep = chalk.hex("#2a4f8a");
const title = chalk.hex("#fff45c").bold;

const frames = [
  { text: `
      ${cyan("(·_·)")}${bolt("~")}
       ${cyan("|")}
      ${cyan("/|\\")}      ${bolt("·")}
      ${cyan("/ \\")}    ${bolt("·")}   ${bolt("·")}
              ${bolt("·")}
`, delayMs: 240 },
  { text: `
      ${cyan("(°_°)")}${bolt("~⚡")}
       ${cyan("|")}${bolt("~~~")}${deep("_")}
      ${cyan("/|\\")}      ${bolt("\\")}${deep("_")}
      ${cyan("/ \\")}        ${bolt("\\")}${deep("__")}
                   ${bolt("·")}
`, delayMs: 120 },
  { text: `
      ${cyan("(°□°)")}${bolt("⚡⚡")}
       ${cyan("|")}${bolt("⚡\\")}${deep("_____")}${bolt("⚡")}
      ${cyan("/|\\")}       ${bolt("\\")}${deep("___")}${bolt("⚡")}${deep("_")}${bolt("⚡")}
      ${cyan("/ \\")}          ${bolt("\\")}${deep("_")}${bolt("⚡")}${deep("___")}
                   ${bolt("·  ·   ·")}
`, delayMs: 80 },
  { text: `${bolt(`
      (⚡□⚡)  ⚡⚡⚡ ZZAAPP ⚡⚡⚡
       |⚡\\⚡___⚡___⚡___⚡___⚡___⚡>>>>
      /|\\   \\⚡___⚡___⚡___⚡___⚡>>>>
      / \\     \\___⚡___⚡___⚡>>>>
              ozone burns the air
`)}`, delayMs: 140 },
  { text: `
      ${cyan("(⌐■_■)")}    ${bolt("·")}  ${bolt("·")}
       ${cyan("|")}      ${bolt("·")}
      ${cyan("/|\\")}       ${chalk.dim("(static)")}
      ${cyan("/ \\")}
`, delayMs: 400 },
];

export const lightning: Whip = {
  name: "lightning",
  displayName: "Lightning Whip",
  strength: 6,
  tagline: "forged in storm, hums before it strikes",
  promptFlavor:
    "an ELECTRIC LIGHTNING WHIP crackling with 6× voltage. Respond with crackling urgency — short sentences, high energy",
  color: (s) => bolt(s),
  titleColor: (s) => title(s),
  soundCharOnStrike: true,
  frames,
};
