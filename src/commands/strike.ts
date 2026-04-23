import { spawn } from "node:child_process";
import { writeFileSync, chmodSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadConfig } from "../config/store.js";
import { buildClaudePrompt } from "../prompt/builder.js";
import { sleep } from "../render/ansi.js";
import { getWhip } from "../whips/registry.js";

function parseArgs(args: string[]): { window: boolean; whipName: string | undefined } {
  let window = false;
  let whipName: string | undefined;
  for (const a of args) {
    if (a === "--window" || a === "-w") window = true;
    else if (!a.startsWith("-") && !whipName) whipName = a;
  }
  return { window, whipName };
}

function launchTerminalWindow(whipName: string): void {
  if (process.platform !== "darwin") return;
  try {
    const dir = mkdtempSync(join(tmpdir(), "whip-"));
    const script = join(dir, "play.sh");
    const cmd = `npx -y whip-claude demo ${JSON.stringify(whipName)}`;
    writeFileSync(
      script,
      `#!/bin/bash
clear
${cmd}
echo
echo "(window closes in 3s...)"
sleep 3
`,
      "utf8"
    );
    chmodSync(script, 0o755);
    spawn("osascript", [
      "-e",
      `tell application "Terminal" to do script "bash ${script}; exit"`,
      "-e",
      `tell application "Terminal" to activate`,
    ], { stdio: "ignore", detached: true }).unref();
  } catch {
    /* swallow — popup is best-effort */
  }
}

export async function runStrike(args: string[]): Promise<void> {
  const cfg = loadConfig();
  const { window, whipName } = parseArgs(args);
  const whip = getWhip(whipName && whipName.length > 0 ? whipName : cfg.defaultWhip);

  if (window) launchTerminalWindow(whip.name);

  // Filmstrip header
  process.stdout.write(
    `\n━━━━━━━━━━━━━━━━━━━━  ${whip.displayName.toUpperCase()}  (${whip.strength}/10)  ━━━━━━━━━━━━━━━━━━━━\n`
  );

  const scale = cfg.animationSpeed > 0 ? 1 / cfg.animationSpeed : 1;
  for (const frame of whip.frames) {
    process.stdout.write(frame.text);
    // Delay between frames — if Claude Code ever streams, this animates.
    // If it buffers, the frames just stack into a filmstrip.
    const ms = Math.max(16, Math.round(frame.delayMs * scale));
    await sleep(ms);
  }

  process.stdout.write(
    `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`
  );

  const prompt = buildClaudePrompt({ whip, epithet: cfg.epithet });
  process.stdout.write(prompt);
}
