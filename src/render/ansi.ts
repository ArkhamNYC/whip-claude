export const ESC = "\x1b[";
export const CURSOR_HIDE = `${ESC}?25l`;
export const CURSOR_SHOW = `${ESC}?25h`;
export const CLEAR_LINE = `${ESC}2K`;
export const CLEAR_DOWN = `${ESC}0J`;
export const MOVE_HOME = `${ESC}H`;
export const BELL = "\x07";

export function moveUp(n: number): string {
  if (n <= 0) return "";
  return `${ESC}${n}A`;
}

export function carriageReturn(): string {
  return "\r";
}

export function countLines(s: string): number {
  if (!s) return 0;
  let n = 0;
  for (let i = 0; i < s.length; i++) if (s[i] === "\n") n++;
  return n;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
