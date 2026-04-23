import chalk from "chalk";
import type { Whip } from "./types.js";

const brown = chalk.hex("#8b5a2b");
const bronze = chalk.hex("#c08a4a");
const title = chalk.hex("#c08a4a").bold;

const frames = [
  { text: `
          ${brown("___")}
         ${brown("/   \\____")}
        ${brown("/         \\___")}
 ${bronze("(-_-)")} ${brown("/              \\__")}
  ${bronze("|~~~/")}                  ${brown("\\__")}
 ${bronze("/|")}                         ${brown("\\_")}
 ${bronze("/ \\")}                          \`~.
`, delayMs: 260 },
  { text: `
         ${brown("___")}
        ${brown("/  /")}
        ${brown("\\_/___")}
 ${bronze("(•‿•)")}${brown("_______\\____")}
  ${bronze("|")}                ${brown("\\__")}
 ${bronze("/|\\")}                  ${brown("\\___")}
 ${bronze("/ \\")}                      ${brown("\\______________.")}
`, delayMs: 180 },
  { text: `

 ${bronze("(•‿•)")}
  ${bronze("|")}${brown("________________________________________")}
 ${bronze("/|")}                                         ${brown("\\___")}
 ${bronze("/ \\")}                                            ${brown("\\_.-^-._.~")}
`, delayMs: 140 },
  { text: `

 ${chalk.red.bold("(•□•)!")}
  ${bronze("|")}
 ${bronze("/|\\")}${brown("________________________________________________")}
 ${bronze("/ \\")}                                                 ${chalk.red.bold("\\* crack *")}
`, delayMs: 100 },
  { text: `

 ${chalk.hex("#d8a765").bold("(⌐■_■)")}
  ${bronze("|")}
 ${bronze("/|\\")}${brown("______________________________________")}
 ${bronze("/ \\")}                                      ${brown("`~..__")}
`, delayMs: 220 },
  { text: `

 ${chalk.hex("#d8a765").bold("(⌐■_■)")}  ${chalk.dim("clean strike.")}
  ${bronze("|")}
 ${bronze("/|\\")}
 ${bronze("/ \\")}
`, delayMs: 500 },
];

export const leather: Whip = {
  name: "leather",
  displayName: "Leather Whip",
  strength: 2,
  tagline: "tanned, oiled, dependable",
  promptFlavor:
    "a CLASSIC LEATHER WHIP. A crisp, workman-like strike. Respond with focused, slightly elevated urgency",
  color: (s) => brown(s),
  titleColor: (s) => title(s),
  frames,
};
