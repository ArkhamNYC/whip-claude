import { bullwhip } from "./bullwhip.js";
import { cosmic } from "./cosmic.js";
import { dragon } from "./dragon.js";
import { flail } from "./flail.js";
import { leather } from "./leather.js";
import { lightning } from "./lightning.js";
import { noodle } from "./noodle.js";
import type { Whip } from "./types.js";

export const WHIPS: readonly Whip[] = [
  noodle,
  leather,
  bullwhip,
  flail,
  lightning,
  dragon,
  cosmic,
];

const BY_NAME = new Map<string, Whip>(WHIPS.map((w) => [w.name, w]));

export const DEFAULT_WHIP_NAME = "bullwhip";

export function getWhip(name: string | undefined): Whip {
  if (!name) return BY_NAME.get(DEFAULT_WHIP_NAME)!;
  return BY_NAME.get(name.toLowerCase()) ?? BY_NAME.get(DEFAULT_WHIP_NAME)!;
}

export function hasWhip(name: string): boolean {
  return BY_NAME.has(name.toLowerCase());
}

export function listWhips(): readonly Whip[] {
  return WHIPS;
}
