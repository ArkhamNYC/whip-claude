import chalk from "chalk";
import type { Whip } from "./types.js";

const hide = chalk.hex("#5c3317");
const tan = chalk.hex("#a06840");
const red = chalk.hex("#ff3b3b").bold;
const title = chalk.hex("#d97a3a").bold;

const frames = [
  { text: `
              ${hide("_____________")}
             ${hide("/             \\____")}
            ${hide("/                   \\__")}
           ${hide("/                       \\___")}     ${tan("(-_-)")}
          ${hide("/                            \\___")}${tan("/|~~~")}
         ${hide("/                                 ")}${tan("\\ | \\")}
                                           ${tan("/  |\\ \\")}
                                              ${tan("/ \\")}
`, delayMs: 260 },
  { text: `
                                            ${hide("_")}
                                           ${hide("//")}
                                 ${tan("(°□°)")}${hide("_____/")}
                                  ${tan("|")}${hide("_________")}
                                 ${tan("/|")}         ${hide("\\____")}
                                 ${tan("/ \\")}             ${hide("\\__")}
                                                     ${hide("\\_")}
                                                       ${hide("\\.")}
`, delayMs: 140 },
  { text: `
                                                          ${hide("__")}
     ${red("(°□°)!")}                                              ${hide("//")}
      ${tan("|")}${hide("____________________________________________")}     ${hide("//")}
     ${tan("/|")}                                            ${hide("\\___")}${hide("//")}
     ${tan("/ \\")}                                               ${hide("\\\\")}
                                                        ${hide("\\\\_")}
`, delayMs: 90 },
  { text: `${red(`
         ▄████▄   ██▀███   ▄▄▄       ▄████▄   ██ ▄█▀
        ▒██▀ ▀█  ▓██ ▒ ██▒▒████▄    ▒██▀ ▀█   ██▄█▒
        ▒▓█    ▄ ▓██ ░▄█ ▒▒██  ▀█▄  ▒▓█    ▄ ▓███▄░  !
        ▒▓▓▄ ▄██▒▒██▀▀█▄  ░██▄▄▄▄██ ▒▓▓▄ ▄██▒▓██ █▄
        ▒ ▓███▀ ░░██▓ ▒██▒ ▓█   ▓██▒▒ ▓███▀ ░▒██▒ █▄ !
        ░ ░▒ ▒  ░░ ▒▓ ░▒▓░ ▒▒   ▓▒█░░ ░▒ ▒  ░▒ ▒▒ ▓▒
`)}`, delayMs: 500 },
  { text: `

      ${chalk.hex("#d8a765").bold("(⌐■_■)")}   ${chalk.dim(".·´ ¸.·´¨)")}
       ${tan("|")}      ${chalk.dim("(¸.·´ (¸.·'*  ·  smoke  ·")}
      ${tan("/|\\")}
      ${tan("/ \\")}
`, delayMs: 320 },
  { text: `

      ${chalk.hex("#d8a765").bold("(⌐■_■)")}   ${chalk.dim("ready for the next one.")}
       ${tan("|")}
      ${tan("/|\\")}
      ${tan("/ \\")}
`, delayMs: 500 },
];

export const bullwhip: Whip = {
  name: "bullwhip",
  displayName: "Bullwhip",
  strength: 3,
  tagline: "the iconic Indiana standard",
  promptFlavor:
    "an IRON-TIPPED BULLWHIP — the Indiana Jones standard. Respond with cinematic energy and decisive action",
  color: (s) => hide(s),
  titleColor: (s) => title(s),
  soundCharOnStrike: true,
  frames,
};
