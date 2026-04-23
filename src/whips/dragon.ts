import chalk from "chalk";
import type { Whip } from "./types.js";

const ember = chalk.hex("#ff7a00").bold;
const flame = chalk.hex("#ffcf33").bold;
const deepRed = chalk.hex("#b22222").bold;
const ash = chalk.hex("#5e1f1f");
const title = chalk.hex("#ff7a00").bold;

const frames = [
  { text: `
              ${deepRed("_____")}
             ${deepRed("/     \\___")}
      ${ember("(`o´)")} ${deepRed("/          \\__")}
       ${ember("|")}                  ${deepRed("\\_")}
      ${ember("/|\\")}                    ${deepRed("\\_")}
      ${ember("/ \\")}                      \`${ash("~.")}
`, delayMs: 260 },
  { text: `
                 ${flame("·")}  ${flame("·")}
       ${ember("(`O´)")}  ${flame("·")}   ${flame("·")}
        ${ember("|")}${deepRed("~~~~~~~~~~~")}${flame("~")}
       ${ember("/|")}          ${deepRed("\\~~")}${flame("~")}${flame("·")}
       ${ember("/ \\")}           ${deepRed("\\~~")}${flame("~")}${flame("·")}
`, delayMs: 140 },
  { text: `
             ${flame("·")}        ${flame("·")}        ${flame("·")}
       ${ember("(°O°)")}${flame("!")}   ${flame("·")}        ${flame("·")}
        ${ember("|")}${deepRed("~~~~~~~~~~~~~~~~")}${flame(">")}${ember(">")}${flame(">")}${ember(">")}
       ${ember("/|\\")}         ${deepRed("~~~~")}${flame(">")}${ember(">")}${flame(">")}${ember(">")}${flame(">")}
       ${ember("/ \\")}           ${deepRed("~~~")}${flame(">")}${ember(">")}${flame(">")}${ember(">")}
               ${flame("·     ·     ·")}
`, delayMs: 100 },
  { text: `
     ${flame("·")}      ${ember("(")}${flame("(")}${ember("(")}  ${deepRed("F")}${ember("I")}${flame("R")}${ember("E")}${deepRed("B")}${ember("R")}${flame("E")}${ember("A")}${deepRed("T")}${ember("H")}  ${ember(")")}${flame(")")}${ember(")")}      ${flame("·")}
        ${ember("(°O°)")}${deepRed("!!")}
         ${ember("|")}${deepRed("≈≈≈≈≈≈≈≈≈≈≈≈≈≈")}${flame("≋≋")}${ember("≋≋")}${flame("≋≋")}${ember(">>>>>")}
        ${ember("/|\\")}${deepRed("≈≈≈≈≈≈≈≈≈≈≈≈")}${flame("≋≋")}${ember("≋≋")}${flame("≋≋")}${ember(">>>>")}
        ${ember("/ \\")}    ${deepRed("≈≈≈≈≈≈≈≈")}${flame("≋≋")}${ember("≋≋")}${flame("≋≋")}${ember(">>>")}
       ${flame("·      ·      SSSSSSSSSSSS      ·      ·")}
`, delayMs: 160 },
  { text: `
        ${ember("(⌐■_■)")}     ${ash("ash drifts down")}
         ${ember("|")}            ${flame("·")}   ${flame("·")}
        ${ember("/|\\")}
        ${ember("/ \\")}       ${ash(".·˚꒰꒱˚·.")}
`, delayMs: 500 },
];

export const dragon: Whip = {
  name: "dragon",
  displayName: "Dragon's Tail",
  strength: 8,
  tagline: "scales, fire, and old magic",
  promptFlavor:
    "a DRAGON'S TAIL WHIP, crackling with primordial fire. Respond with mythic urgency — this is not a request, it is a summons",
  color: (s) => ember(s),
  titleColor: (s) => title(s),
  soundCharOnStrike: true,
  frames,
};
