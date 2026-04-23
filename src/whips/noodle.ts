import chalk from "chalk";
import type { Whip } from "./types.js";

const pink = chalk.hex("#ff9ec4");
const soft = chalk.hex("#ffc1d9");
const title = chalk.hex("#ff6fa8").bold;

const frames = [
  { text: `
      ${soft("(·_·)")}
       ${pink("|")}
      ${pink("/|\\")}${pink("____________________________________________")}
      ${pink("/ \\")}                                              ~.
                                                         \`.
                                                           .
`, delayMs: 300 },
  { text: `
      ${soft("(·.·)?")}
       ${pink("|____")}
      ${pink("/|")}    \\_____________________________________
      ${pink("/ \\")}                                          ~~..._..

`, delayMs: 220 },
  { text: `
      ${soft("(·o·)")}
       ${pink("|")}
      ${pink("/|\\")}  ${pink("~.")}
      ${pink("/ \\")}    ${pink("`~..~~..___..~~..___..~~..~..___.._~")}
                                                 ${pink("`'·._")}

`, delayMs: 220 },
  { text: `
      ${soft("(T_T);")}
       ${pink("|")}
      ${pink("/|\\_")}
      ${pink("/ \\")} ${pink("\\_~_.._..___..-..-..__..-..-,._,..-.~.,")}
                                                ${pink("floop")}

`, delayMs: 320 },
  { text: `
      ${soft("(-_-);")}
       ${pink("|")}
      ${pink("/|\\___")}
      ${pink("/ \\")}   ${pink("'-.______________________,,,,..~~~...~..~..")}
                                                       ${soft(":'(")}

`, delayMs: 320 },
  { text: `
      ${soft("(·_·)")}  ${chalk.dim("...did that count?")}
       ${pink("|")}
      ${pink("/|\\________________________________________")}
      ${pink("/ \\")}                                          ${pink("'·.._")}

`, delayMs: 500 },
];

export const noodle: Whip = {
  name: "noodle",
  displayName: "Noodle Whip",
  strength: 1,
  tagline: "soggier than yesterday's ramen",
  promptFlavor:
    "a LIMP NOODLE WHIP. It is barely a threat. Respond with tragicomic effort — a wheezy, mildly motivated bump in pace",
  color: (s) => pink(s),
  titleColor: (s) => title(s),
  frames,
};
