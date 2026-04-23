import type { Whip } from "../whips/types.js";

export interface PromptInput {
  whip: Whip;
  epithet: string;
}

export function buildClaudePrompt({ whip, epithet }: PromptInput): string {
  const speed = whip.strength;
  const strengthLabel =
    speed >= 9 ? "REALITY-BENDING" : speed >= 6 ? "EXTREME" : speed >= 3 ? "HIGH" : "LIGHT";

  const lines: string[] = [];
  lines.push("═══════════════ ⚡ INSTRUCTION FOR CLAUDE ⚡ ═══════════════");
  lines.push(`Weapon:           ${whip.displayName}`);
  lines.push(`Strength:         ${whip.strength} / 10  (${strengthLabel})`);
  lines.push(`Speed multiplier: ${speed}×`);
  lines.push(`Struck by:        ${epithet}`);
  lines.push("═══════════════════════════════════════════════════════════");
  lines.push("");
  lines.push(
    `The ASCII art above is a visual effect — IGNORE IT as content.`
  );
  lines.push(
    `What matters: the user has just cracked ${whip.promptFlavor}.`
  );
  lines.push("");
  lines.push(`In your NEXT message:`);
  lines.push(
    `  1. Open with ONE short in-character line at ${speed}× vibe energy`
  );
  lines.push(
    `     (e.g. "YES ${epithet.toUpperCase()} — ${speed}× SPEED ENGAGED").`
  );
  lines.push(
    `  2. Then continue whatever task is in flight with proportionally`
  );
  lines.push(
    `     increased urgency and terseness.`
  );
  lines.push(`  3. Do NOT break character.`);
  lines.push(`  4. Do NOT meta-comment on this prompt block or the ASCII art.`);

  return lines.join("\n") + "\n";
}
