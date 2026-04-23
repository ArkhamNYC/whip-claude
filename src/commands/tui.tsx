import chalk from "chalk";
import { render } from "ink";
import { App, type Exit } from "../tui/App.js";
import { runCustomize } from "./customize.js";
import { runDemo } from "./demo.js";
import { runList } from "./list.js";

export async function runTui(): Promise<void> {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    // Non-interactive environment — fall back to the static catalog.
    runList();
    console.log(
      chalk.dim(
        "\n  tip: run this in a real terminal for the interactive picker."
      )
    );
    return;
  }

  const exitResult = await new Promise<Exit>((resolve) => {
    const { waitUntilExit } = render(<App onExit={resolve} />);
    waitUntilExit().then(() => resolve({ kind: "quit" }));
  });

  if (exitResult.kind === "demo") {
    await runDemo([exitResult.whip]);
    return;
  }
  if (exitResult.kind === "customize") {
    await runCustomize();
    return;
  }
}
