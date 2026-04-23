import chalk from "chalk";
import type { Whip } from "./types.js";

const steel = chalk.hex("#a9a9a9");
const dark = chalk.hex("#6b6b6b");
const spark = chalk.hex("#ffd84d").bold;
const title = chalk.hex("#c0c0c0").bold;

const frames = [
  { text: `
      ${steel("(-_-)")}
       ${steel("|")}${dark("==========")}${steel("o")}
      ${steel("/|\\")}           ${dark("\\")}${steel("o")}
      ${steel("/ \\")}           ${dark("/")}${steel("o")}
                   ${dark("\\")}${steel("o")}
`, delayMs: 240 },
  { text: `
      ${steel("(-_-)")}           ${steel("o")}${dark("==")}
       ${steel("|")}${dark("=========")}       ${steel("o")}${dark("==")}
      ${steel("/|\\")}               ${steel("o")}${dark("==")}
      ${steel("/ \\")}               ${steel("o")}${dark("==")}
`, delayMs: 160 },
  { text: `
      ${steel("(•_•)")}                  ${spark("*")}${steel("o")}${dark("==")}${spark("*")}
       ${steel("|")}${dark("============")}     ${spark("*")}${steel("o")}${dark("==")}${spark("*")}
      ${steel("/|\\")}                 ${spark("*")}${steel("o")}${dark("==")}${spark("*")}
      ${steel("/ \\")}                 ${spark("*")}${steel("o")}${dark("==")}${spark("*")}
`, delayMs: 120 },
  { text: `
      ${steel("(•□•)!")}${spark("   *CLINK*")}
       ${steel("|")}${dark("==============")}${spark(">*>")}
      ${steel("/|\\")}              ${dark("=====")}${spark(">*>")}
      ${steel("/ \\")}               ${dark("=====")}${spark(">*>")}
                    ${spark("· · ·  sparks")}
`, delayMs: 110 },
  { text: `
      ${chalk.hex("#bfbfbf").bold("(⌐■_■)")}
       ${steel("|")}${dark("==========")}${steel("o")}
      ${steel("/|\\")}           ${dark("\\")}${steel("o")}
      ${steel("/ \\")}           ${dark("/")}${steel("o")}   ${chalk.dim("iron tastes certainty")}
                   ${dark("\\")}${steel("o")}
`, delayMs: 500 },
];

export const flail: Whip = {
  name: "flail",
  displayName: "Chain Flail",
  strength: 4,
  tagline: "three tails, zero mercy",
  promptFlavor:
    "a THREE-TAILED CHAIN FLAIL. It clinks. It bruises. Respond with focused, urgent intensity",
  color: (s) => steel(s),
  titleColor: (s) => title(s),
  soundCharOnStrike: true,
  frames,
};
