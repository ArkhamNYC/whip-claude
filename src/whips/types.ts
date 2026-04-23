export interface Frame {
  text: string;
  delayMs: number;
}

export interface Whip {
  name: string;
  displayName: string;
  strength: number;
  tagline: string;
  promptFlavor: string;
  frames: Frame[];
  color(text: string): string;
  titleColor(text: string): string;
  soundCharOnStrike?: boolean;
  strikeFrameIndex?: number;
}
