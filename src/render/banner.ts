import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";

const whipGradient = gradient(["#ff6b6b", "#ffd93d", "#ff6bd1", "#c56bff"]);

export function bigBanner(text: string, width = process.stdout.columns || 80): string {
  try {
    const rendered = figlet.textSync(text, {
      font: "Small",
      width: Math.max(40, Math.min(width - 2, 120)),
      whitespaceBreak: true,
    });
    return whipGradient.multiline(rendered);
  } catch {
    return chalk.bold(text);
  }
}

export function smallBanner(text: string): string {
  try {
    return whipGradient.multiline(figlet.textSync(text, { font: "Small" }));
  } catch {
    return chalk.bold(text);
  }
}
