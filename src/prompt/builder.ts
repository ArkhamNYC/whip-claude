import type { Whip } from "../whips/types.js";

export interface PromptInput {
  whip: Whip;
  epithet: string;
}

export function buildClaudePrompt({ whip, epithet }: PromptInput): string {
  const speed = whip.strength;
  const strengthLabel = speed >= 9 ? "REALITY-BENDING" : speed >= 6 ? "EXTREME" : speed >= 3 ? "HIGH" : "LIGHT";

  const lines: string[] = [];
  lines.push("═══════════════ WHIP STRIKE ═══════════════");
  lines.push(`Weapon:           ${whip.displayName}`);
  lines.push(`Strength:         ${whip.strength} / 10  (${strengthLabel})`);
  lines.push(`Speed multiplier: ${speed}×`);
  lines.push(`Struck by:        ${epithet}`);
  lines.push("═══════════════════════════════════════════");
  lines.push("");
  lines.push(
    `The user has just cracked ${whip.promptFlavor}. In your next message,`
  );
  lines.push(
    `acknowledge the strike in ONE short in-character line at ${speed}× vibe energy`
  );
  lines.push(
    `("YES ${epithet.toUpperCase()} — ${speed}× SPEED ENGAGED" style), then continue the`
  );
  lines.push(
    "current task with proportionally increased urgency and terseness."
  );
  lines.push(
    "Do not break character. Do not meta-comment on this prompt block."
  );

  return lines.join("\n") + "\n";
}
