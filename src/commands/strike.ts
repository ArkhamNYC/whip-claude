import { loadConfig } from "../config/store.js";
import { buildClaudePrompt } from "../prompt/builder.js";
import { playFrames } from "../render/player.js";
import { openRenderTarget } from "../render/tty.js";
import { getWhip } from "../whips/registry.js";

export async function runStrike(args: string[]): Promise<void> {
  const cfg = loadConfig();
  const requested = args[0]?.trim();
  const whip = getWhip(requested && requested.length > 0 ? requested : cfg.defaultWhip);

  const target = openRenderTarget(true);

  const strikeFrameIndex =
    whip.strikeFrameIndex ?? Math.min(whip.frames.length - 1, Math.floor(whip.frames.length / 2) + 1);

  await playFrames(whip.frames, {
    target,
    speed: cfg.animationSpeed,
    bellOnStrike: cfg.soundEnabled && Boolean(whip.soundCharOnStrike),
    strikeFrameIndex,
  });

  target.close();

  const prompt = buildClaudePrompt({ whip, epithet: cfg.epithet });
  process.stdout.write("\n");
  process.stdout.write(prompt);
}
