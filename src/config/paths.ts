import { homedir } from "node:os";
import { join } from "node:path";

export const CLAUDE_HOME = join(homedir(), ".claude");
export const COMMANDS_DIR = join(CLAUDE_HOME, "commands");
export const SLASH_COMMAND_FILE = join(COMMANDS_DIR, "whip.md");
export const WHIP_CLAUDE_DIR = join(CLAUDE_HOME, "whip-claude");
export const CONFIG_FILE = join(WHIP_CLAUDE_DIR, "config.json");
