import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname } from "node:path";
import { CONFIG_FILE } from "./paths.js";

export interface WhipConfig {
  defaultWhip: string;
  epithet: string;
  animationSpeed: number;
  soundEnabled: boolean;
}

export const DEFAULT_CONFIG: WhipConfig = {
  defaultWhip: "bullwhip",
  epithet: "Master",
  animationSpeed: 1.0,
  soundEnabled: false,
};

export function loadConfig(): WhipConfig {
  if (!existsSync(CONFIG_FILE)) return { ...DEFAULT_CONFIG };
  try {
    const raw = readFileSync(CONFIG_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<WhipConfig>;
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

export function saveConfig(cfg: WhipConfig): void {
  mkdirSync(dirname(CONFIG_FILE), { recursive: true });
  writeFileSync(CONFIG_FILE, JSON.stringify(cfg, null, 2) + "\n", "utf8");
}

export function ensureConfigExists(): WhipConfig {
  if (!existsSync(CONFIG_FILE)) {
    saveConfig(DEFAULT_CONFIG);
  }
  return loadConfig();
}
